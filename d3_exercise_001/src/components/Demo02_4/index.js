import * as d3 from 'd3'
import { useEffect } from 'react';

function Demo02_4() {
    useEffect(()=>{
        var vs = ["From East", "to West", "at Home", "is Best"]
        d3.select('.Demo02_4')
          .append('ul').selectAll("li")
          .data(vs).enter()
          .append("li").text(d=>d)
          .on( "click", function() {
              this.toggleState = !this.toggleState;
              d3.select(this)  // 選擇被點選的元素
              .transition().duration(1000)
              .style("color", this.toggleState?"red":"black")
          });
    })

    return (
        (<div className="Demo02_4"></div>)
    );
}

export default Demo02_4;