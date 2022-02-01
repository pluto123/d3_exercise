import * as d3 from 'd3'
import { useEffect } from 'react';

function sticker( sel, label ) {
    sel.append( "rect" ).attr( "rx", 5 ).attr( "ry", 5 )
        .attr( "width", 70 ).attr( "height", 30 )
        .attr( "x", -35 ).attr( "y", -15 )
        .attr( "fill", "none" ).attr( "stroke", "blue" )
        .classed( "frame", true );
        
    sel.append( "text" ).attr( "x", 0 ).attr( "y", 5 )
        .attr( "text-anchor", "middle" )
        .attr( "font-family", "sans-serif" ).attr( "font-size", 14 )
        .classed( "label", true )
        .text( label ? label : d => d );  // 可以透過參數會是繫結 data() 的方式
}

function makeDemo05_9() {
    var labels = [ "Hello", "World", "How", "Are", "You?" ];
    var scX = d3.scaleLinear()
        .domain( [0, labels.length-1] ).range( [100, 500] );
    var scY = d3.scaleLinear()
        .domain( [0, labels.length-1] ).range( [50, 150] );
    
    d3.select( "svg" )
        .selectAll( "g" ).data( labels ).enter().append( "g" )
        .attr( "transform",
               (d,i) => "translate(" + scX(i) + "," + scY(i) + ")" )
        .call( sticker );

    d3.select( "svg" ).append( "g" )
        .attr( "transform", "translate(75,150)" )
        .call( sticker, "I'm fine!" )
        .selectAll( ".label" ).attr( "fill", "red" );
}

function Demo05_9() {
    useEffect(()=>{
        makeDemo05_9()
    })

    return (
        (<svg height="200" width="600" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo05_9;