var draw = SVG('drawing').size($(window).width(), $(window).height())
for (let i = 1; i <= 16; ++i) {
    //console.log($('#view' + i).offset())
}
//console.log(jsonObject.edge.length);
for (let i = 1; i <= jsonObject.edge.length; ++i) {
    // let v1Num = parseInt(jsonObject.edge[i - 1].v1) + 1; //转化为和类名相同的数字
    // let v2Num = parseInt(jsonObject.edge[i - 1].v2) + 1;
    // let v1Top = $('#view' + v1Num).offset().top+10;
    // let v1Left = $('#view' + v1Num).offset().left+30;
    // let v2Top = $('#view' + v2Num).offset().top+10;
    // let v2Left = $('#view' + v2Num).offset().left+30;
    // var line = draw.line(v1Left, v1Top, v2Left, v2Top);
    // line.stroke({
    //     color: '#f06',
    //     width: 10,
    //     linecap: 'round'
    // })
}