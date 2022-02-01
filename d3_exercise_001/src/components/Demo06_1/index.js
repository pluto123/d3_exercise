import * as d3 from 'd3'
import { useEffect } from 'react';

function readJson() {
    // json
    d3.json( "data/simple.json" ).then( 
        res => console.log( res.val, res.txt ) 
    );
}

function readImage() {
    // image
    d3.image( "data/image.jpg" ).then( function(res) {
    	d3.select( "svg" ).append( () => res ) 
    } );
}

function readSvg() {
    // svg
    d3.svg( "data/heart.svg" ).then( function(res) {
        d3.select( "svg" ).insert( ()=>res.firstChild, ":first-child" );
        d3.select( "svg" ).append( "use" ).attr( "href", "#heart" )
                .attr( "transform", "translate(100,100) scale(2)" );
    } );
}

function readCsv() {
    // csv
    d3.text( "data/csv.csv" ).then( function(res) {
        var data = d3.csvParse( res, (d,i,cs) => {
            return {
                date: new Date( d.Year, d.Month-1 ),
                name: d.Name,
                weight: +d["Weight (kg)"]
            };
        } );
        console.log( data );                             
    } );
}

function readAndParse(data) {
    // more csv
    d3.csv( "data/csv.csv" ).then( function(res) {
        data = res;
        console.log( "1", data );
    } );

    d3.text( "data/csv.csv" ).then( function(res) {
        data = d3.csvParse( res );
        console.log( "2", data );
    } );
    
    d3.text( "data/csv.csv" ).then( function(res) {
        var parser = d3.dsvFormat( "," );
        data = parser.parse( res );
        console.log( "3", data );
    } );
}

function readAndParseWhiteSpace() {
    // general whitespace
    d3.text( "data/txt.txt" ).then( function(res) {
        var parser = d3.dsvFormat( "" ) // ( "\0" );
        var rows = parser.parseRows( res, function(d, i, cs) {     
                return d[0].split( /\s+/g ).map( x => +x );            // <3> <4>
        } );
        console.log( rows );
    } );
}

function numberFormatting(){
    // number formatting
    d3.json( "https://unpkg.com/d3-format/locale/de-DE.json" ).then(
        function( res ) {           
                var loc = d3.formatLocale( res );
                console.log( loc.format( ".4f" )( Math.PI ) );
        },
        function( err ) {
                throw err;
        }
    );    
}


function makeDemo06_1() {
//    readJson()
//    readImage()
//    readSvg()
//    readCsv()
//    readAndParse()
//    readAndParseWhiteSpace()
    numberFormatting()
}

function Demo06_1() {
    useEffect(()=>{
        makeDemo06_1()
    })

    return (
        (<svg height="600" width="600" style={{"background" : 'rgb(230, 230, 230)'}}>
        </svg>)
    );
}

export default Demo06_1;