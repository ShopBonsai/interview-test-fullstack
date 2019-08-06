import React from 'react';

export default function Popup(props) {
	return (
		<span className="popup">
			<strong>{props.product} ({props.qtyVal})</strong> was added to your cart!
		</span>
	)
}