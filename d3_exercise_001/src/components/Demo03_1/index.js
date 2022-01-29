import * as d3 from 'd3'
import { useEffect } from 'react';


function makeDemo03_1() {
    var ds1 = [["Steven", 1], ["Amy", 5], ["Eric", 9]];
    var ds2 = [["Eric", 3], ["Amy", 7]];

    var scX = d3.scaleLinear().domain([0, 10]).range([50, 550]),
        scY = d3.scaleLinear().domain([0, 3]).range([30, 120]);

    var j = 0, k = 0;
    var svg = d3.select( "svg" );

    svg.selectAll( "text" )  // d3 會返回一個空集合
        .data(ds1).enter().append( "text" )  // 繫結資料並以 <text> 填充
        .attr( "x", 20 ).attr( "y", d=>scY(j++) ).text( d=>d[0] );  // 設定外觀
    
    svg.selectAll("circle").data(ds1).enter().append( "circle" )
        .attr( "r", 5 ).attr( "fill", "red" )
        .attr( "cx", d=>scX(d[1]) ).attr( "cy", d=>scY(k++)-5 );

    svg.on( "click", function() {
        var cs = svg.selectAll( "circle" ).data( ds2, d=>d[0] );  // 用 ds2 更新資料，並以 d[0] ("Eric" 和 "Amy") 為 key 值更新

        cs.transition().duration(1000).attr("cx", d=>scX(d[1]) );  // 移動圓點
        cs.exit().attr( "fill", "blue" );  // 取剩下沒有繫結到的元素 ("Steven") 設定外觀 
    } );
}

function Demo03_1() {
    useEffect(()=>{
        d3.select('.Demo03_1')
          .append('svg')
          .attr('height', 120)
          .attr('width', 600)
          .style('background', 'lightgrey');
    
          makeDemo03_1()
      })

    return (
        (<div className="Demo03_1"></div>)
    );
}

export default Demo03_1;