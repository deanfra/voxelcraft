import React, {useState} from 'react';
import { btnClass, btnHoverClass, inputClass } from '../styles';
import BlockSelector from './BlockSelector';
import BlockSelectorButton from './BlockSelectorButton';
import {PanelConfigValue, PanelConfigType} from '../../interfaces/index'

type Props = {
  id: string
  type: PanelConfigType
  onChange: (id: string, value: PanelConfigValue) => void
  value: PanelConfigValue
}

const ConfigField = ({id, value, type, onChange}: Props) => {
  const [valueState, setValueState] = useState<PanelConfigValue>(value)
  const [showSelector, setShowSelector] = useState<Boolean>(false)
  
  const change = (newValue: PanelConfigValue) => {
    setValueState(newValue)
    onChange(id, newValue)
  }

  return <>
    {
      type === 'boolean' &&
        <button
          onClick={() => change(!valueState)}
          onTouchEnd={() => change(!valueState)}
          className={`${btnClass} ${valueState ? btnHoverClass : ''}`}>
            {valueState ? 'YES' : 'NO'}
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
        <>
          {showSelector ?
            <div className="w-3/4">
              <BlockSelector
                selected={valueState as string}
                onClick={(val) => {
                  setShowSelector(false)
                  change(val)
                }}
              />
            </div>
          : <p className='w-3/4 text-right'>
              <BlockSelectorButton
                name={value as string}
                selected={false}
                onclick={() => setShowSelector(!showSelector)} />
            </p>
          }
        </>
    }
  </>
}

export default ConfigField
