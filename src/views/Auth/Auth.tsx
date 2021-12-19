import { FC, useCallback } from 'react'
import useAuth from 'src/hooks/useAuth'
import { Button, Header } from 'src/components'
import pageClasses from '../Page.module.scss'
import classes from './Auth.module.scss'
import { ReactComponent as BearFace } from 'src/assets/imgs/bear-face.svg'
import { Color } from 'src/constants'
import classNames from 'classnames'
import { Navigate } from 'react-router-dom'
import { Path } from 'src/router'
import { useAppSelector } from 'src/hooks'

const Auth: FC = () => {
  const { login, pending: pendingLogin } = useAuth()
  const { token } = useAppSelector((state) => state.auth)

  const mainClasses = classNames(pageClasses.main)

  const handleLoginClick = useCallback(() => {
    login()
  }, [login])

  if (token) return <Navigate to={Path.jogs} />

  return (
    <>
      <Header />
      <main className={mainClasses}>
        <div className={classes.card}>
          <BearFace className={classes.bearFace} />
          <Button
            onClick={handleLoginClick}
            className={classes.loginButton}
            color={Color.purple}
            disabled={pendingLogin}
          >
            Let me in
          </Button>
        </div>
      </main>
    </>
  )
}

export default Auth
