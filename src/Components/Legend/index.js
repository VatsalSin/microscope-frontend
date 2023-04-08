import './style.css'
import '../../App.css'
import React from 'react'
import { STATE_CLASS_MAP } from "../../Config.js"

const App = (props) => {

	const createRow = (key, idx) => {
		return(
			<tr key={idx+1}><td className={key}></td><td>{key}</td></tr>
		)
	};

 	return(
 		<div className="legend">
	 		<table>
	 			<tbody>
	 				<tr key="0"><td>X</td><td>Current-Cell</td></tr>
	 				{Object.values(STATE_CLASS_MAP).map(createRow)}
	 			</tbody>
	 		</table>
	 	</div>
 	)
}

export default App;