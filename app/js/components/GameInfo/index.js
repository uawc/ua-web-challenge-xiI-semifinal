import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import Counter from './components/Counter';
import Distance from './components/Distance';

import style from './css/style.css';

const mapStateToProps = store => ({ store: store.gameInfo });

export default @connect(mapStateToProps)
class GameInfo extends React.Component {
	render() {
		const {
			speed,
			level,
			hiScore,
			isPause,
			lapScore,
			raceScore,
			isGameOver,
			totalDistance,
			currentDistance
		} = this.props.store;

		return (
			<Fragment>
				<div className={style['game-info']}>
					<Counter title={'Hi-score'} amount={hiScore}/>
					<Counter title={'Race-score'} amount={raceScore}/>
					<Counter title={'Lap-score'} amount={lapScore}/>
					<Distance totalDistance={totalDistance} currentDistance={currentDistance} />
					<Counter title={'Level'} amount={level}/>
					<Counter title={'Speed'} amount={speed}/>
					<div className={`${style.pause} ${isPause ? style.active : ''}`}>Pause</div>
					<div className={`${style['game-over']} ${isGameOver ? style.active : ''}`}>Game Over</div>
				</div>
			</Fragment>
		);
	}
}
