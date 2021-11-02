import React from 'react';
import PropTypes from 'prop-types';

import Cell from './components/Cell';

import style from './css/style.css';

Canvas.propTypes = {
  map: PropTypes.arrayOf(PropTypes.array)
};

export default function Canvas({ ...props }) {
  const {
    map
  } = props;

  let cells = [];

	map.forEach((row, y) => row.forEach((element, x) => {
    cells.push(
      <Cell key={`${y}${x}`} xPosition={x} yPosition={y} isActive={!!map[y][x]} {...props}/>
    );
  }));

	return (
		<svg className={style.canvas}>
      {cells}
    </svg>
	)
}
