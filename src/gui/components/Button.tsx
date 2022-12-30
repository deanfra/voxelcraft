import React, {FC} from 'react'
import {InteractiveHandler} from '../../interfaces'
import {btnActiveClass, btnClass, btnRedClass, btnGreenClass} from '../styles'

type Props = {
  extraClass?: string
  flex?: boolean
  icon?: string
  onClick: (e: InteractiveHandler) => void
  selected?: boolean
  variant?: 'red' | 'green'
}

export const Button: FC<Props> = ({
  children,
  extraClass = '',
  flex,
  icon,
  onClick,
  selected,
  variant,
}) => {
  const selectedClass = selected === true && btnActiveClass
  const variantClass = (variant === 'red' && btnRedClass) || (variant === 'green' && btnGreenClass)
  const flexClass = flex === true && 'flex-1'
  const className = `${btnClass} ${selectedClass} ${variantClass} ${flexClass} ${extraClass}`

  return (
    <button className={className} onTouchEnd={onClick} onClick={onClick}>
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
