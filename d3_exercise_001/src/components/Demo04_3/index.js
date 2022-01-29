import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo04_3() {
    d3.csv( "data/dense.csv" ).then( function( data ) {
        var svg1 = d3.select( "#svg1" );
        var svg2 = d3.select( "#svg2" );

        var sc1=d3.scaleLinear().domain([0,10,50])  // 在顏色之間填入差值，產生一個顏色梯度
            .range(["lime","yellow","red"]);
        var sc2=d3.scaleLinear().domain([0,10,50])
            .range(["lime","yellow","blue"]);
    
        var cs1 = drawCircles(svg1,data,d=>parseInt(d["A"])+50,d=>parseInt(d["B"])+50,sc1);  // 建立左側 svg 的圓點
        var cs2 = drawCircles(svg2,data,d=>parseInt(d["A"])+50,d=>parseInt(d["C"])+50,sc2);  // 建立右側 svg 的圓點
    
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
    var cursor = svg.append( "circle" ).attr( "r", 50 )  // 建立一個不透明的圓環
        .attr( "fill", "none" ).attr( "stroke", "black" )
        .attr( "stroke-width", 10 ).attr( "stroke-opacity", 0.1 )
        .attr( "visibility", "hidden" );  // 一開始為隱藏的，等到鼠標進入到 hotzone 時才顯示，被當作鼠標功能使用
    
    var hotzone = svg.append( "rect" ).attr( "cursor", "none" )  // 設定進入此元素時，沒有鼠標顯示
        .attr( "x", 50 ).attr( "y", 50 )
        .attr( "width", 300 ).attr( "height", 300 )
        .attr( "visibility", "hidden" )  // 設定為隱藏的
        .attr( "pointer-events", "all" )   // 因為 visibility 設定為 hidden，所以預設是不接收事件的，所以需要靠此設定打開接收事件
    
        .on( "mouseenter", function() {
            cursor.attr( "visibility", "visible" ); } )  // 當滑鼠進入時，將 curser 顯示，當作鼠標使用
        
        .on( "mousemove", function(event) {
            var pt = d3.pointer( event, svg.node() );
            cursor.attr( "cx", pt[0] ).attr( "cy", pt[1] );  // 當滑鼠移動時，自製鼠標也跟著移動

            cs1.attr( "fill", function( d, i ) {  // 
                var dx = pt[0] - d3.select( this ).attr( "cx" );
                var dy = pt[1] - d3.select( this ).attr( "cy" );
                var r = Math.hypot( dx, dy );

                data[i]["r"] = r;
                return sc1(r); } );
            
            cs2.attr( "fill", (d,i) => sc2( data[i]["r"] ) ); } )

        .on( "mouseleave", function() {                                 
            cursor.attr( "visibility", "hidden" );  // 當滑鼠移出時也隱藏自製鼠標
            cs1.attr( "fill", sc1(Infinity) );
            cs2.attr( "fill", sc2(Infinity) ); } )
}

function Demo04_3() {
    useEffect(()=>{
        var ds1 = ["svg1", "svg2"];

        d3.select('.Demo04_3')
            .selectAll("svg")
            .data(ds1).enter()
            .append('svg').attr("id", d=>d)
            .attr('height', 400)
            .attr('width', 400)
            .style('background', 'lightgrey')
            .style("margin", 20);
          makeDemo04_3()
      })

    return (
        (<div className="Demo04_3"></div>)
    );
}

export default Demo04_3;