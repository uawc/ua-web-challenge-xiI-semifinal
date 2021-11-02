import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	isEscape,
	isArrowUp,
	isArrowDown,
	isArrowLeft,
	isArrowRight,
} from '../../utils/keyboard.util';
import {
	getMapFrame,
	addFoeCarToMap,
	startGamePattern,
	generateLevelMap,
	removeObjectFromMap,
} from '../../utils/map.util';
import {
	gameResumeAction,
	gamePauseAction,
	startGameAction,
	increaseScoreAction,
	gameOverAction,
	changePlayerCarSpeedAction,
	renderCanvasAction,
	speedUpPlayerCarAction,
	speedDownPlayerCarAction,
	changePlayerDistanceAction,
	updatePlayerCarAction,
	updateFoeCarAction,
	nextLevelAction
} from './actions';

import Canvas from './Canvas';
import { withAnimation } from '../../hoc/animation.hoc';
import { moveCarUp, moveCarAside } from '../../utils/car.util';
import { playStartGameMusic, playCarHitSound } from '../../utils/audio.util';
import { checkCollision, checkWallCollision } from '../../utils/collision.util';

const mapStateToProps = store => ({ store: store.canvas });

export default @withAnimation @connect(mapStateToProps)
class CanvasContainer extends React.Component {

	/**
	 * preventing component unnesesary rendering;
	 */
	shouldComponentUpdate(nextProps, nextState) {
		return !nextProps.store.currentMapFrame.equals(this.props.store.currentMapFrame);
	}

	/**
	 * subscribing to document events and starting canvas animation on componentDidMount
	 */
	componentDidMount() {
		window.addEventListener('keyup', this.onKeyUp, false);
		window.addEventListener('keydown', this.onKeyDown, false);

		this.props.startAnimation(this.animationCallback);
	}

	/**
	 * unsubscribing from events and stoping canvas animation on componentWillUnmount
	 */
	componentWillUnmount() {
		window.removeEventListener('keyup', this.onKeyUp, false);
		window.removeEventListener('keydown', this.onKeyDown, false);

		this.props.stopAnimation();
	}

	/**
	 * handle keyboard events
	 */
	onKeyDown = (event) => {
		let code = event.keyCode;

		if (isArrowRight(code) || isArrowLeft(code)) {
			this.movePlayerCarAside(isArrowLeft(code) ? 'left' : 'right');
		}

		if (isArrowUp(code)) {
				this.props.dispatch(speedUpPlayerCarAction(true));
		}

		if (isArrowDown(code)) {
				this.props.dispatch(speedDownPlayerCarAction(true));
		}

		if (isEscape(code) && this.props.store.isGameStarted) {
			this.props.store.isPause ? this.props.dispatch(gameResumeAction()) : this.props.dispatch(gamePauseAction())
		}

		if (!isArrowDown(code) && !isArrowUp(code) && !isArrowRight(code) && !isArrowLeft(code)) {
				this.startGame();
		}
	}

	/**
	 * restoring default values on keyUp event
	 */
	onKeyUp = (event) => {
		let code = event.keyCode;

		if (isArrowUp(code)) {
				this.props.dispatch(speedUpPlayerCarAction(false));
		}

		if (isArrowDown(code)) {
				this.props.dispatch(speedDownPlayerCarAction(false));
		}
	}

	/**
	 * starting game in case if it is not started yet
	 */
	startGame = () => {
		if (this.props.store.isGameStarted) return;

		playStartGameMusic();

		this.nextLevel();
		this.props.dispatch(startGameAction());
	}

	/**
	 * Ending game
	 */
	gameOver() {
		this.props.dispatch(gameOverAction());
	}

	/**
	 * Changing current game level to a next one
	 */
	nextLevel() {
		if (this.props.store.level === 5) {
			return this.gameOver();
		}

		const levelData = generateLevelMap(this.props.store.level + 1);
		const currentMapFrame = getMapFrame({ levelMap: levelData.levelMap, playerCar: levelData.playerCar });

		this.props.dispatch(nextLevelAction({ levelData, currentMapFrame }));
	}

	/**
	 * Moving player car to one cell up considering collision with objects
	 */
	movePlayerCarUp() {
		if (this.props.store.playerCar.speed <= 0) return;

		if (checkCollision(this.props.store.playerCar, this.props.store.oilPuddles, 'up')) {
			this.changePlayerSpeed(-3);
			playCarHitSound();
		}

		const { car, levelMap } = moveCarUp({ levelMap: this.props.store.levelMap, car: this.props.store.playerCar });

		if (checkCollision(car, [this.props.store.foeCar], 'up')) {
			this.changePlayerSpeed(-2000);
			playCarHitSound();

			return;
		}

		this.props.dispatch(updatePlayerCarAction({ playerCar: car, levelMap }));
		this.props.dispatch(changePlayerDistanceAction(this.props.store.distance - car.coordinates[0].y))
	}

	/**
	 * Moving player car to left or right side considering collision with objects
	 */
	movePlayerCarAside = (direction) => {
		if (!this.props.store.isGameStarted) return;

		const { car, levelMap } = moveCarAside({ levelMap: this.props.store.levelMap, car: this.props.store.playerCar, direction });

		if (checkWallCollision(car)) {
			return;
		}

		if (checkCollision(car, [this.props.store.foeCar])) {
			this.changePlayerSpeed(-2000);
			playCarHitSound();

			return;
		}

		this.props.dispatch(updatePlayerCarAction({ playerCar: car, levelMap }));
	}

