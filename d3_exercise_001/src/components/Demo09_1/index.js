import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo09_1() {
    d3.json( "data/filesys.json" ).then( function(json) {    
        var nodes = d3.hierarchy(json, d=>d.kids);  // 建構 D3 Node 物件樹，其子節點是被儲存在 kids 中
        d3.tree().size( [250,225] )( nodes );  // 設定完整圖形的像素尺寸
        
        var g = d3.select( "svg" ).append( "g" )
            .attr( "transform", "translate(25, 25)" );
    
        var lnkMkr = d3.linkVertical().x( d=>d.x ).y( d=>d.y );  // 節點間的連結線產生器
        g.selectAll( "path" ).data( nodes.links() ).enter()  // 產生連結線
            .append( "path" ).attr( "d", d=>lnkMkr(d) )
            .attr( "stroke", "red" ).attr( "fill", "none" );
        
        g.selectAll("circle").data( nodes.descendants() ).enter()  // 傳回後代陣列畫點
            .append("circle").attr( "r", 5 )
            .attr( "cx", d=>d.x ).attr( "cy", d=>d.y );
    } );
}

function Demo09_1() {
    useEffect(()=>{
        makeDemo09_1()
    })

    return (
        (<svg height="275" width="300" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo09_1;