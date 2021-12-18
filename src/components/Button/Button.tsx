import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import { Color } from '../../constants'
import classNames from 'classnames'
import classes from './Button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string | ReactNode
  color?: Color
  className?: string
}

const Button: FC<ButtonProps> = ({ className, children, color = Color.green, ...props }) => {
  const buttonClasses = classNames(className, classes.button, classes[color])

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

export default Button
