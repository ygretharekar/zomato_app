import React from 'react';


class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			hasError: false,
			error: null,
			errorInfo: null 
		};
	}

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState(
			{ 
				hasError: true,
				error: error,
				errorInfo: info 
			}
		);
		// You can also log the error to an error reporting service
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <div>
				<h1>Something went wrong.</h1>
				<details style={{ whiteSpace: 'pre-wrap' }}>
					{this.state.error && this.state.error.toString()}
					<br />
					{this.state.errorInfo.componentStack}
				</details>
			</div>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;