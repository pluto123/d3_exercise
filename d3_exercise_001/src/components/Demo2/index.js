import * as d3 from 'd3'
import { useEffect } from 'react';

function Demo2() {
    useEffect(()=>{
        d3.select('.Demo2')
          .append('svg')
          .attr('height', 300)
          .attr('width', 600)
          .style('background', 'lightgrey');
    
          d3.tsv("data/examples-multiple.tsv") // 讀取資料
            .then( function(data) {
              var pxX = 600, pxY = 300; // 設定 SVG 區域大小
            
            // 使用線性縮放，將 domain 映射到 range 中，
            // 也就說是將資料中的值，依據 SVG 尺寸來做線性縮放
            var scX = d3.scaleLinear()
              .domain(d3.extent(data, d => d["x"])) // extent() : 傳回 data 的 x 欄位中的最小值及最大值，以 [min, max] 形式傳回
              .range([0, pxX]);

            var scY1 = d3.scaleLinear()
              .domain(d3.extent(data, d=>d["y1"]))
              .range([pxY, 0]) // 因為座標原點在左上角，越往下越大，所以我們故意反轉來做修正

            var scY2 = d3.scaleLinear()
              .domain(d3.extent(data, d=>d["y2"]))
              .range([pxY, 0])

            d3.select("svg") // 傳回第一個匹配的點
              .append("g") // 建立一個邏輯分組後，才把圖形元素加入其中
              .attr("id", "ds1") // 設定唯一標識
              .selectAll("circle") // 在分組(ds1)中的子元素建立空的 circle collection
              .data(data).enter().append("circle") // 將 data 套用到 circle 元素
              .attr("r", 5) // 設定半徑固定為 5
              .attr("fill", "green") // 設定 <g> 元素的填充顏色為 green，也會一併套用到子元素中
              .attr("cx", d=>scX(d["x"])) // 此處是取得縮放過後的 x 值
              .attr("cy", d=>scY1(d["y1"])); // 此處是取得縮放過後的 y1 值

            d3.select("svg")
              .append("g")
              .attr("id", "ds2")
              .selectAll("circle")
              .data(data).enter().append("circle")
              .attr("r", 5)
              .attr("fill", "blue")
              .attr("cx", d=>scX(d["x"]))
              .attr("cy", d=>scY2(d["y2"]));

            var lineMaker = d3.line() // 使用 line() 幫助我們產生 <ptah> 中的 d 屬性
                .x( d => scX( d["x"] ) )
                .y( d => scY1( d["y1"] ) );
            
            d3.select( "#ds1" )  // 選到 <g id="ds1">
                .append( "path" )  // 添加一段路徑
                .attr( "fill", "none" )  // 實線
                .attr( "stroke", "red" )  // 顏色為 red
                .attr( "d", lineMaker(data) );
           
            lineMaker.y( d => scY2( d["y2"] ) );

            d3.select( "#ds2" )
                .append( "path" )
                .attr( "fill", "none" )
                .attr( "stroke", "cyan" )
                .attr( "d", lineMaker(data) );
          });
      })

    return (
        (<div className="Demo2"></div>)
    );
}

export default Demo2;