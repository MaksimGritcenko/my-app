/* eslint-disable */
import React, {useState} from 'react';
import type {RootState, AppDispatch} from 'store/index';
import type {TypedUseSelectorHook} from 'react-redux';

import {useAppSelector, useAppDispatch} from 'util/hooks/hooks';
import {
	// decrement,
	// increment,
	// incrementByAmount,
	// incrementAsync,
	// incrementIfOdd,
	// selectCount,
} from './counterSlice';
// Import styles from './Counter.module.css';

export function Counter() {
	// const count: number = useAppSelector(selectCount);
	// const dispatch: AppDispatch = useAppDispatch();
	// const [incrementAmount, setIncrementAmount] = useState('2');

	// const incrementValue = Number(incrementAmount) || 0;

	return (
		<div>
			<div>
				<button
					aria-label='Decrement value'
					// onClick={() => dispatch(decrement())}
				>
          -
				</button>
				{/* <span >{count}</span> */}
				<button
					//   ClassName={styles.button}
					aria-label='Increment value'
					// onClick={() => dispatch(increment())}
				>
          +
				</button>
			</div>
			<div >
				<input
					//   ClassName={styles.textbox}
					aria-label='Set increment amount'
					// value={incrementAmount}
					onChange={e => {
						// setIncrementAmount(e.target.value);
					}}
				/>
				<button
					//   ClassName={styles.button}
					// onClick={() => dispatch(incrementByAmount(incrementValue))}
				>
          Add Amount
				</button>
				<button
					//   ClassName={styles.asyncButton}
					// onClick={() => dispatch(incrementAsync(incrementValue))}
				>
          Add Async
				</button>
				<button
					//   ClassName={styles.button}
					// onClick={() => dispatch(incrementIfOdd(incrementValue))}
				>
          Add If Odd
				</button>
			</div>
		</div>
	);
}
