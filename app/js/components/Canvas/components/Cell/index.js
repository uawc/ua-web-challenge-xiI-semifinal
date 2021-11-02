import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
	activeCellInner,
	activeCellOuter,
	inactiveCellOuter,
	inactiveCellInner
} from './style/style';

Cell.propTypes = {
	isActive: PropTypes.bool,
	xPosition: PropTypes.number,
	yPosition: PropTypes.number,
	cellWidth: PropTypes.number,
	cellMargin: PropTypes.number,
	cellHeight: PropTypes.number
};

Cell.defaultProps = {
	cellMargin: 2,
	cellWidth: 20,
	cellHeight: 20
};

export default function Cell({...props}) {
	const {
		cellMargin,
		cellWidth,
		cellHeight,
		xPosition,
		yPosition,
		isActive,
	} = props;

	const xCoordinate = xPosition * (inactiveCellOuter.strokeWidth / 2 + cellMargin + cellWidth) + inactiveCellOuter.strokeWidth / 2 + cellMargin;
	const yCoordinate = yPosition * (inactiveCellOuter.strokeWidth / 2 + cellMargin + cellHeight) + inactiveCellOuter.strokeWidth / 2 + cellMargin;

	return (
		<Fragment>
			<rect x={xCoordinate} y={yCoordinate} style={isActive ? activeCellOuter : inactiveCellOuter} width={cellWidth} height={cellHeight} />
			<rect x={xCoordinate + cellWidth / 2 - cellWidth / 4} y={yCoordinate + cellHeight / 2 - cellHeight / 4} style={isActive ? activeCellInner : inactiveCellInner} width={cellWidth / 2} height={cellHeight / 2} />
		</Fragment>
	)
}
