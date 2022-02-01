import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo05_8() {
    var data = [ { name: "Jim", votes: 12 },
                 { name: "Sue", votes:  5 },
                 { name: "Bob", votes: 21 },
                 { name: "Ann", votes: 17 },
                 { name: "Dan", votes:  3 } ];

    var pie = d3.pie()  // 傳回一個 pie layout
                .value(d=>d.votes)  // 設定 pie 的數值
                //.sort( null )  // 預設為正向排序 (多到少)，依據資料集順序
                //.sort( (a, b) => a.votes - b.votes)  // 反序 (少到多)
                .padAngle(0.025)  // 設定兩個餅之間的距離
                ( data );  // 傳入資料集
    
    var arcMkr = d3.arc()  // 傳回一個 arc 產生器
                    .innerRadius( 50 )  // 設定內徑
                    .outerRadius( 150 )  // 設定外徑
                    .cornerRadius( 10 );  // 設定邊角的圓角半徑 
    
    var scC = d3.scaleOrdinal( d3.schemePastel2 ) // 建立每個 pie 對應的顏色盤
        .domain( pie.map(d=>d.index) )  // 使用 index 做區別
    
    var g = d3.select( "svg" )  // 建立一個容器元素用以裝 path
        .append( "g" ).attr( "transform", "translate(300, 175)" )

    g.selectAll( "path" ).data( pie ).enter().append( "path" )  // 傳入 pie 結構的資料集
        .attr( "d", arcMkr )  // 根據 pie 結構繪製弧形
        .attr( "fill", d=>scC(d.index) ).attr( "stroke", "grey" );

    g.selectAll( "text" ).data( pie ).enter().append( "text" )  // 繪製文字標籤
        .text( d => d.data.name )
        .attr( "x", d=>arcMkr.innerRadius(85).centroid(d)[0] )  // 取內徑到外徑的中點當位置
        .attr( "y", d=>arcMkr.innerRadius(85).centroid(d)[1] )
        .attr( "font-family", "sans-serif" ).attr( "font-size", 14 )
        .attr( "text-anchor", "middle" );
}

function Demo05_8() {
    useEffect(()=>{
        makeDemo05_8()
    })

    return (
        (<svg height="350" width="600" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo05_8;