import { useCallback, useState } from 'react'

const useToggle = (initialValue: boolean = false) => {
  const [toggled, setToggled] = useState(initialValue)

  const toggle = useCallback(() => setToggled((prev) => !prev), [])

  return [toggled, toggle]
}

export default useToggle
