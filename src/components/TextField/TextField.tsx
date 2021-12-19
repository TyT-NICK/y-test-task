import classNames from 'classnames'
import { FC, FocusEvent, InputHTMLAttributes, memo, TextareaHTMLAttributes, useRef, useState } from 'react'

import styles from './TextField.module.scss'

type TextFieldProps = (InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>) & {
  label?: string
  multiline?: boolean
  isPasswordShown?: boolean
  validateValue?: (value: string) => string
  onFocusLost?: (error: string) => void
}

const TextField: FC<TextFieldProps> = memo(
  (
    {
      multiline,
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
    const inputRef = useRef(ref)

    const classes = classNames(className, styles.textField, {
      [styles.multiline]: multiline,
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

    const inputElement = multiline ? (
      <textarea className={styles.input} onFocus={handleFocus} onBlur={handleBlur} ref={inputRef} {...restProps} />
    ) : (
      <input
        className={styles.input}
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        {...restProps}
      />
    )

    return (
      <div className={classes}>
        {label && (
          <label className={styles.label}>
            {label}
            {required && <span className={styles.requiredMark}>{' *'}</span>}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {inputElement}
          {children}
        </div>
      </div>
    )
  }
)

export default TextField
