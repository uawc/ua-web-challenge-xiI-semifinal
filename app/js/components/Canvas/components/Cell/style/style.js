export const inactiveCellOuter = {
	strokeWidth: 3,
	fill: 'rgba(0,0,0,0)',
	stroke: 'rgba(0,0,0,0.05)'
};

export const inactiveCellInner = {
	fill: 'rgba(0,0,0,0.05)'
}

export const activeCellOuter = { ...inactiveCellOuter,
	stroke: 'rgba(0,0,0,1)'
};

export const activeCellInner = {
	fill: 'rgba(0,0,0,1)'
}
