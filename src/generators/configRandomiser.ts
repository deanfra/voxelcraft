import {blockSwatches} from '../config'
import {randomBetween, sample} from '../generators/slabs'
import {PanelConfig, PanelConfigValue} from '../interfaces/index'

export const randomiseConfig = (config: PanelConfig[]): PanelConfig[] =>
  config.map((config) => {
    let value: PanelConfigValue = ''

    if (config.type === 'material') {
      value = sample(blockSwatches).name
    }

    if (config.type === 'number') {
      value = randomBetween(1, 10)
    }

    if (config.type === 'boolean') {
      value = sample([true, false])
    }

    // unused?
    if (config.type === 'string') {
      value = ''
    }

    return {
      ...config,
      value,
    }
  })
