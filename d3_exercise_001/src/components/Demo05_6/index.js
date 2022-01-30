import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo05_6() {
    var ds0 = [[1,1], [2,2], [2.5,4], [3,4], [4,2], [4.5,2.5], [5,1.5]];
    var scX = d3.scaleLinear().domain([1,5]).range([0,180]);
    var scY = d3.scaleLinear().domain([0,4.5]).range([160,0]);
    var ds = ds0.map( d => [scX(d[0]), scY(d[1])] );
    var txtpos = [ scX(3), scY(0) ]
    
    var svg = d3.select( "svg" );
    
    svg.append( "g" ).attr( "transform", "translate( 40, 40 )" )
	.call( liner, ds, d3.curveLinear, "d3.curveLinear", txtpos );
    svg.append( "g" ).attr( "transform", "translate( 260, 40 )" )
	.call( liner, ds, d3.curveNatural, "d3.curveNatural", txtpos );
    svg.append( "g" ).attr( "transform", "translate( 480, 40 )" )
	.call( liner, ds, d3.curveMonotoneX, "d3.curveMonotoneX", txtpos );

    svg.append( "g" ).attr( "transform", "translate( 40, 250 )" )
	.call( liner, ds, d3.curveStep, "d3.curveStep", txtpos );
    svg.append( "g" ).attr( "transform", "translate( 260, 250 )" )
	.call( liner, ds, d3.curveStepAfter, "d3.curveStepAfter", txtpos );
    svg.append( "g" ).attr( "transform", "translate( 480, 250 )" )
	.call( liner, ds, d3.curveStepBefore, "d3.curveStepBefore", txtpos );

    // blue: val=0, ... red: val=1
    
    var vs = [ 1, 0.75, 0.5, 0.25, 0 ];
    svg.append( "g" ).attr( "transform", "translate( 40, 460 )" )
	.call( liner, ds, vs.map( v=>d3.curveCardinal.tension(v) ),
	       "d3.curveCardinal", txtpos );
    svg.append( "g" ).attr( "transform", "translate( 260, 460 )" )
	.call( liner, ds, vs.map( v=>d3.curveCatmullRom.alpha(v) ),
	       "d3.curveCatmullRom", txtpos );
    svg.append( "g" ).attr( "transform", "translate( 480, 460 )" )
	.call( liner, ds, vs.map( v=>d3.curveBundle.beta(v) ),
	       "d3.curveBundle", txtpos )
//   	.call( liner, ds, d3.curveBasisClosed, "", txtpos )
	.append( "text" )
	.attr( "x", txtpos[0] ).attr( "y", scY(-0.5) )
	.attr( "text-anchor", "middle" )
        .attr( "font-family", "sans-serif").attr( "font-size", "10.5pt" )
	.text( "d3.curveBasis" );
}

function liner( g, ds, curve, txt, pos ) {
    if( !(curve instanceof Array) ) {
	curve = [ curve ];
    }

    var sc = d3.scaleLinear()
	.domain( [0, 2, 4] ).range( ["red", "magenta", "blue"] );
    
    var lnMkr = d3.line();
    for( var i=0; i<curve.length; i++ ) {
	g.append( "path" ).attr( "d", lnMkr.curve(curve[i])(ds) )
   	    .attr( "fill", "none" ).attr( "stroke", sc(i) );
    }

    g.selectAll( "circle" ).data( ds ).enter().append( "circle" )
	.attr( "r", 3 )
	.attr( "cx", d=>d[0] ).attr( "cy", d=>d[1] )
	.attr( "fill", "black" );
    
    g.append( "text" )
	.attr( "x", pos[0] ).attr( "y", pos[1] )
	.attr( "text-anchor", "middle" )
        .attr( "font-family", "sans-serif").attr( "font-size", "10.5pt" )
	.text( txt );
}

function Demo05_6() {
    useEffect(()=>{
        makeDemo05_6()
    })

    return (
        (<svg height="695" width="700" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo05_6;