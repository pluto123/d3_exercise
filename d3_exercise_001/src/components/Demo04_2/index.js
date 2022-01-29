import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo04_2() {
    d3.csv( "data/dense.csv" ).then( function( data ) {
        var svg1 = d3.select( "#svg1" );
        var svg2 = d3.select( "#svg2" );

        var sc1=d3.scaleLinear().domain([0,10,50])  // 在顏色之間填入差值，產生一個顏色梯度
            .range(["lime","yellow","red"]);
        var sc2=d3.scaleLinear().domain([0,10,50])
            .range(["lime","yellow","blue"]);
    
        var cs1 = drawCircles(svg1,data,d=>d["A"],d=>d["B"],sc1);  // 建立左側 svg 的圓點
        var cs2 = drawCircles(svg2,data,d=>d["A"],d=>d["C"],sc2);  // 建立右側 svg 的圓點
    
        svg1.call( installHandlers, data, cs1, cs2, sc1, sc2 );  // 使用 call() 呼叫 installHanders(data, cs1, cs2, sc1, sc2)
    } );
}

function drawCircles( svg, data, accX, accY, sc ) {
    var color = sc(Infinity);  // 設定初始的顏色值，皆採用顏色梯度做大值 (red / blue)
    return svg.selectAll( "circle" ).data( data ).enter()
        .append( "circle" )
        .attr( "r", 5 ).attr( "cx", accX ).attr( "cy", accY )
        .attr( "fill", color ).attr( "fill-opacity", 0.4 );  // 設定透明度
}

function installHandlers( svg, data, cs1, cs2, sc1, sc2 ) {
    svg.attr( "cursor", "crosshair" )
        .on( "mousemove", function(event) {  // 當滑鼠移入左側 (sgv1) 時
            var pt = d3.pointer( event, svg.node() );
            
            cs1.attr( "fill", function( d, i ) {  // 傳入 csv 內的 data
                var dx = pt[0] - d3.select( this ).attr( "cx" );  // 算出 data 的所有資料與滑鼠座標間的距離
                var dy = pt[1] - d3.select( this ).attr( "cy" );
                var r = Math.hypot( dx, dy );  // hypot 為算出  ((dx * dx) + (dy * dy)) 開根號
                
                data[i]["r"] = r;  // 把 r 值在 data 中另開一個欄位 r 儲存
                return sc1(r); } );  // 根據 r 值取出對應顏色梯度的顏色值
            
            cs2.attr( "fill", (d,i) => sc2( data[i]["r"] ) ); } )  // 右側圖片的所有 data 也根據剛剛算出的 r 取出對應的顏色梯度值
    
        .on( "mouseleave", function() {
            cs1.attr( "fill", sc1(Infinity) );  // 滑鼠離開圖表時，恢復原本顏色
            cs2.attr( "fill", sc2(Infinity) ); } );
}

function Demo04_2() {
    useEffect(()=>{
        var ds1 = ["svg1", "svg2"];

        d3.select('.Demo04_2')
            .selectAll("svg")
            .data(ds1).enter()
            .append('svg').attr("id", d=>d)
            .attr('height', 300)
            .attr('width', 300)
            .style('background', 'lightgrey')
            .style("margin", 20);
          makeDemo04_2()
      })

    return (
        (<div className="Demo04_2"></div>)
    );
}

export default Demo04_2;