import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo05_4() {
    d3.select("svg").append("rect")
        .attr( "x", 0 )
        .attr( "y", 0 )
        .attr( "width", 20 )
        .attr( "height", 50 )
        .attr( "fill", "none" )
        .attr( "stroke", "blue" )
        .attr( "stroke-width", 1).attr("transform", "scale(2)");
    d3.select("svg").append("line")
        .attr("x1", 100)
        .attr("y1", 20)
        .attr("x2", 100)
        .attr("y2", 40)
        .attr("stroke", "red")
        .attr("stroke-width", 1);
    d3.select("svg").append("rect")
        .attr( "x", 100 )
        .attr( "y", 20 )
        .attr( "width", 20 )
        .attr( "height", 50 )
        .attr( "fill", "none" )
        .attr( "stroke", "green" )
        .attr( "stroke-width", 1).attr("transform", "scale(2)");
}

function Demo05_4() {
    useEffect(()=>{
        makeDemo05_4()
    })

    return (
        (<svg height="600" width="600" style={{"background" : 'white'}}>
        </svg>)
    );
}

export default Demo05_4;