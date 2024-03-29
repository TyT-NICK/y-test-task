import { FC } from 'react'
import { Header } from 'src/components'
import pageClasses from '../Page.module.scss'
import RequireAuth from 'src/router/ReqireAuth'

const Info: FC = () => {
  return (
    <RequireAuth>
      <Header />
      <main className={pageClasses.main}>
        <h1 className={pageClasses.h1}>Info</h1>
        <p className={pageClasses.p}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
        <p className={pageClasses.p}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking
          at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
          opposed to using 'Content here, content here', making it look like readable English.
        </p>
      </main>
    </RequireAuth>
  )
}

export default Info
