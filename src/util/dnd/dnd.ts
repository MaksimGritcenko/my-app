import {type PositionType} from '@store/notesSlice';

export const transformToPercent = (axis: number, maxAtAxis: number): number => Number((axis / maxAtAxis * 100).toFixed(2));

export const getPositionInPercent = ({x, y}: PositionType): PositionType => {
	const maxY = window.innerHeight;
	const maxX = window.innerWidth;

	return {x: transformToPercent(x, maxX), y: transformToPercent(y, maxY)};
};
