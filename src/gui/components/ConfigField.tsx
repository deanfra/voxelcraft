import React, {useState} from 'react';
import { blockNames } from '../../config';
import { btnClass, inputClass } from '../styles';
import BlockSelector from './BlockSelector';
import BlockSelectorButton from './BlockSelectorButton';

type Value = number | string | boolean
type Props = {
  id: string
  type: 'material' | 'boolean' | 'number' | 'string'
  onChange: (id: string, value: Value) => void
  value: Value
}

const ConfigField = ({id, value, type, onChange}: Props) => {
  const [valueState, setValueState] = useState<Value>(value)
  const [showSelector, setShowSelector] = useState<Boolean>(false)
  
  const change = (newValue: Value) => {
    setValueState(newValue)
    onChange(id, newValue)
  }

  return <>
    {
      type === 'boolean' &&
        <button
          onClick={() => change(!valueState)}
          onTouchEnd={() => change(!valueState)}
          className={btnClass}>
            {valueState ? 'yes' : 'no'}
        </button>
    }
    {
      type === 'number' &&
        <input
            key={`input${id}`}
            id={id}
            name={id}
            value={valueState as number}
            type="number"
            className={inputClass}
            onChange={(e) => {change(e.target.value)}} 
          />
    }
    {
      type === 'material' &&
        <div>
          <p className='text-right'>
            <BlockSelectorButton
              name={value as string}
              selected={false}
              onclick={() => setShowSelector(!showSelector)} />
          </p>
          {showSelector ?
            <div>
              <BlockSelector
                blockNames={blockNames}
                onClick={(val) => {
                  setShowSelector(false)
                  change(val)
                }}
              />
            </div>
          : null}
          
       </div>
    }
  </>
}

export default ConfigField
