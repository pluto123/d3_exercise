import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo03_3() {
    var data = [ "Steven", "Amy", "Eric" ];

    var ul = d3.select( "ul" );
    ul.selectAll( "li" )
        .data( data ).enter().append( "li" )
        .text( d=>d ); // <li>text</li>

    var done;
    ul.on( "mouseenter", function() {  // 當滑鼠移進 <ul> 時
        if( done ) { return; }  // 若已經移進過了就直接返回
        done = 1;
        ul.insert( "li", ":nth-child(2)" )  // 將 <li> 插入第二個元素 (Amy) 之前
            .datum( "Oscar" ).text( "Oscar" );  // 只會繫結 Oscar 這筆資料到所選的元素上
        ul.insert( "li", ":first-child" )
            .datum( "Rose" ).text( "Rose" );
    } );
        
    ul.on( "click", function() {
        ul.selectAll( "li" ).sort( (a,b)=>( a<b?1:b<a?-1:0 ) );  // 選擇所有 <li> 元素進行排序
    } );
}

function Demo03_3() {
    useEffect(()=>{
        d3.select('.Demo03_3')
          .append('ul')
          .attr('height', 300)
          .attr('width', 300)
          .style('background', 'lightgrey');
    
          makeDemo03_3()
      })

    return (
        (<div className="Demo03_3"></div>)
    );
}

export default Demo03_3;