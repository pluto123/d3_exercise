import * as d3 from 'd3'
import { useEffect } from 'react';

function App() {

  useEffect(()=>{
    d3.select('.App')
      .append('svg')
      .attr('height', 200)
      .attr('width', 500)
      .style('background', 'red');
    
      d3.select(test)
      .append('svg')
      .attr('height', 200)
      .attr('width', 500)
      .style('background', 'blue');
  })

  return (
    <div className="App">
      <div id="test"></div>
    </div>
  );
}

export default App;
