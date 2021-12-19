import { FC } from 'react'
import { Header } from 'src/components'
import pageClasses from '../Page.module.scss'
import RequireAuth from 'src/router/ReqireAuth'

const Contact: FC = () => {
  return (
    <RequireAuth>
      <Header />
      <main className={pageClasses.main}>
        <h1 className={pageClasses.h1}>Contact Us</h1>

        <p className={pageClasses.p}>
          Made by <a href="https://github.com/TyT-NICK">Artem Kuroptev</a>
        </p>
      </main>
    </RequireAuth>
  )
}

export default Contact
