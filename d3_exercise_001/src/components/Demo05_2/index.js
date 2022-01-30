import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo05_2() {
    var data = [{"x": 30, "y": 30}]

    function arrow() {
        return "M0 0 L32 0 M16 8 L32 0 L16 -8";
    }

    var svg = d3.select( "svg" );
    svg.selectAll( "path" ).data(data).enter().append( "path" )
        .attr( "d", arrow )
        .attr( "fill", "red" )
        .attr( "transform",  // 一開始都是畫在左上角的原點，所以需要將他移到適當的位置
               d=>"translate(" + d["x"] + "," + d["y"] + ")" );
}

function Demo05_2() {
    useEffect(()=>{
          makeDemo05_2()
      })

    return (
        (<svg height="320" width="200" style={{"background" : 'lightgrey'}}>
        </svg>)
    );
}

export default Demo05_2;