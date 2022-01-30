import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo05_5() {
    var ds = [ [6, 2], [7, 3], [8, 1], [9, 2],[1, 1], [2, 2], [3, 4], [4, 4], [5, 2] ];
    ds = ds.sort( (a, b) => a[0] - b[0] )  // 因為線條產生器會依據資料順序繪製，如果我們有讓它由 x 座標小的畫至大的就要先排序過
    var xSc = d3.scaleLinear().domain([1,9]).range([50,250]);  // 先套用 scale 到資料集
    var ySc = d3.scaleLinear().domain([0,5]).range([175,25]);  // 讓後面的程式碼簡潔
    ds = ds.map( d => [xSc(d[0]), ySc(d[1])] );  // 封裝在一個物件中方便取用

    d3.select( "svg" ).append( "g" ).selectAll( "circle" )
        .data( ds ).enter().append( "circle" ).attr( "r", 3 )  // 傳入已經 scale 過的資料集
        .attr( "cx", d=>d[0] ).attr( "cy", d=>d[1] );  // 直接取用不需要 scale
    
    //var lnMkr = d3.line();  // 取得繪製線條產生器
    var lnMkr = d3.line()  // 取得繪製線條產生器
                    .x(d=>d[0])  // 設定 x 座標取用的資料
                    .y(d=>d[1])  // 設定 y 座標取用的資料
                    .defined((d, i) => i==3 ? false : true);  // 定義哪些點是不連的，
                    // 此例是第 4 個座標點是不可連線的，即第 3/5 點是沒有線段連向第 4 點
    d3.select( "svg" ).append( "g" ).append( "path" )
        .attr( "d", lnMkr(ds) )  // 將資料集傳給線條產生器
        .attr( "fill", "none" ).attr( "stroke", "red" );
}

function Demo05_5() {
    useEffect(()=>{
        makeDemo05_5()
    })

    return (
        (<svg height="200" width="300" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo05_5;