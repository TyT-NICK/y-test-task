import classNames from 'classnames'
import { FC, FocusEvent, forwardRef, InputHTMLAttributes, useState } from 'react'

import styles from './TextField.module.scss'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  isPasswordShown?: boolean
  validateValue?: (value: string) => string
  onFocusLost?: (error: string) => void
}

const TextField: FC<TextFieldProps> = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      type: inputType,
      isPasswordShown,
      children,
      label,
      required,
      validateValue,
      onFocusLost,
      ...restProps
    },
    ref
  ) => {
    const [isFocused, setFocused] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const classes = classNames(className, styles.textField, {
      [styles.focused]: isFocused,
      [styles.invalid]: !!errorMessage,
    })

    // make password chars visible
    const type = (inputType === 'password' && isPasswordShown && 'text') || inputType

    const handleFocus = () => setFocused(true)

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false)

      let error = ''
      if (validateValue) {
        error = validateValue(e.target.value)
        setErrorMessage(error)
      }

      onFocusLost && onFocusLost(error)
    }

    return (
      <div className={classes}>
        {label && (
          <label className={styles.label}>
            {label}
            {required && <span className={styles.requiredMark}>{' *'}</span>}
          </label>
        )}
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={ref}
            {...restProps}
          />

          {children}
        </div>
      </div>
    )
  }
)

export default TextField
