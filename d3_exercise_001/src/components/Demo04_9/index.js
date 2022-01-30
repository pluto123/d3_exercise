import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo04_9() {
    d3.select("svg").on("click", function() {
        d3.select("circle")
            .transition().duration(2000).ease( t=>t )
            .attrTween( "fill", function() {
                return t=>"hsl("+360*t+", 100%, 50%)"
            });
        d3.select("rect")
            .transition().duration(2000).ease( t=>t )
            .attrTween( "transform", function() {
                return t=>"rotate("+360*t+",200,200)"
            })
    })

}

function Demo04_9() {
    useEffect(()=>{
          makeDemo04_9()
      })

    return (
        (<svg height="400" width="400" style={{"background" : 'lightgrey'}}>
           <circle r="50" cx="200" cy="200" fill="white" />
           <rect x="280" y="280" width="40" height="40" fill="black" />
        </svg>)
    );
}

export default Demo04_9;