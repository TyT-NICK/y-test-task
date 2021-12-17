import { HeaderLink } from './Header'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

type NavListProps = {
  items: HeaderLink[]
  className?: string
}

const NavList: FC<NavListProps> = ({ items, className = '' }) => (
  <nav className={className}>
    <ul>
      {items.map((link) => (
        <li key={link.to}>
          <NavLink to={link.to}>{link.title}</NavLink>
        </li>
      ))}
    </ul>
  </nav>
)

export default NavList
