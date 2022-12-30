import React from 'react'
import {State} from '../../interfaces'
import transform from '../../utils/transform'
import {btnClass, h3Class} from '../styles'
import {Button} from './Button'

type Props = {
  state: State
}

const TransformControls = (props: Props) => {
  const pd = (fn: (state: State) => void) => {
    fn(props.state)
    props.state.render()
  }

  const down = () => pd(transform.down)
  const up = () => pd(transform.up)
  const left = () => pd(transform.left)
  const right = () => pd(transform.right)
  const inward = () => pd(transform.inward)
  const outward = () => pd(transform.outward)
  const flipx = () => pd(transform.flipx)
  const flipy = () => pd(transform.flipy)
  const flipz = () => pd(transform.flipz)
  const rotateY = () => pd(transform.rotateYObjects)

  return (
    <div className="pb-5">
      <div className="flex">
        <button className={`${btnClass} flex-1`} onTouchEnd={rotateY} onClick={rotateY}>
          rotate Y
        </button>
        <br />
      </div>
      <Button onClick={left}>- x</Button>
      <Button onClick={right}>+ x</Button>
      <br />
      <Button onClick={down}>- y</Button>
      <Button onClick={up}>+ y</Button>
      <br />
      <Button onClick={outward}>- z</Button>
      <Button onClick={inward}>+ z</Button>
      <br />
      <h3 className={h3Class}>↘️ Flip model</h3>
      <Button onClick={flipx}>x</Button>
      <Button onClick={flipy}>y</Button>
      <Button onClick={flipz}>z</Button>
    </div>
  )
}

export default TransformControls
