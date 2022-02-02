import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo07_4() {
    d3.text( "data/load.csv" ).then( res => {
        // prepare data
        var parse = d3.utcParse( "%H:%M:%S" );  // 建立剖析時間戳的函數
        var format = d3.utcFormat( "%H:%M" );  // 建立格式化時間戳的函數
        
        var data = d3.csvParse( res, function( d ) {  // 讀取資料
            return { ts: parse(d.timestamp), val: +d.load }
        } );

        var scT = d3.scaleUtc()
            .domain( d3.extent( data, d=>d.ts ) ).nice()
            .range( [ 50, 550 ] );
        var scY = d3.scaleLinear()
            .domain( [0, 100] ).range( [ 250, 50 ] );
        var scC = d3.scaleThreshold()  // 建立用臨界值方式建立 scale ( 小於 35: green, 35-75: orange, 大於 75 : red )
            .domain( [35, 75] ).range( ["green","orange","red"] );
        
        data = d3.pairs( data, (a,b) => { return { src: a, dst: b } } );  // 將一點一點的陣列，轉成具有起點與終點的線段對

        var svg = d3.select( "svg" ).attr( "cursor","crosshair" );
        
        svg.selectAll("line").data(data).enter().append("line")  // 不同於之前使用 D3 的 line 產生器，此種曲線必須自己客製化
            .attr( "x1", d => scT(d.src.ts) ) 
            .attr( "x2", d => scT(d.dst.ts) )
            .attr( "y1", d => scY(d.src.val) )
            .attr( "y2", d => scY(d.dst.val) )
            .attr( "stroke", d=>scC( (d.src.val + d.dst.val)/2 ) );

        svg.append( "g" ).attr( "transform", "translate(50,0)" )  //<7>
            .call( d3.axisLeft(scY) );
        svg.append( "g" ).attr( "transform", "translate(0,250)" )        
            .call( d3.axisBottom(scT).tickFormat( format )
                   .ticks( d3.utcMinute.every(10) ) );

        // 製作滑動鼠標而顯示曲線數值
        var txt = svg.append("text").attr("x",100).attr("y",50)   // 定義數值顯示位置
            .attr("font-family","sans-serif").attr("font-size",14);
        svg.on( "mousemove", function(event) {
            var pt = d3.pointer( event, svg.node() )
            txt.text( format( scT.invert( pt[0] ) ) + " | " +     // 依據滑鼠 x 座標反算 x 軸的數值
                      d3.format( ">2d" )( scY.invert(pt[1]) ) );  // 依據滑鼠 y 座標反算 y 軸的數值
        } );    
    } );
}

function Demo07_4() {
    useEffect(()=>{
        makeDemo07_4()
    })

    return (
        (<svg height="300" width="600" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo07_4;