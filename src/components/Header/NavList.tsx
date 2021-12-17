import { HeaderLink } from './Header'
import { FC } from 'react'

type NavListProps = {
  items: HeaderLink[]
  className?: string
}

const NavList: FC<NavListProps> = ({ items, className = '' }) => (
  <nav className={className}>
    <ul>
      {items.map((link) => (
        <li key={link.to}>
          <a href={link.to}>{link.title}</a>
        </li>
      ))}
    </ul>
  </nav>
)

export default NavList
