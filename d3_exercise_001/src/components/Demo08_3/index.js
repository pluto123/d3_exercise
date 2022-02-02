import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo08_3() {
    d3.json( "data/haxby.json" ).then( drawContours );
}

function drawContours( scheme ) {
    var pxX = 525, pxY = 300;
    var scX = d3.scaleLinear().domain([-3, 1]).range([0, pxX]);    
    var scY = d3.scaleLinear().domain([-1.5, 1.5]).range([pxY, 0]);
    var scC = d3.scaleSequential(
        d3.interpolateRgbBasis(scheme["colors"]) ).domain([-1,1])
    var scZ = d3.scaleLinear().domain( [-1, -0.25, 0.25, 1] )         
        .range( [ "white", "grey", "grey", "black" ] );
    
    var data = [];
    var f = (x, y, b) => (y**4 + x*y**2 + b*y)*Math.exp(-(y**2))  // 使用此公式取得顏色數值
    for( var j=0; j<pxY; j++ ) {
        for( var i=0; i<pxX; i++ ) {
            data.push( f( scX.invert(i), scY.invert(j), 0.3 ) );
        }
    }
//    console.log(data);
    var svg = d3.select( "#contours" ), g = svg.append( "g" );
    var pathMkr = d3.geoPath();

    var conMkr = d3.contours().size([pxX, pxY]).thresholds(100);  // 設定輪廓線，設定統計範圍 (pxX, pxY) 大小，依據 Sturges’ formula 將數值分組
//    console.log(conMkr(data));
    g.append("g").selectAll( "path" ).data( conMkr(data) ).enter()
        .append( "path" ).attr( "d", pathMkr )
        .attr( "fill", d=>scC(d.value) ).attr( "stroke", "none" )
    
    conMkr = d3.contours().size( [pxX,pxY] ).thresholds( 10 );
    g.append("g").selectAll( "path" ).data( conMkr(data) ).enter()
        .append( "path" ).attr( "d", pathMkr )
        .attr( "fill", "none" ).attr( "stroke", d=>scZ(d.value) );
    
    g.select( "g" ).append( "path" )
        .attr( "d", pathMkr( conMkr.contour( data, 0.025 ) ) )
        .attr( "fill", "none" ).attr( "stroke", "red" )
        .attr( "stroke-width", 2 );

    svg.append( "g" ).call( d3.axisTop(scX).ticks(10) )
        .attr( "transform", "translate(0," + pxY + ")" );
    svg.append( "g" ).call( d3.axisRight(scY).ticks(5) );

    svg.append( "g" ).call( colorbox, [280,30], scC )
        .attr( "transform", "translate( 540,290 ) rotate(-90)" )
        .selectAll( "text" ).attr( "transform", "rotate(90)" );
    svg.append( "g" ).attr( "transform", "translate( 570,10 )" )
        .call( d3.axisRight( d3.scaleLinear()
                             .domain( [-1,1] ).range( [280,0] ) ) );
}

function colorbox( sel, size, colors, ticks ) {
    var [x0, x1] = d3.extent( colors.domain() );
    var bars = d3.range( x0, x1, (x1-x0)/size[0] );
    
    var sc = d3.scaleLinear().domain( [x0, x1] ).range( [0, size[0] ] );
    sel.selectAll( "line" ).data( bars ).enter().append( "line" )
        .attr( "x1", sc ).attr( "x2", sc )
        .attr( "y1", 0 ).attr( "y2", size[1] )
        .attr( "stroke", colors );
    
    sel.append( "rect" ).attr( "width", size[0] ).attr( "height", size[1] )
        .attr( "fill", "none" ).attr( "stroke", "black" )
    
    if( ticks ) {
        sel.append( "g" ).call( d3.axisBottom( ticks ) )
            .attr( "transform", "translate( 0," + size[1] + ")" );
    }
}

function Demo08_3() {
    useEffect(()=>{
        makeDemo08_3()
    })

    return (
        (<svg id="contours" height="300" width="600" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo08_3;