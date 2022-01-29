import * as d3 from 'd3'
import { useEffect } from 'react';


function makeDemo02_3() {
    d3.tsv("data/examples-multiple.tsv")
        .then( function(data) {
            var svg = d3.select( "svg" );
            var pxX = svg.attr( "width" );
            var pxY = svg.attr( "height" );

            var makeScale = function( accessor, range) {
                return d3.scaleLinear()
                    .domain(d3.extent(data, accessor))
                    .range( range ).nice();
            }
            var scX = makeScale( d => d["x"], [0, pxX]);
            var scY1 = makeScale( d => d["y1"], [pxY, 0]);
            var scY2 = makeScale( d => d["y2"], [pxY, 0]);

            var drawData = function(g, accessor, curve) {
                // draw circles
                g.selectAll("circle")
                    .data(data).enter().append("circle")
                    .attr("r", 5)
                    .attr("cx", d=>scX(d["x"]))
                    .attr("cy", accessor);
                
                // draw lines
                var lineMaker = d3.line().curve( curve )
                    .x( d => scX( d["x"] ) )
                    .y( accessor );
                g.append( "path" )
                    .attr( "fill", "none" )
                    .attr( "d", lineMaker(data) );
            }

            var g1 = svg.append("g");
            var g2 = svg.append("g");

            drawData( g1, d => scY1( d["y1"] ), d3.curveStep);
            drawData( g2, d => scY2( d["y2"] ), d3.curveNatural);

            g1.selectAll( "circle" ).attr( "fill", "green");
            g1.selectAll( "path" ).attr( "stroke", "cyan");

            g2.selectAll( "circle" ).attr( "fill", "blue");
            g2.selectAll( "path" ).attr( "stroke", "red");

            var axMkr = d3.axisRight( scY1 ); // 所有元素都是由左上角的原點畫起，所以是這會是在圖形的左邊畫出軸，在軸的右邊標出刻度
            axMkr( svg.append("g") ); // 將軸元素附加到一個容器元素中，通常是使用 <g>

            axMkr = d3.axisLeft( scY2 );
            svg.append( "g" )
                .attr( "transform", "translate(" + pxX + ",0)" ) // 因為繪圖是由左上角的原點畫起，所以我們要將元素都往右邊移
                .call( axMkr ); // call() 會呼叫傳入的參數 axMkr，此參數為一個 function 就會被呼叫用來會軸

            svg.append( "g" ).call( d3.axisTop( scX ) )
                .attr( "transform", "translate(0,"+pxY+")" );
        }
    )
}

function Demo02_3() {
    

    useEffect(()=>{
        d3.select('.Demo02_3')
          .append('svg')
          .attr('height', 300)
          .attr('width', 600)
          .style('background', 'lightgrey');
    
          makeDemo02_3()
      })

    return (
        (<div className="Demo02_3"></div>)
    );
}

export default Demo02_3;