import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo05_7() {
    var ds = [ [6, 2], [7, 3], [8, 1], [9, 2],[1, 1], [2, 2], [3, 4], [4, 4], [5, 2] ];
    ds = ds.sort( (a, b) => a[0] - b[0] )  // 因為線條產生器會依據資料順序繪製，如果我們有讓它由 x 座標小的畫至大的就要先排序過
    var xSc = d3.scaleLinear().domain([1,9]).range([50,250]);  // 先套用 scale 到資料集
    var ySc = d3.scaleLinear().domain([0,5]).range([175,25]);  // 讓後面的程式碼簡潔
    ds = ds.map( d => [xSc(d[0]), ySc(d[1])] );  // 封裝在一個物件中方便取用

    d3.select( "svg" ).append( "g" ).selectAll( "circle" )
        .data( ds ).enter().append( "circle" ).attr( "r", 3 )  // 傳入已經 scale 過的資料集
        .attr( "cx", d=>d[0] ).attr( "cy", d=>d[1] );  // 直接取用不需要 scale
    
    var lnMkr = d3.line();  // 取得繪製線條產生器
    lnMkr.curve( myCurve )
    d3.select( "svg" ).append( "g" ).append( "path" )
        .attr( "d", lnMkr(ds) )  // 將資料集傳給線條產生器
        .attr( "fill", "none" ).attr( "stroke", "red" );
}

function myCurve( context ) {
    return {
        lineStart: function() {
            this.data = []
        },
        point: function( x, y ) {
            this.data.push( [x, y] )
        },
        lineEnd: function() {
            var xrange = d3.extent( this.data, d=>d[0] )
            var median = d3.median( this.data, d=>d[1] )

            context.moveTo( xrange[0], median )
            context.lineTo( xrange[1], median )
        }
    };
}

function Demo05_7() {
    useEffect(()=>{
        makeDemo05_7()
    })

    return (
        (<svg height="200" width="300" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo05_7;