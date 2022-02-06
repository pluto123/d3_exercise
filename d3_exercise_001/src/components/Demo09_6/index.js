import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo09_6() {
    d3.json( "data/filesys.json" ).then( function(json) {
        var sc = d3.scaleOrdinal( d3.schemeReds[8] );
        
        var nodes = d3.hierarchy(json, d=>d.kids).sum(d=>d.size)  // 計算出其後代 size 加總
            .sort((a,b) => b.height-a.height || b.value-a.value); // 按高度降冪及數值降冪排序
        
        d3.treemap().size( [300,300] ).padding(5)(nodes);
        
        var g = d3.select( "svg" ).append( "g" ).attr( "transform", "translate(5, 5)");
        
        g.selectAll( "rect" ).data( nodes.descendants() ).enter()
            .append( "rect" )
            .attr( "x", d=>d.x0 ).attr( "y", d=>d.y0 )
            .attr( "width", d=>d.x1-d.x0 )  // treemap layout 提供了兩個對角的 (x0, y0) (x1, y1) 
            .attr( "height", d=>d.y1-d.y0 )
            .attr( "fill", d=>sc(d.depth) ).attr( "stroke", "red" );

        g.selectAll( "text" ).data( nodes.leaves() ).enter()  // 只為每個葉節點顯示文字
            .append( "text" )
            .attr( "text-anchor", "middle" ).attr( "font-size", 10 )
            .attr( "x", d=>(d.x0+d.x1)/2 )
            .attr( "y", d=>(d.y0+d.y1)/2+2 )
            .text( d=>d.data.name );    
    } );
}

function Demo09_6() {
    useEffect(()=>{
        makeDemo09_6()
    })

    return (
        (<svg height="310" width="310" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo09_6;