import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Modal, TextField } from '../index'
import classes from './JogForm.module.scss'
import { Color } from 'src/constants'
import { ReactComponent as Cross } from 'src/assets/imgs/cancel.svg'
import { isValid, parse } from 'date-fns'
import { enGB } from 'date-fns/locale'

type JogFormProps = {
  onSubmit: (data: Form) => void
  onClose: VoidFunction
  isOpen: boolean
}

type Form = {
  distance: number
  time: number
  date: string
}

const validateDistanceTime = {
  required: 'All fields must be filled',
  min: { value: 0, message: 'Negative values are not allowed' },
  validate: {
    isDigit: (v: number) => /^\d+$/.test(v.toString()) || 'Incorrect number format',
  },
}

const validateDate = {
  required: 'All fields must be filled',
  validate: {
    isCorrectDate: (value: string) => {
      const parsedDate = parse(value, 'P', new Date(), { locale: enGB })

      return isValid(parsedDate) || 'Incorrect date format, try dd/mm/yyyy'
    },
  },
}

const JogForm: FC<JogFormProps> = ({ onClose, onSubmit, isOpen }) => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isValid },
  } = useForm<Form>({ mode: 'onChange' })

  const errorMessage = errors.time?.message || errors.distance?.message || errors.date?.message

  return (
    <Modal open={isOpen} onClose={onClose}>
      <form onSubmit={handleFormSubmit(onSubmit)} className={classes.form}>
        <TextField {...register('distance', validateDistanceTime)} className={classes.input} label={'Distance'} />
        <TextField {...register('time', validateDistanceTime)} className={classes.input} label={'Time'} />
        <TextField {...register('date', validateDate)} className={classes.input} label={'Date'} />

        {errorMessage && <span className={classes.error}>{errorMessage}</span>}

        <Button color={Color.white} className={classes.button} type={'submit'} disabled={!isValid}>
          Save
        </Button>

        <Button className={classes.close} onClick={onClose}>
          <Cross />
        </Button>
      </form>
    </Modal>
  )
}

export default JogForm
