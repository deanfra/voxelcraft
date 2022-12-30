import React, {useEffect, useState} from 'react'
import {State} from '../../interfaces'
import toCommand from '../../utils/converter'
import {
  h2Class,
  modalCloseClass,
  modalClosedClass,
  modalInnerClass,
  modalOpenedClass,
} from '../styles'
import CommandCode from './CommandCode'

type Props = {
  state: State
  show: boolean
  onClose: () => void
}

const CommandModal = ({state, show, onClose}: Props) => {
  const [generated, setGenerated] = useState<string[]>([])

  useEffect(() => {
    state.modalOpen = show
    setGenerated(toCommand(state.objects))
  }, [show])

  return (
    <div className={show ? modalOpenedClass : modalClosedClass}>
      <div className={modalInnerClass} style={{height: '100%'}}>
        <h2 className={h2Class}>{`🎁 Your ${
          generated.length > 1 ? generated.length : ''
        } command block code${generated.length > 1 ? 's' : ''}`}</h2>
        <button title="Close" className={modalCloseClass} onTouchEnd={onClose} onClick={onClose}>
          Close
        </button>
        {generated.map((code, i) => (
          <div>
            {generated.length > 1 ? (
              <small>
                Block {i + 1}/{generated.length}
              </small>
            ) : (
              ''
            )}
            <CommandCode i={i} code={code} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommandModal
