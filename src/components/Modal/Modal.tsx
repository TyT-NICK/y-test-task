import classNames from 'classnames'
import { FC, MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import style from './Modal.module.scss'

type ModalProps = {
  children?: ReactNode | ReactNode[]
  open?: boolean
  onClose?: VoidFunction
  className?: string
}

const Modal: FC<ModalProps> = ({ children, open, onClose, className }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const wrapper = useRef(null)

  useEffect(() => {
    setContainer(document.getElementById('modal'))
  }, [])

  const classes = classNames(className, style.modalWrapper)

  const handleCloseClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target !== wrapper.current) return

      onClose && onClose()
    },
    [onClose]
  )

  if (!container || !open || !children) return null

  return createPortal(
    <div className={classes} onClick={handleCloseClick} ref={wrapper}>
      {children}
    </div>,
    container
  )
}

export default Modal
