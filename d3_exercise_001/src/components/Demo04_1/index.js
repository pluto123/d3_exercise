import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo04_1() {
    var txt = d3.select( "svg" ).append( "text" );
    var svg = d3.select( "svg" ).attr( "cursor", "crosshair" )  // 把鼠標設為十字
        .on( "mousemove", function(event) {
            var pt = d3.pointer( event, svg.node() );  // D3 v6 以上的版本是使用 pointer() 取得事件相關資訊
            txt.attr( "x", 18+pt[0] ).attr( "y", 6+pt[1] )
                .text( "" + pt[0] + "," + pt[1] );
        });
}

function Demo04_1() {
    useEffect(()=>{
        d3.select('.Demo04_1')
          .append('svg')
          .attr('height', 300)
          .attr('width', 300)
          .style('background', 'lightgrey');
    
          makeDemo04_1()
      })

    return (
        (<div className="Demo04_1"></div>)
    );
}

export default Demo04_1;