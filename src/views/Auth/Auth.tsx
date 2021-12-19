import { FC, useCallback } from 'react'
import useLogin from 'src/hooks/useLogin'
import { Button, Header } from 'src/components'
import pageClasses from '../Page.module.scss'
import classes from './Auth.module.scss'
import { ReactComponent as BearFace } from 'src/assets/imgs/bear-face.svg'
import { Color } from 'src/constants'
import classNames from 'classnames'
import { hasToken } from 'src/utils/auth'
import { Navigate } from 'react-router-dom'
import { Path } from 'src/router'

const Auth: FC = () => {
  const [login, pendingLogin] = useLogin()

  const mainClasses = classNames(pageClasses.main)

  const handleLoginClick = useCallback(() => login(), [login])

  if (hasToken()) return <Navigate to={Path.jogs} />

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
