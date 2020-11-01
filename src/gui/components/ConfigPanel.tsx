import React, {useState} from 'react';
import { PanelConfig } from '../../interfaces';
import { btnClass, drawerClass, h3Class, panelClass, panelClassHidden, configLabel } from '../styles';
import ConfigField from './ConfigField';

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
    const newConfig: PanelConfig[] = JSON.parse(JSON.stringify(configState));
    const valueIndex = newConfig.findIndex(({id}) => id === valId)
    newConfig[valueIndex].value = value
    setConfigState(newConfig)
  }

  return <menu className={`${panelClass} ${drawerClass} ${visible ? '' : panelClassHidden}`}>
    <h3 className={h3Class}>
      {title}
      <button className="float-right text-lg" onClick={onClose} onTouchEnd={onClose}>⨯</button>
    </h3>

    {configState.map(({id, label, value, type}) => (
      <p key={`config-${id}`} className="mb-2">
        <label className={configLabel}>
          <span className="flex-1">{label}</span>
          <ConfigField id={id} value={value} type={type} onChange={valueChange} />
        </label>
      </p>
    ))}
    <button
      className={`${btnClass} float-right`}
      onTouchEnd={() => action(configState)}
      onClick={() => action(configState)}>
        {actionLabel}
      </button>
  </menu>
}

export default ConfigPanel
