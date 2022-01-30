import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo04_4() {
    var widget = undefined, color = undefined;

    d3.select( "svg" ).selectAll( "circle" )
        .call( d3.drag()  // 使用此工廠函數建立一個 drag 函數物件
        .on( "start", function() {  // 模擬 mousedown 時的動作，取得元件
            color = d3.select( this ).attr( "fill" );  // 儲存該元件的顏色，以便在 mouseup 時設回
            widget = d3.select( this ).attr( "fill", "lime" );  // 改變該元件的顏色
        } )
        .on( "drag", function(event) { // 模擬 mousemove
            var pt = d3.pointer( event, d3.select( this ).node() );  // 取得滑鼠座標
            widget.attr( "cx", pt[0] ).attr( "cy", pt[1] );  // 改變元件位置
        } )
        .on( "end", function() {  // 模擬 mouseup
            widget.attr( "fill", color );  // 設回原來顏色
            widget = undefined;
        } ));
}

function Demo04_4() {
    useEffect(()=>{
        var ds1 = [[100, 100, "red"], [300, 100, "green"], [500, 100, "blue"]];

        d3.select('.Demo04_4')
            .append('svg')
            .attr('height', 200)
            .attr('width', 600)
            .style('background', 'lightgrey')
            .selectAll("circle")
            .data(ds1).enter()
            .append("circle")
            .attr( "fill", d=>d[2])
            .attr( "cx", d=>d[0])
            .attr( "cy", d=>d[1])
            .attr( "r", 20);
          makeDemo04_4()
      })

    return (
        (<div className="Demo04_4"></div>)
    );
}

export default Demo04_4;