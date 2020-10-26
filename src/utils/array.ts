import { PanelConfig, PanelConfigMap } from "../interfaces";

export const arrayToObject = (arr: PanelConfig[]): PanelConfigMap => arr.reduce(
  (acc: PanelConfigMap, cur: PanelConfig) => ({[cur.id]: cur.value, ...acc}), {}
)
