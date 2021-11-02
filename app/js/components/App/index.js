import React from 'react';

import CanvasContainer from '../Canvas';
import GameInfo from '../GameInfo';

import style from './css/style.css';

export default function App() {
	return (
		<div className={style['app-content']}>
			<CanvasContainer/>
			<GameInfo/>
		</div>
	);
}
