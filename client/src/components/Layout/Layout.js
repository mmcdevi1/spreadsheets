import React from 'react';

class Layout extends React.Component {
	render () {
		return (
			<div className="app">
				{ this.props.children }
			</div>
		)
	}
}

export default Layout;