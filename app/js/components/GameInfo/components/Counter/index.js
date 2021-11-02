import React, { Fragment } from "react";

import style from './css/style.css';

export default function Counter({ title, amount }) {
	return (
		<div className={style['counter']}>
			<div className={style.title}>{title}</div>
			<div className={style['counter-bg']}>888888</div>
			<div className={style['counter-amount']}>{amount}</div>
		</div>
	);
}
