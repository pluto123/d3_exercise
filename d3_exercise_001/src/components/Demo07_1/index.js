import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo07_1() {
    var gauss = d3.randomNormal( 75, 40 );
    var uni = d3.randomUniform( 2, 10 );
    var data = [];
    for( ; data.length < 50 ; ) {
	    var g = gauss();
	    if( g > 0 && g < 150 ) {
	        data.push( g )
	    }
    }
    var sc = d3.scaleQuantile().domain(data).range( [1,2,3] );
//    console.log( sc.invertExtent(1), sc.invertExtent(2), sc.invertExtent(3) );
    
    d3.select( "#quantile" ).selectAll( "circle" ).data(data).enter()
	.append( "circle" ).attr( "r", 2 ).attr( "fill", "red" )
	.attr( "cy", ()=>115+uni() ).attr( "cx", d=>d );
    d3.select( "#bd1" )
	.attr( "x1", sc.invertExtent(1)[1] )
	.attr( "x2", sc.invertExtent(1)[1] );
    d3.select( "#bd2" )
	.attr( "x1", sc.invertExtent(2)[1] )
	.attr( "x2", sc.invertExtent(2)[1] );
    d3.select( "#bin1" ).attr( "x", d3.mean(sc.invertExtent(1))-6 );
    d3.select( "#bin2" ).attr( "x", d3.mean(sc.invertExtent(2))-6 );
    d3.select( "#bin3" ).attr( "x", d3.mean(sc.invertExtent(3))-6 );
}

function readSvg() {
    // svg
    d3.svg( "data/ch7.svg" ).then( function(res) {
        d3.select( "svg" ).insert( ()=>res.firstChild, ":first-child" );
        d3.select( "#test" ).append( "use" ).attr( "href", "#quantize" );
        d3.select( "#test" ).append( "use" ).attr( "href", "#threshold");
        d3.select( "#test" ).append( "use" ).attr( "href", "#quantile");
        makeDemo07_1()
    } );
}

function Demo07_1() {
    useEffect(()=>{
        readSvg()
    })

    return (
        (<svg id="test" height="200" width="600" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo07_1;