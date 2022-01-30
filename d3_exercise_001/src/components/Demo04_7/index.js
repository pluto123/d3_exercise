import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo04_7() {
    d3.select("#t1").transition().duration(2000).attr( "fill-opacity", 0);
    d3.select("#t2").transition().duration(2000).attr( "fill-opacity", 1);
}

function Demo04_7() {
    useEffect(()=>{
          makeDemo04_7()
      })

    return (
        (<svg height="300" width="600" style={{"background" : 'lightgrey'}}>
            <text id="t1" x="100" y = "100" fill-opacity="1">Hello</text>
            <text id="t2" x="100" y = "100" fill-opacity="0">Steven</text>
        </svg>)
    );
}

export default Demo04_7;