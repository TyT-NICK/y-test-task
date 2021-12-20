import { FC, FormEvent, useCallback, useEffect, useState } from 'react'
import { TextField } from '../index'
import { format, isValid, parse } from 'date-fns'
import { enGB } from 'date-fns/locale'
import classes from './JogsFilter.module.scss'
import dateFormatString from '../../constants/dateFormatString'

export type JogsFilterType = {
  min: Date | null
  max: Date | null
}

type JogsFilterProps = {
  filter: JogsFilterType
  onFilerChange: (filter: JogsFilterType) => void
}

const JogsFilter: FC<JogsFilterProps> = ({ onFilerChange, filter }) => {
  const [rawFilterValues, setRawFilterValues] = useState({ min: '', max: '' })

  const handleFilterChange = useCallback(
    ({ currentTarget: { value, name } }: FormEvent<HTMLInputElement>) => {
      setRawFilterValues((prev) => ({ ...prev, [name]: value }))

      const date = parse(value, 'P', new Date(), { locale: enGB })

      if (isValid(date)) {
        onFilerChange({ ...filter, [name]: date })
      } else {
        onFilerChange({ ...filter, [name]: null })
      }
    },
    [filter, onFilerChange]
  )

  useEffect(() => {
    const { min, max } = filter

    setRawFilterValues({
      min: (min && format(min, dateFormatString)) || '',
      max: (max && format(max, dateFormatString)) || '',
    })
    // set initial value ONLY on filter open
  }, []) //eslint-disable-line

  return (
    <div className={classes.filter}>
      <TextField
        className={classes.input}
        onChange={handleFilterChange}
        value={rawFilterValues.min}
        label={'Date from'}
        name={'min'}
        placeholder={'dd/mm/yyyy'}
      />
      <TextField
        className={classes.input}
        onChange={handleFilterChange}
        value={rawFilterValues.max}
        label={'Date to'}
        name={'max'}
        placeholder={'dd/mm/yyyy'}
      />
    </div>
  )
}

export default JogsFilter
