import { Jog } from '../constants/types'
import { JogsFilterType } from '../components/JogsFilter/JogsFilter'
import { addDays } from 'date-fns'

const filterJogs = (jogs: Jog[], { min, max: rawMax }: JogsFilterType) => {
  // This allows to include date from 'Date to'. Without it they're ignored
  // example: 'Date to' is set to '22/12/2021', but Jog has date '22/12/2021 11:45', which is greater then 'Date to'
  const max = rawMax && addDays(rawMax, 1)

  return jogs.filter(({ date }) => {
    const jogDate = new Date(date * 1000) // epoch format

    if (min && jogDate < min) return false
    return !(max && jogDate > max)
  })
}

export default filterJogs
