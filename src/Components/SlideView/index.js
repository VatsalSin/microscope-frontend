import './style.css'
import '../../App.css'
import React from 'react'
import { STATE_CLASS_MAP } from "../../Config.js"

const App = (props) => {
  const state = props.state;
  const pointer = props.pointer ? props.pointer : [0,0];  

  const createHeader = (row) => {
  	return(
  		<tr key="0">
  			<td>0/0</td>
  			{row.map((data, idx) => (<td key={idx}>{idx+1}</td>))}
  		</tr>
  	)
  };

  const createCell = (data, rowIdx, colIdx) => {
    return(
  		<td key={colIdx+1} className={STATE_CLASS_MAP[data]}>{(pointer[0] == rowIdx && pointer[1] == colIdx) && "X"}</td>
  	)
  };

  let createRow = (data, rowIdx) => {
  	return(
  		<tr  key={rowIdx+1}>
		  	<td key="0">{rowIdx+1}</td>{data.map((data, colIdx) => createCell(data, rowIdx, colIdx))}
  		</tr>
  	)
  };

  if(state.length) {
  	return (
		<div className="slide">
			<table>
        <tbody>
		  		{createHeader(state[0])}
		  		{state.map(createRow)}
        </tbody>
			</table>
	   </div>
  	);
  } else {
  	return(
  		<span className="slide">Loading...</span>
  	);
  }
  
}

export default App;