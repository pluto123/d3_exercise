import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo03_2() {
    var ds1 = [ [1, 1, "red"], [1, 4, "yellow"], [4, 1, "green"],
                [4, 4, "blue"] ];    
    var ds2 = [ [4, 4, "red"], [3, 3, "black"], [2, 2, "lime"],
                [1, 1, "blue"]];
    
    var scX = d3.scaleLinear().domain([1, 4]).range([50, 250]);
    var scY = d3.scaleLinear().domain([1, 4]).range([50, 250]);

    var svg = d3.select( "svg" );
    
    svg.on( "click", function() {
        [ ds1, ds2 ] = [ ds2, ds1 ];  // 置換資料集
        
        var cs = svg.selectAll( "circle" ).data( ds1, d=>d[2] );  // 1. 第一次將會建立空集合，第二次會根據 key 更新元素集
        
        cs.exit().remove();  // 2. 移除多餘的元素
        
        cs = cs.enter().append( "circle" )  // 3. 建立新的元素
            .attr( "r", 5 ).attr( "fill", d=>d[2] )  // 3. 配置新元素外觀
            .merge( cs );  // 4. 合併回原本的元素集

        cs.attr( "cx", d=>scX(d[0]) ).attr( "cy", d=>scY(d[1]) );  // 5. 調整外觀
    } );
    
    svg.dispatch( "click" );  // 因為一開始並沒有建立圓點，所以必須觸發一次 click 以便可以進行圓點的繪製
}

function Demo03_2() {
    useEffect(()=>{
        d3.select('.Demo03_2')
          .append('svg')
          .attr('height', 300)
          .attr('width', 300)
          .style('background', 'lightgrey');
    
          makeDemo03_2()
      })

    return (
        (<div className="Demo03_2"></div>)
    );
}

export default Demo03_2;