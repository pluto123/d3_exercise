import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo07_2() {
    var sc = d3.scaleLinear().domain( [0,10] ).range( [0,200] );  // 輸入區間為 0 ~ 10，輸出像素範圍為 0 ~ 200

    d3.select( "svg" ).append( "g" )
        .attr( "transform", "translate( 50,50)" )
        .call( d3.axisBottom(sc) );
    
    d3.select( "svg" ).append( "g" )
        .attr( "transform", "translate( 50,125)" )
        .call( d3.axisBottom(sc).tickFormat( d3.format(".1f") ) )  // 刻度格式取小數點後一位
        .selectAll( "text" )
        .filter( (d,i)=>i%2!=0 ).attr( "visibility", "hidden" );  // 偶數刻度才顯示

    d3.select( "svg" ).append( "g" )
        .attr( "transform", "translate(350,50)" )
        .call( d3.axisBottom(sc).tickFormat( ()=>"" ) );  // 消除刻度標籤
    d3.select( "svg" ).append( "g" )
        .attr( "transform", "translate(350,50)" )
        .call( d3.axisBottom( sc ).ticks(2) )  // 分隔成 2 等份
        .append( "text" ).text( "Metric" )
        .attr( "x", sc(5) ).attr("y", 35 )
        .attr( "font-size", 12 ).attr( "fill", "black" );
    
    var g = d3.select( "svg" ).append( "g" )
        .attr( "transform", "translate(350,125)" )
        .call( d3.axisBottom(sc).tickPadding( 5 ) );
    g.select( ".domain" ).attr( "visibility", "hidden" );  // 隱藏軸線
    g.selectAll( ".tick" ).select( "line" )
        .attr( "stroke", "red" ).attr( "stroke-width", 2 );  // 改變刻度記號
    g.selectAll( "text" ).attr( "font-size", 14 );  // 改變刻度標籤
}

function Demo07_2() {
    useEffect(()=>{
        makeDemo07_2()
    })

    return (
        (<svg height="200" width="600" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo07_2;