import React, {FC} from 'react'
import {InteractiveHandler} from '../../interfaces'
import {btnActiveClass, btnClass, btnRedClass} from '../styles'

type Props = {
  selected?: boolean
  variant?: 'red'
  icon?: string
  onClick: (e: InteractiveHandler) => void
}

export const Button: FC<Props> = ({selected, icon, onClick, children, variant}) => {
  const selectedClass = selected === true && btnActiveClass
  const variantClass = variant === 'red' && btnRedClass

  return (
    <button
      className={`${btnClass} ${selectedClass} ${variantClass}`}
      onTouchEnd={onClick}
      onClick={onClick}>
      {icon && (
        <span
          style={{marginTop: '-10px', marginLeft: '-6px', top: '0.4rem'}}
          className="relative material-symbols-rounded mr-2">
          {icon}
        </span>
      )}
      {children}
    </button>
  )
}
