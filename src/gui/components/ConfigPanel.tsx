import React, {useState} from 'react'
import {randomiseConfig} from '../../generators/configRandomiser'
import {PanelConfig} from '../../interfaces'
import {configLabel, drawerClass, h3Class, panelClass, panelClassHidden} from '../styles'
import {Button} from './Button'
import ConfigField from './ConfigField'

type Props = {
  action: (config: PanelConfig[]) => void
  actionLabel: string
  config: PanelConfig[]
  onClose: () => void
  title: string
  visible: boolean
}

const ConfigPanel = ({config, title, actionLabel, action, visible, onClose}: Props) => {
  const [configState, setConfigState] = useState(config)

  const valueChange = (valId: string, value: string | number | boolean) => {
    const newConfig: PanelConfig[] = JSON.parse(JSON.stringify(configState))
    const valueIndex = newConfig.findIndex(({id}) => id === valId)
    newConfig[valueIndex].value = value
    setConfigState(newConfig)
  }

  const randomise = () => {
    const randomisedConfig = randomiseConfig(configState)
    setConfigState(randomisedConfig)
    action(randomisedConfig)
  }

  return (
    <menu className={`${panelClass} ${drawerClass} ${visible ? '' : panelClassHidden}`}>
      <h3 className={h3Class}>
        {title}
        <button className="float-right text-lg" onClick={onClose} onTouchEnd={onClose}>
          ⨯
        </button>
      </h3>
      {configState.map(({id, label, value, type}) => (
        <p key={`config-${id}`} className="mb-2">
          <label className={configLabel}>
            <span className="flex-1">{label}</span>
            <ConfigField id={id} value={value} type={type} onChange={valueChange} />
          </label>
        </p>
      ))}
      <Button flex={true} icon="shuffle" onClick={randomise}>
        Random
      </Button>
      <Button
        flex={true}
        icon="auto_fix"
        variant="green"
        extraClass="float-right"
        onClick={() => action(configState)}>
        {actionLabel}
      </Button>
    </menu>
  )
}

export default ConfigPanel
