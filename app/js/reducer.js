import { combineReducers } from 'redux';

import canvas from './components/Canvas/reducer';
import gameInfo from './components/GameInfo/reducer';

export default combineReducers({ canvas, gameInfo });
