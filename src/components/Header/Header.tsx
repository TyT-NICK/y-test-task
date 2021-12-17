import { FC } from 'react'
import classes from './Header.module.scss'
import { ReactComponent as Logo } from 'src/assets/imgs/logo.svg'
import { ReactComponent as Cross } from 'src/assets/imgs/cross.svg'
import { ReactComponent as Burger } from 'src/assets/imgs/burger.svg'
import { useToggle } from 'src/hooks'
import classNames from 'classnames'
import NavList from './NavList'

export type HeaderLink = {
  title: string
  to: string
}

const navLinks: HeaderLink[] = [
  { title: 'jogs', to: '/jogs' },
  { title: 'info', to: '/info' },
  { title: 'contact us', to: '/contacts' },
]

const Header: FC = ({ children }) => {
  const [isMenuOpened, toggleMenuOpened] = useToggle(false)

  const headerClass = classNames(classes.header, { [classes.inverted]: isMenuOpened })
  const navClass = classNames(classes.nav, { [classes.shown]: isMenuOpened })
  const childrenClass = classNames(classes.children)

  return (
    <header className={headerClass}>
      <Logo className={classes.logo} />

      {children && !isMenuOpened && <div className={childrenClass}>{children}</div>}

      <NavList className={navClass} items={navLinks} />

      <button className={classes.menuButton} onClick={() => toggleMenuOpened()}>
        {isMenuOpened ? <Cross /> : <Burger />}
      </button>
    </header>
  )
}

export default Header
