import React, { useState } from 'react';
import { State } from '../../interfaces';
import { blockSelectorWrap, btnClass } from '../styles';

type Props = {
	state: State
}

// Stair block States
// facing - north, east, south, west
// half - bottom, top
// shape - straight, inner_left, inner_right, outer_left, outer_right

const facing = ['north', 'east', 'south', 'west']
const halfs = ['top', 'bottom']

const getNext = (cur: string, arr: string[]) => {
  const nextIndex = arr.indexOf(cur) + 1
  return arr[nextIndex] || arr[0]
}

const StairControls = ({state}: Props) => {
  const [direction, setDirection] = useState(state.stairFacing)
  const [half, setHalf] = useState(state.stairHalf)

  const changeDir = (val: string) => {
    const next = getNext(val, facing)
    state.stairFacing = next
    setDirection(next)
  }

  const changeHalf = (val: string) => {
    const next = getNext(val, halfs)
    state.stairHalf = next
    setHalf(next)
  }

	return <div className={`${blockSelectorWrap} h-auto mb-4 flex`}>
		<button className={btnClass} onTouchEnd={() => changeDir(direction)} onClick={() => changeDir(direction)}>
      facing {direction}
    </button>
		<button className={btnClass} onTouchEnd={() => changeDir(half)} onClick={() => changeHalf(half)}>
      {half} down
    </button>
	</div>
}

export default StairControls
