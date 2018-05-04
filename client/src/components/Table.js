import React from 'react';

const Table = (props) => {
	return (
    <div className="table-outer-wrapper">
  		<table>
  			<tbody>
  				{props.children}
  			</tbody>
  		</table>
    </div>
	)
}

export default Table;