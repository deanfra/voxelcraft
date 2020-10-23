import React, {useState} from 'react';
import { btnClass, inputClass } from '../styles';

type Value = number | string | boolean
type Props = {
  id: string
  type: string
  onChange: (id: string, value: Value) => void
  value: Value
}

const ConfigField = ({id, value, type, onChange}: Props) => {
  const [valueState, setValueState] = useState<Value>(value)
  
  const isBoolean = type === 'boolean'
  const isNumber = type === 'number'

  const change = (newValue: Value) => {
    setValueState(newValue)
    onChange(id, newValue)
  }

  return <>
    {
      isBoolean ?
        <button
          onClick={() => change(!valueState)}
          onTouchEnd={() => change(!valueState)}
          className={btnClass}>
            {valueState ? 'yes' : 'no'}
        </button> :
        <input
            key={`input${id}`}
            id={id}
            name={id}
            value={valueState as number}
            type={isNumber ? "number": "text"}
            className={inputClass}
            onChange={(e) => {change(e.target.value)}} 
          />
    }
  </>
}

export default ConfigField
