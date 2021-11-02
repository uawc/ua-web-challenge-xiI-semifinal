import React, { Fragment } from "react";

import style from './css/style.css';

export default function Distance({ title, currentDistance, totalDistance }) {
	totalDistance = totalDistance - 18;

	let discatnce = currentDistance !== totalDistance ? Math.ceil(currentDistance * 5 / totalDistance) : 6;

	return (
		<div className={style['discatnce']}>
			<div className={style.title}>Distance</div>
			<div className={style['finish-icon']}></div>
			<div className={style['discatnce-bg']}>------</div>
			<div className={style['discatnce-amount']}>{'-'.repeat(discatnce)}</div>
		</div>
	);
}
