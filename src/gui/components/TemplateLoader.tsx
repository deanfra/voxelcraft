import React, {useEffect, useState} from 'react'
import {State, Template} from '../../interfaces'
import {clearBlocks, fillBlocks} from '../../utils/blocks'
import storage from '../../utils/localstorage'
import {btnClass, listItemClass} from '../styles'
import {Button} from './Button'

type LoaderProps = {
  state: State
}

type LinkProps = {
  tpl: Template
  onTouchEnd: (id: string) => void
  onClick: (id: string) => void
  del: (id: string) => void
}

const TemplateLink = (props: LinkProps) => {
  const click = () => {
    props.onClick(props.tpl.id)
  }
  const del = () => {
    props.del(props.tpl.id)
  }

  return (
    <li className={listItemClass}>
      <button className={`${btnClass} flex-1`} onTouchEnd={click} onClick={click}>
        {props.tpl.name}
      </button>
      <button className={btnClass} onTouchEnd={del} onClick={del}>
        ⨯
      </button>
    </li>
  )
}

const TemplateLoader = (props: LoaderProps) => {
  const [templates, setTemplates] = useState<Template[]>([])

  useEffect(() => {
    const store = storage.fetchAll()
    setTemplates(store.saved)
  }, [])

  const save = (e: any) => {
    e.preventDefault()
    storage.save(props.state.objects)
    const store = storage.fetchAll()
    setTemplates(store.saved)
  }

  const load = (id: string) => {
    clearBlocks(props.state)
    const savedBlocks = storage.fetch(id)
    if (savedBlocks) fillBlocks(savedBlocks.blocks, props.state)
    props.state.render()
  }

  const del = (id: string) => {
    storage.delete(id)
    setTemplates(templates.filter((tpl) => tpl.id !== id))
  }

  return (
    <ul>
      {templates.map((tpl) => (
        <TemplateLink
          tpl={tpl}
          onTouchEnd={(id: string) => load(id)}
          onClick={(id: string) => load(id)}
          del={(id: string) => del(id)}
        />
      ))}
      <li className={`${listItemClass} mt-3`}>
        <Button flex={true} icon="save" onClick={save}>
          Save model
        </Button>
      </li>
    </ul>
  )
}

export default TemplateLoader
