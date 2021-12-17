import { useCallback, useState } from 'react'

const useToggle = (initialValue: boolean = false): [boolean, VoidFunction] => {
  const [toggled, setToggled] = useState(initialValue)

  const toggle = useCallback(() => setToggled((prev) => !prev), [])

  return [toggled, toggle]
}

export default useToggle
