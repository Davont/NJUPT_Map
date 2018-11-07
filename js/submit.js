layui.use(['layer', 'form'], function () {
    var layer = layui.layer,
        form = layui.form;
    console.log($("select[name=first]"));
    for (index in jsonObject.site) {
        let name = jsonObject.site;
        let option = "<option value=" + name[index].id + ">" + name[index].name + "</option>";
        $("select[name=first]").append(option);
    }
    form.render(); //动态渲染select
    /*监听select*/
    form.on('select(first)', function (data) {
        console.log(data);
        $("select[name=last]").empty();
        for (index in jsonObject.site) {
            let name = jsonObject.site;
            let option = "<option value=" + name[index].id + ">" + name[index].name +
                "</option>";
            let optionDisabled = "<option value=" + name[index].id + " disabled>" + name[
                    index].name +
                "</option>";
            if (data.value == index) {
                $("select[name=last]").append(optionDisabled);
            } else {
                $("select[name=last]").append(option);
            }
            form.render();
        }
    })
    /*监听最短路径提交*/
    form.on('submit(*)', function (data) {
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}(
        if (!data.field.first || !data.field.last) {
            layer.msg("请选择起始点哦！");
            return false;
        }
        var g = new Graph(); //定义一个图
        g.addEdge();
        var shortestPath = g.floyd();
        console.log(shortestPath[0])
        console.log(shortestPath[1])
        let pathList = new Array();
        pathList.push(data.field.first);
        /*获取最短路径的路径*/
        function getPath(i, j) {
            if (i == j) return;
            if (shortestPath[1][i][j] == 0) {
                pathList.push(j);
                console.log(j + ' ');
            } else {
                getPath(i, shortestPath[1][i][j]);
                getPath(shortestPath[1][i][j], j);
            }
        }
        getPath(data.field.first, data.field.last);
        console.log(pathList);
        $('#drawing').empty();
        var draw = SVG('drawing').size($(window).width(), $(window).height())
        let pathView = '';
        for (i in pathList) {
            if (i == 0) {
                pathView = pathList[i];
            } else {
                pathView = pathView + ' -> ' + pathList[i];
            }
            /*画出最短路径*/
            if (pathList[parseInt(i) + 1] != undefined) {
                let v1Num = parseInt(pathList[i]) + 1; //转化为和类名相同的数字
                let v2Num = parseInt(pathList[parseInt(i) + 1]) + 1;
                // console.log('v1Num:',v1Num);
                // console.log('v2Num:',v2Num);
                let v1Top = $('#view' + v1Num).offset().top + 10;
                let v1Left = $('#view' + v1Num).offset().left + 30;
                let v2Top = $('#view' + v2Num).offset().top + 10;
                let v2Left = $('#view' + v2Num).offset().left + 30;
                let line = draw.line(v1Left, v1Top, v2Left, v2Top);
                line.stroke({
                    color: '#f06',
                    width: 10,
                    linecap: 'round'
                })
            }
        }
        layer.msg("最短路径：" + pathView) //显示出最短路径
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。

    });
    /*监听所有路径提交*/
    form.on('submit(allPath)', function (data) {
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}(
        if (!data.field.first || !data.field.last) {
            layer.msg("请选择起始点哦！");
            return false;
        }
        var g = new Graph(); //定义一个图
        g.addEdge();
        let allPath = g.floyd();
        console.log(allPath[0])
        console.log(allPath[1])
        let visited = [];
        let stack = [];
        let allPathView = [];
        for (let i = 0; i < g.adj.length; ++i) { //初始化
            visited[i] = false;
        }
        let k = 0;

        function dfs(first, last) { //深度搜索遍历出所有路径
            visited[first] = true;
            stack.push(first);
            if (first == last) {
                //console.log(stack);
                allPathView[k] = []
                for (let i in stack) {
                    allPathView[k].push(stack[i]);
                }
                k++;
            }
            for (let i in g.adj[first]) {
                if (!visited[g.adj[first][i].link]) {
                    dfs(g.adj[first][i].link, last);

                }

            }
            visited[first] = false;
            stack.pop();
        }
        dfs(data.field.first, data.field.last)
        //console.log(visited);
        //console.dir(allPathView);
        //渲染到Html页面中
        let list = '';
        for (let i in allPathView) {
            for (let j in allPathView[i]) {
                if (j == 0) {
                    list = list +'<tr><th>'+allPathView[i][j];
                } else {
                    list = list + ' -> ' + allPathView[i][j];
                }
            }
            list = list + '</th></tr>'
            //$('#allPathList').append(list);
            //console.log( $('#allPathList'))
        }
        //页面渲染层
        layer.open({
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['600px', '800px'], //宽高
            title:'所有路径',
            content:"<table class=\"layui-table\">"+
            "<colgroup>"+
                "<col width=\"150\">"+
                "<col width=\"200\">"+
                "<col>"+
            "</colgroup>"+
            "<thead>"+
                "<tr>"+
                    "<th>路径</th>"+
                "</tr>"+
            "</thead>"+
            "<tbody id=\"allPathList\">"+
            list+
            "</tbody>"+
        "</table>",
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。

    });
});
$('.view').mouseover(function () {
    let remove = $(this);
    remove.addClass('animated wobble');
    setTimeout(function () {
        remove.removeClass('animated wobble');
    }, 1000);
})
$('.view').click(function () {
    let idStr = $(this)[0].id;
    let id = idStr.slice(4);
    layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['820px', '800px'], //宽高
        title: jsonObject.site[id - 1].name,
        content: "<img src='img/view"+(id-1)+".jpg' class='iframeImg'>" +
            "<h5 class='iframeText'>" + jsonObject.site[id - 1].info + "</h5> "
    });
})