import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo07_2() {
    var sc = d3.scaleLinear().domain( [0,10] ).range( [0,200] );  //<1>

    // top left: default settings
    d3.select( "svg" ).append( "g" )                           //<2>
        .attr( "transform", "translate( 50,50)" )
        .call( d3.axisBottom(sc) );
    
    // bottom left: additional decimal in labels
    d3.select( "svg" ).append( "g" )                           //<3>
        .attr( "transform", "translate( 50,125)" )
        .call( d3.axisBottom(sc).tickFormat( d3.format(".1f") ) )
        .selectAll( "text" )
        .filter( (d,i)=>i%2!=0 ).attr( "visibility", "hidden" );

    // top right: minor and major tick marks, addtl label for axis
    d3.select( "svg" ).append( "g" )                           //<4>
        .attr( "transform", "translate(350,50)" )
        .call( d3.axisBottom(sc).tickSize(3).tickFormat( ()=>"" ) );
    d3.select( "svg" ).append( "g" )
        .attr( "transform", "translate(350,50)" )
        .call( d3.axisBottom( sc ).ticks(2) )
        .append( "text" ).text( "Metric" )
        .attr( "x", sc(5) ).attr("y", 35 )
        .attr( "font-size", 12 ).attr( "fill", "black" );
    
    // bottom right: custom appearance
    var g = d3.select( "svg" ).append( "g" )                   //<5>
        .attr( "transform", "translate(350,125)" )
        .call( d3.axisBottom(sc).tickPadding( 5 ) );
    g.select( ".domain" ).attr( "visibility", "hidden" );
    g.selectAll( ".tick" ).select( "line" )
        .attr( "stroke", "red" ).attr( "stroke-width", 2 );
    g.selectAll( "text" ).attr( "font-size", 14 );
}

function Demo07_2() {
    useEffect(()=>{
        makeDemo07_2()
    })

    return (
        (<svg height="200" width="600" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo07_2;