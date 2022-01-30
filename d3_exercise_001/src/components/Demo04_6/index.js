import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo04_6() {
    var ds1 = [ 2, 1, 3, 5, 7, 8, 9, 9, 9, 8, 7, 5, 3, 1, 2 ];
    var ds2 = [ 8, 9, 8, 7, 5, 3, 2, 1, 2, 3, 5, 7, 8, 9, 8 ];
    var n = ds1.length, mx = d3.max( d3.merge( [ds1, ds2] ) );
    
    var svg = d3.select( "svg" );

    var scX = d3.scaleLinear().domain( [0,n] ).range( [50,540] );
    var scY = d3.scaleLinear().domain( [0,mx] ).range( [250,50] );

    svg.selectAll( "line" ).data( ds1 ).enter().append( "line" )
        .attr( "stroke", "red" ).attr( "stroke-width", 20 )
        .attr( "x1", (d,i)=>scX(i) ).attr( "y1", scY(0) )
        .attr( "x2", (d,i)=>scX(i) ).attr( "y2", d=>scY(d) );

    svg.on( "click", function() {
        [ ds1, ds2 ] = [ ds2, ds1 ];
        
        svg.selectAll( "line" ).data( ds1 )
            .transition().duration( 1000 ).delay( (d,i)=>200*i )  // 設定漸變的方式
            .attr( "y2", d=>scY(d) );  // 漸變效果的最終狀態
    } );
}

function Demo04_6() {
    useEffect(()=>{
        d3.select('.Demo04_6')
            .append('svg')
            .attr('height', 300)
            .attr('width', 600)
            .style('background', 'lightgrey');
          makeDemo04_6()
      })

    return (
        (<div className="Demo04_6"></div>)
    );
}

export default Demo04_6;