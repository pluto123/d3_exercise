import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo09_3() {
    d3.json( "data/filesys.json" ).then( function(json) {    
        var nodes = d3.hierarchy(json, d=>d.kids);  // 建構 D3 Node 物件樹，其子節點是被儲存在 kids 中
        d3.tree().size( [250,225] )( nodes );  // 設定完整圖形的像素尺寸
        

        var g = d3.select( "svg" ).append( "g" )
            .attr( "transform", "translate(25, 25)" );
    
        var lnkMkr = d3.linkHorizontal().x( d=>d.y ).y( d=>d.x );  // 以水平方式繪製節點間的連結
        g.selectAll( "path" ).data( nodes.links() ).enter()  // 產生連結線
            .append( "path" ).attr( "d", d=>lnkMkr(d) )
            .attr( "stroke", "red" ).attr( "fill", "none" );
        
        g.selectAll("circle").data( nodes.descendants() ).enter()  // 傳回後代陣列畫點
            .append("circle").attr( "r", 5 )
            .attr( "cx", d=>d.y ).attr( "cy", d=>d.x );  // 因為是水平繪製，所以此處 x 和 y 要對調
    } );
}

function Demo09_3() {
    useEffect(()=>{
        makeDemo09_3()
    })

    return (
        (<svg height="300" width="275" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo09_3;