import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo08_2() {
    var cnv = d3.select( "#canvas" );  // 取得 HTML5 的 <canvas> 元素
    var ctx = cnv.node().getContext( "2d" );  // 先必須取得一個 2d 的 context 以供繪圖

    var pxX = 465, pxY = 250;  // 圖片像素大小
    var maxIter = 2000;  // 曼德博集合的最大迭代次數，https://zh.wikipedia.org/wiki/%E6%9B%BC%E5%BE%B7%E5%8D%9A%E9%9B%86%E5%90%88
    var x0 = -1.31, x1 = -0.845, y0 = 0.2, y1 = 0.45;
    
    var scX = d3.scaleLinear().domain([0, pxX]).range([x0, x1]);
    var scY = d3.scaleLinear().domain([0, pxY]).range([y1, y0]);
    
    var scC = d3.scaleLinear().domain([0,10,23,35,55,1999,2000])
        .range( ["white","red","orange","yellow","lightyellow",
		 "white","darkgrey"] );

    function mandelbrot( x, y ) {  // 曼德博公式
        var u=0.0, v=0.0, k=0;
        for( k=0; k<maxIter && (u*u + v*v)<4; k++ ) {
            var t = u*u - v*v + x;
            v = 2*u*v + y;
            u = t;
        }
        return k;
    }
    
    for( var j=0; j<pxY; j++ ) {  // 座標一點一點帶入取得顏色數值，並在畫布上畫出該座標點的顏色
        for( var i=0; i<pxX; i++ ) {
            var d = mandelbrot( scX(i), scY(j) );
            ctx.fillStyle = scC( d );
            ctx.fillRect( i, j, 1, 1 );
        }
    }
}

function Demo08_2() {
    useEffect(()=>{
        makeDemo08_2()
    })

    return (
        (<canvas id="canvas" height="250" width="465" style={{"background" : 'rgb(230, 230, 230)'}}>
        </canvas>)
    );
}

export default Demo08_2;