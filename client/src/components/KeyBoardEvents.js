import React from 'react';

class KeyBoardEvent extends React.Component {

 	componentDidMount () {
 		document.addEventListener('keydown', (e) => this.keyboardEvent(e))
 	}

 	componentWillUnmount () {
 		document.removeEventListener('keydown', (e) => this.keyboardEvent(e))
 	}

 	keyboardEvent (e) {
 		const { props } = this;

		if (e.keyCode === 39) {
			props.toggleSelected(props.selectedCell[0], props.selectedCell[1] + 1)
		}

		if (e.keyCode === 38) {
		  props.toggleSelected(props.selectedCell[0] - 1, props.selectedCell[1])
		}

		if (e.keyCode === 40) {
		  props.toggleSelected(props.selectedCell[0] + 1, props.selectedCell[1])
		}

		if (e.keyCode === 37) {
		  props.toggleSelected(props.selectedCell[0], props.selectedCell[1] - 1)
		}
 	}

	render () {
		return <div>{this.props.children}</div>
	}

}

export default KeyBoardEvent;