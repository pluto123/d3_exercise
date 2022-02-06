import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo09_7() {
    d3.json( "data/network.json" ).then( res => {
        var svg = d3.select( "svg" )
        var scC = d3.scaleOrdinal( d3.schemePastel1 )
        
        d3.shuffle( res.ps ); d3.shuffle( res.ln );
        
        d3.forceSimulation( res.ps )
            .force("ct", d3.forceCenter( 300, 300 ) )
            .force("ln",
                   d3.forceLink( res.ln ).distance(40).id(d=>d.id) )
            .force("hc", d3.forceCollide(10) )
            .force("many", d3.forceManyBody() )
            .on( "end", function() {
                svg.selectAll( "line" ).data( res.ln ).enter()
                    .append( "line" ).attr( "stroke", "black" )
                    .attr( "x1", d=>d.source.x )
                    .attr( "y1", d=>d.source.y )
                    .attr( "x2", d=>d.target.x )
                    .attr( "y2", d=>d.target.y );
            
                svg.selectAll("circle").data(res.ps).enter()
                    .append("circle")
                    .attr( "r", 10 ).attr( "fill", (d,i) => scC(i) )
                    .attr( "cx", d=>d.x ).attr( "cy", d=>d.y )

                svg.selectAll("text").data(res.ps).enter()
                    .append("text")
                    .attr( "x", d=>d.x ).attr( "y", d=>d.y+4 )
                    .attr( "text-anchor", "middle" )
                    .attr( "font-size", 10 )
                    .text( d=>d.id );
            } )
    } );
}

function Demo09_7() {
    useEffect(()=>{
        makeDemo09_7()
    })

    return (
        (<svg height="600" width="600" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo09_7;