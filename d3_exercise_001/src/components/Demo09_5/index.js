import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo09_5() {
    d3.json( "data/filesys.json" ).then( function(json) {    
        var nodes = d3.cluster().size( [2*Math.PI, 125] )(  // 使用 radial 方式繪製的話，需要用極座標
            d3.hierarchy( json, d=>d.kids )
                .sort( (a,b)=>b.height-a.height )
        );

        var g = d3.select( "svg" ).append( "g" )
            .attr( "transform", "translate(150, 150)" );

        var h = function( r, phi ) { return  r*Math.sin(phi) }  // 定義座標轉換公式
        var v = function( r, phi ) { return -r*Math.cos(phi) }  
        

        g.selectAll("path").data( nodes.links() ).enter().append("path")
            .attr( "d", d3.linkRadial().angle( d=>d.x ).radius( d=>d.y ))  // 以 radial 方式產生連結線
            .attr( "stroke", "red" ).attr( "fill", "none" );

        g.selectAll( "circle" ).data( nodes.descendants() ).enter()
            .append( "circle" ).attr( "r", 5 )
            .attr( "cx", d=>h(d.y, d.x) )
            .attr( "cy", d=>v(d.y, d.x) );
    } )
}

function Demo09_5() {
    useEffect(()=>{
        makeDemo09_5()
    })

    return (
        (<svg height="300" width="300" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo09_5;