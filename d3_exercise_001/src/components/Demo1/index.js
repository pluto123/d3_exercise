import * as d3 from 'd3'
import { useEffect } from 'react';

function Demo1() {
    useEffect(()=>{
        d3.select('.Demo1')
          .append('svg')
          .attr('height', 300)
          .attr('width', 600)
          .style('background', 'lightgrey');
    
          d3.tsv("examples-simple.tsv") // 讀取資料
            .then( function(data) {
            d3.select("svg") // 傳回第一個匹配的點
              .selectAll("circle") // 傳回所有匹配的點，在此時因為沒有找不到任何一個，所以將會建立一個空的 collection
              .data(data) // 將 circle 元素與資料集一對一地結合在一起
              .enter() // 但是並沒有任何的 circle 元素可以對應資料集，所以使用此方法讓 D3 先幫我們佔著
              .append("circle") // 針對只有資料沒有元素對應的點，使用 circle 元素幫我們填充
              .attr("r", 5) // 設定半徑固定為 5
              .attr("fill", "red") // 設定填充的顏色為 red
              .attr("cx", function(d) {return d["x"]}) // 取得 data 的 x 欄位來設定 cx
              .attr("cy", function(d) {return d["y"]}); // 取得 data 的 y 欄位來設定 cy
          });
      })

    return (
        (<div className="Demo1"></div>)
    );
}

export default Demo1;