import React from 'react'
import {State} from '../../interfaces'
import transform from '../../utils/transform'
import {h3Class} from '../styles'
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
      <div className="flex pb-2">
        <Button flex={true} icon="cached" onClick={rotateY}>
          Rotate Y
        </Button>
      </div>
      <div className="flex">
        <Button flex={true} icon="remove" onClick={left}>
          X
        </Button>
        <Button flex={true} icon="add" onClick={right}>
          X
        </Button>
      </div>

      <div className="flex">
        <Button flex={true} icon="remove" onClick={down}>
          Y
        </Button>
        <Button flex={true} icon="add" onClick={up}>
          Y
        </Button>
      </div>

      <div className="flex">
        <Button flex={true} icon="remove" onClick={outward}>
          Z
        </Button>
        <Button flex={true} icon="add" onClick={inward}>
          Z
        </Button>
      </div>

      <h3 className={h3Class}>↘️ Flip model</h3>
      <div className="flex">
        <Button flex={true} icon="flip" onClick={flipx}>
          X
        </Button>
        <Button flex={true} icon="flip" onClick={flipy}>
          Y
        </Button>
        <Button flex={true} icon="flip" onClick={flipz}>
          Z
        </Button>
      </div>
    </div>
  )
}

export default TransformControls