	/**
	 * Randomly generating other cars if road is empty
	 */
	generateFoeCar = () => {
		let playerCarY = this.props.store.playerCar.coordinates[0].y;
		let foeCarY = this.props.store.foeCar.coordinates[0].y;

		if (playerCarY - foeCarY > -4 && playerCarY - foeCarY < 30 || playerCarY < 40) {
			return;
		}

		if (Math.floor(Math.random() * 1000) > this.props.store.foeCar.appearChance) {
			return;
		}

		const levelMap = removeObjectFromMap(this.props.store.foeCar, this.props.store.levelMap);
		const foeCar = addFoeCarToMap({ playerCar: this.props.store.playerCar, levelMap, level: this.props.store.level });

		this.props.dispatch(updateFoeCarAction({ foeCar, levelMap }));
	}

	/**
	 * Moving foe car to one cell up considering collision with objects
	 */
	moveFoeCarUp() {
		if (this.props.store.foeCar.speed <= 0) return;

		const { car, levelMap } = moveCarUp({ levelMap: this.props.store.levelMap, car: this.props.store.foeCar });

		if (checkCollision(car, [this.props.store.playerCar], 'up')) {
			playCarHitSound();
			return;
		}

		this.props.dispatch(updateFoeCarAction({ foeCar: car, levelMap }));
	}

	/**
	 * Randomly generating other cars if road is empty
	 */
	moveFoeCarAside = () => {
		if (Math.round(Math.random() * 1000) >= this.props.store.foeCar.changeLineChance) {
			return;
		}

		let data = moveCarAside({ levelMap: this.props.store.levelMap, car: this.props.store.foeCar, direction: 'left' });

		if (checkWallCollision(data.car)) {
			data = moveCarAside({ levelMap: this.props.store.levelMap, car: this.props.store.foeCar, direction: 'right' });
		}

		if (checkCollision(data.car, [this.props.store.playerCar], 'up')) {
			return;
		}

		this.props.dispatch(updateFoeCarAction({ foeCar: data.car, levelMap: data.levelMap }));
	}

	/**
	 * Rerendering ony one frame of level map to decrease amount of SVG elements
	 */
	renderCanvas() {
		const currentMapFrame = getMapFrame({ levelMap: this.props.store.levelMap, playerCar: this.props.store.playerCar });

		this.props.dispatch(renderCanvasAction(currentMapFrame));
	}

	/**
	 * Rerendering start game screen
	 */
	renderStartGameScreen() {
		this.props.dispatch(renderCanvasAction(startGamePattern));
	}

	/**
	 * Increasing player speed upon holding arrow up key
	 */
	handlePlayerCarSpeedUp() {
		if (this.props.store.isPlayerSpeedUp && this.props.store.playerCar.speed < this.props.store.playerCar.maxSpeed) {
			this.changePlayerSpeed(1);
		}
	}

	/**
	 * Decreasing player speed upon holding arrow down key
	 */
	handlePlayerCarSpeedDown() {
		if (this.props.store.isPlayerSpeedDown && this.props.store.playerCar.speed > 0) {
			this.changePlayerSpeed(-10);
		}
	}

	/**
	 * Changing player car speed
	 */
	changePlayerSpeed(speedDelta) {
		let playerCar = this.props.store.playerCar;
		let currentSpeed = playerCar.speed + speedDelta;
		let speed = currentSpeed < 0 ? 0 : currentSpeed > playerCar.maxSpeed ? playerCar.maxSpeed : currentSpeed;

		this.props.dispatch(changePlayerCarSpeedAction(speed));
	}

	/**
	 * Decreasing player speed upon releasing arrow up key
	 */
	slowDownPlayerCar() {
		if (!this.props.store.isPlayerSpeedUp && !this.props.store.isPlayerSpeedDown && this.props.store.playerCar.speed > 0) {
			this.changePlayerSpeed(-5);
		}
	}

	/**
	 * Checking whether player reached the finish line or not
	 */
	checkFinish() {
		if (checkCollision(this.props.store.playerCar, [this.props.store.finishLine], 'up')) {
			this.changePlayerSpeed(-2000);
			this.nextLevel();
			return;
		}
	}

	/**
	 * updating player score if player's car speed reached the maximum speed
	 */
	updateScore() {
		if (this.props.store.playerCar.speed === this.props.store.playerCar.maxSpeed) {
			this.props.dispatch(increaseScoreAction(1));
		}
	}

	/**
	 * Animation tick
	 */
	animationCallback = () => {
		if (!this.props.store.isGameStarted) {
			return this.renderStartGameScreen();
		}

		if (this.props.store.isPause) {
			return;
		}

		this.generateFoeCar();
		this.movePlayerCarUp();
		this.moveFoeCarUp();
		this.moveFoeCarAside();
		this.handlePlayerCarSpeedUp();
		this.handlePlayerCarSpeedDown();
		this.slowDownPlayerCar();
		this.updateScore();
		this.renderCanvas();
		this.checkFinish();
	}

	render() {
		return <Canvas {...this.props}
						onKeyUp={this.onKeyUp}
						onKeyDown={this.onKeyDown}
						map={this.props.store.currentMapFrame}/>
	}
}
