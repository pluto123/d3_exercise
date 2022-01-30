import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo05_1() {
    var data = [ 
        { "x": 20, "y":  40, "size": 100, "symbol": d3.symbolCircle, "shape": "Circle" },
        { "x": 20, "y":  80, "size": 100, "symbol": d3.symbolCross, "shape": "Cross" },
        { "x": 20, "y": 120, "size": 100, "symbol": d3.symbolDiamond, "shape": "Diamond" },
        { "x": 20, "y": 160, "size": 100, "symbol": d3.symbolSquare, "shape": "Square" },
        { "x": 20, "y": 200, "size": 100, "symbol": d3.symbolStar, "shape": "Star" },
        { "x": 20, "y": 240, "size": 100, "symbol": d3.symbolTriangle, "shape": "Triangle" },
        { "x": 20, "y": 280, "size": 100, "symbol": d3.symbolWye, "shape": "Wye" } ]
    var svg = d3.select( "svg" );

    svg.selectAll( "path" ).data(data).enter().append( "path" )
        .attr( "d", d=>d3.symbol().size(d['size']).type(d['symbol'])() )  // 設定到 path 的 d 屬性以顯示
        .attr( "fill", "red" )
        .attr( "transform",  // 一開始都是畫在左上角的原點，所以需要將他移到適當的位置
               d=>"translate(" + d["x"] + "," + d["y"] + ")" );
    svg.selectAll("text").data(data).enter().append("text")
        .text(d=>d["shape"])
        .attr( "fill", "blue")
        .attr( "x", d=>+d['x']+30).attr( "y", d=>+d['y']+7);
}

function Demo05_1() {
    useEffect(()=>{
          makeDemo05_1()
      })

    return (
        (<svg height="320" width="200" style={{"background" : 'lightgrey'}}>
        </svg>)
    );
}

export default Demo05_1;