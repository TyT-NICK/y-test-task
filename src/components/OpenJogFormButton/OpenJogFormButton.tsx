import { FC, useContext } from 'react'
import { ReactComponent as Add } from 'src/assets/imgs/add.svg'
import { OpenFormContext } from 'src/views/Jogs/Jogs'
import classes from './OpenJogFormButton.module.scss'

const OpenJogFormButton: FC = () => {
  const openForm = useContext(OpenFormContext)

  return (
    <button className={classes.button} onClick={() => openForm && openForm()}>
      <Add />
    </button>
  )
}

export default OpenJogFormButton
