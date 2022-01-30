import * as d3 from 'd3'
import { useEffect } from 'react';

function makeDemo05_3() {
    var data = [ [180, 1], [260, 3], [340, 2], [420, 4] ]; // [x, scale]

    d3.select( "svg" )
        .selectAll( "use" ).data( data ).enter().append( "use" )  // 建立可以引用 defs 的元素
        .attr( "href", "#crosshair" )                             // 使用 ID 選取器設定引用哪個 defs
        .attr( "transform",                                       // 移動位置與縮放比例
               d=>"translate("+d[0]+",50) scale("+2*d[1]+")" )
        .attr( "stroke", "black" )                                // 設定框線
        .attr( "stroke-width", d=>0.5/Math.sqrt(d[1]) );          // 設定框線寬度
    
    d3.select("svg").append( "use" )
        .attr( "href", "#my_symbol")
        .attr( "transform",
            d=>"translate(50, 50) scale(2)" )
        .attr( "stroke", "blue" )
        .attr( "stroke-width", "12" );   
}

function Demo05_3() {
    useEffect(()=>{
        var d = d3.select( "svg" ).append("defs").append("g").attr("id", "my_symbol")
        d.append("line").attr("x1", -1).attr("y1", 1).attr("x2", 1).attr("y2", -1);
        d.append("line").attr("x1", -1).attr("y1", -1).attr("x2", 1).attr("y2", 1);
        makeDemo05_3()
    })

    return (
        (<svg height="100" width="600" style={{"background" : 'lightgrey'}}>
            <defs>  {/* 定義一個元件 */}                                 
                <g id="crosshair">  {/* 建立容器元素來容納所需元素 */}                              
                    <circle cx="0" cy="0" r="2" fill="none"/> {/* 因為最後在使用時會縮放大小，所以尺寸大小在這裡並不重要 */} 
                    <line x1="-3" y1="0" x2="-1" y2="0" />                    
                    <line x1="1" y1="0" x2="3" y2="0" />
                    <line x1="0" y1="-1" x2="0" y2="-3" />
                    <line x1="0" y1="1" x2="0" y2="3" />
                </g>                                                        
            </defs>
        </svg>)
    );
}

export default Demo05_3;