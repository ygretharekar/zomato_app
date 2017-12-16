import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	render(){
		return(
			<div>
				<h4>
                    Hello World!!
				</h4>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);