import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo07_3() {
    d3.text( "data/cost.csv" ).then( res => {
        var data = d3.csvParseRows( res, d => [ +d[0], +d[1] ] );  // 讀取資料

        function draw( sel, scX, scY, width, height ) { // 繪製線圖函數
            scX = scX.domain( d3.extent( data, d=>d[0] ) ).nice()  // extent() 算出最大及最小值
                .range( [ 0, width ] );
            scY = scY.domain( d3.extent( data, d=>d[1] ) ).nice()
                .range( [ height, 0 ]);

            var ds = data.map( d=>[ scX(d[0]), scY(d[1]) ] );  // 導入資料集
            sel.append( "path" ).classed( "curve", true )  // 設定 <path> 的 calss name 為 curve
                .attr( "d", d3.line()(ds) ).attr( "fill", "none" )  // 使用 line 產生器依據資料集 ds 繪製一條直線

            sel.append( "g" )
                .call( d3.axisBottom( scX ).ticks(10, "d") )  // 分成 10 等份，而刻度標籤格式為整數
                .attr( "transform", "translate( 0,"+height+")" );
            
            sel.append( "g" ).call( d3.axisLeft( scY ) );
        }
        
        d3.select( "svg" ).append( "g" )
            .attr( "transform", "translate( 50, 50 )" )
            .call( draw,d3.scaleLinear(),d3.scaleLinear(),500,500 )
            .select( ".curve" ).attr( "stroke", "red" );
           
        d3.select( "svg" ).append( "g" )
            .attr( "transform", "translate( 200, 50 )" )
            .call( draw,d3.scaleLinear(),d3.scaleLog(),350,250 )
            .select( ".curve" ).attr( "stroke", "blue" );
    } );
}

function Demo07_3() {
    useEffect(()=>{
        makeDemo07_3()
    })

    return (
        (<svg height="600" width="600" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo07_3;