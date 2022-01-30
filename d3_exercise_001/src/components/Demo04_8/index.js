import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo04_8() {
    d3.select("circle").on("click", function() {
        d3.select("circle")
            .transition().duration(1500).attr( "fill", "red")
            .transition().duration(1500).attr( "fill", "blue");
    })
}

function Demo04_8() {
    useEffect(()=>{
          makeDemo04_8()
      })

    return (
        (<svg height="200" width="200" style={{"background" : 'lightgrey'}}>
           <circle r="50" cx="100" cy="100" fill="green" />
        </svg>)
    );
}

export default Demo04_8;