const CAR_HIT_SOUND_FILE_PATH = '/audio/hit.mp3';
const START_MUSIC_FILE_PATH = '/audio/start-game.mp3';

/**
 * Playing music file on start game
 */
export const playStartGameMusic = () => {
	let audioElement = new Audio(START_MUSIC_FILE_PATH);

	audioElement.play();
}

/**
 * Playing hit sound on car collision
 */
export const playCarHitSound = () => {
	let audioElement = new Audio(CAR_HIT_SOUND_FILE_PATH);

	audioElement.play();
}
