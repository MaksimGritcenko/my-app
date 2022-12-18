import {memo, type FC, type MouseEvent} from 'react';

import './CloseBtn.scss';

export type PropsType = {
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const CloseBtn: FC<PropsType> = ({onClick}) => (
	<button className='CloseBtn' onClick={onClick} />
);

export default memo(CloseBtn);
