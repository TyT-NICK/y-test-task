import { FC } from 'react'
import classes from './Header.module.scss'
import { ReactComponent as Logo } from 'src/assets/imgs/logo.svg'
import { ReactComponent as Cross } from 'src/assets/imgs/cross.svg'
import { ReactComponent as Burger } from 'src/assets/imgs/burger.svg'
import { useAppSelector, useToggle } from 'src/hooks'
import classNames from 'classnames'
import NavList from './NavList'
import { Path } from 'src/router'

export type HeaderLink = {
  title: string
  to: string
}

const navLinks: HeaderLink[] = [
  { title: 'jogs', to: Path.jogs },
  { title: 'info', to: Path.info },
  { title: 'contact us', to: Path.contact },
]

const Header: FC = ({ children }) => {
  const { token } = useAppSelector((state) => state.auth)

  const [isMenuOpened, toggleMenuOpened] = useToggle(false)

  const headerClass = classNames(classes.header, { [classes.inverted]: isMenuOpened })
  const navClass = classNames(classes.nav, { [classes.shown]: isMenuOpened })
  const authOnly = classNames(classes.authOnly, { [classes.hidden]: !token })
  const childrenClass = classNames(classes.children)

  return (
    <header className={headerClass}>
      <Logo className={classes.logo} />

      <div className={authOnly}>
        {children && !isMenuOpened && <div className={childrenClass}>{children}</div>}

        <NavList className={navClass} items={navLinks} />

        <button className={classes.menuButton} onClick={() => toggleMenuOpened()}>
          {isMenuOpened ? <Cross /> : <Burger />}
        </button>
      </div>
    </header>
  )
}

export default Header
