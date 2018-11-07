/*存储json对象用来存储图数据 */
var jsonObject = {
    site: [{
            id: 0,
            name: "南门",
            info: "南京邮电大学的南门"
        },
        {
            id: 1,
            name: "圆楼",
            info: "南邮领导办公的地方"
        },
        {
            id: 2,
            name: "教学楼",
            info: "学生学习的地方,一共五个教学楼,前四个为学生主要的上课地点"
        },
        {
            id: 3,
            name: "湖",
            info: "南邮的湖，壮阔美丽"
        },
        {
            id: 4,
            name: "南一餐厅",
            info: "南邮一食堂，距离教学楼比较近，老师，刚下课的学生喜欢在这里吃饭"
        },
        {
            id: 5,
            name: "栗子山",
            info: "南邮栗子山，风景极其优美，每到秋季，银杏树的叶子洒满一地"
        },
        {
            id: 6,
            name: "图书馆",
            info: "南邮图书馆，学生自习看书的主要地，是南邮的“CBD”"
        },
        {
            id: 7,
            name: "南二餐厅",
            info: "南二餐厅，以方便为主，距离南邮的中心"
        },
        {
            id: 8,
            name: "鼎山",
            info: "南邮的鼎山，是南邮校内最大的山"
        },
        {
            id: 9,
            name: "东门",
            info: "南邮的东门，附近到处聚集收快递的地方"
        },
        {
            id: 10,
            name: "南操场",
            info: "南邮的南操场，晚上很多人跑步，打篮球"
        },
        {
            id: 11,
            name: "学科楼",
            info: "南邮新建的学科楼，很具有现代化"
        },
        {
            id: 12,
            name: "青春剧场",
            info: "南邮的大学生活动中心，也是一些重大讲座的地点"
        },
        {
            id: 13,
            name: "南三食堂",
            info: "南邮的三食堂，号称最贵的食堂"
        },
        {
            id: 14,
            name: "北操场",
            info: "南邮的北操场，时常有比赛在这里进行"
        },
        {
            id: 15,
            name: "北门",
            info: "南邮的北门，出门直接通往南邮广场"
        }
    ],
    edge: [{
            v1: 0,
            v2: 1,
            length: 2
        },
        {
            v1: 1,
            v2: 2,
            length: 2
        },
        {
            v1: 0,
            v2: 2,
            length: 4
        },
        {
            v1: 0,
            v2: 3,
            length: 2
        },
        {
            v1: 1,
            v2: 3,
            length: 3
        },
        {
            v1: 2,
            v2: 3,
            length: 1
        },
        {
            v1: 2,
            v2: 5,
            length: 2
        },
        {
            v1: 2,
            v2: 6,
            length: 3
        },
        {
            v1: 3,
            v2: 4,
            length: 2
        },
        {
            v1: 3,
            v2: 5,
            length: 2
        },
        {
            v1: 4,
            v2: 5,
            length: 2
        },
        {
            v1: 4,
            v2: 7,
            length: 3
        },
        {
            v1: 6,
            v2: 7,
            length: 2
        },
        {
            v1: 5,
            v2: 6,
            length: 2
        },
        {
            v1: 6,
            v2: 10,
            length: 3
        },
        {
            v1: 6,
            v2: 11,
            length: 5
        },
        {
            v1: 7,
            v2: 10,
            length: 2
        },
        {
            v1: 6,
            v2: 12,
            length: 5
        },
        {
            v1: 6,
            v2: 8,
            length: 3
        },
        {
            v1: 10,
            v2: 12,
            length: 5
        },
        {
            v1: 10,
            v2: 9,
            length: 3
        },
        {
            v1: 9,
            v2: 13,
            length: 2
        },
        {
            v1: 12,
            v2: 13,
            length: 2
        },
        {
            v1: 12,
            v2: 14,
            length: 2
        },
        {
            v1: 13,
            v2: 14,
            length: 3
        },
        {
            v1: 14,
            v2: 15,
            length: 3
        },
        {
            v1: 12,
            v2: 15,
            length: 4
        }
    ]
};
console.log(jsonObject);
/*Vertex函数用来构建顶点信息*/
function Vertex(label, wasVisited) {
    //label:标识顶点；wasVisited:该顶点是否被访问过的布尔值
    this.label = label;
    this.wasVisited = wasVisited;
}
/*Graph类用来构建图的信息，存储结构采用邻接表*/
function Graph() {
    //初始化图
    this.vertices = jsonObject.site.length; //顶点个数
    this.edges = 0; //边个数
    this.adj = []; //存放相邻顶点的数组
    for (var i = 0; i < this.vertices; ++i) {
        //为数组的每个元素增加一个子数组来存储所有的相邻顶点，并将所有元素初始化为空字符串
        this.adj[i] = [];
        //this.adj[i].push("");
    }
    this.addEdge = addEdge;
    this.showGraph = showGraph;
    this.floyd = floyd;
    console.log(this);
}
/*为顶点增加边*/
function addEdge() {
    //增加json 数据里面的边和信息
    for (index in jsonObject.edge) {
        let object = jsonObject.edge[index];
        let v = object.v1;
        let w = object.v2;
        let l = object.length;
        this.adj[v].push({
            link: w,
            length: l
        });
        this.adj[w].push({
            link: v,
            length: l
        });
    }
    this.edges = jsonObject.edge.length;
}
/*打印顶点（测试用）*/
function showGraph() {
    var str = "";
    for (var i = 0; i < this.vertices; ++i) {
        str = i + "-->";
        for (var j = 0; j < this.vertices; ++j) {
            if (this.adj[i][j] != undefined) {
                str += this.adj[i][j] + " ";
            }
        }
        console.log(str);
    }
}

function floyd() {
    let path = new Array();
    let route = new Array();
    //初始化数组path
    for (let i = 0; i < this.vertices; ++i) {
        route[i] = new Array();
        path[i] = new Array();
        for (let j = 0; j < this.vertices; ++j) {
            if (i === j) {
                path[i][j] = 0;
                route[i][j] = 0 //poute 对角线为0
            } else {
                path[i][j] = 999;
                route[i][j] = 0 //初始化，到达不了为999
            }
        }
    }
    //给path赋值
    for (index in jsonObject.edge) {
        let pathObject = jsonObject.edge[index];
        path[pathObject.v1][pathObject.v2] = pathObject.length;
        path[pathObject.v2][pathObject.v1] = pathObject.length;
    }
    //floyd核心算法
    let n = path && path.length;
    let m = n && path[0].length;
    if (m && n && m === n) {
        for (var k = 0; k < n; k++) {
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    if (path[i][k] + path[k][j] < path[i][j]) {
                        route[i][j] = k;
                        path[i][j] = path[i][k] + path[k][j];
                    }
                }
            }
        }
    }
    return [path, route];
}
console.log("start!");