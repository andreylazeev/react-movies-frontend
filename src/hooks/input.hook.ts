import { ChangeEvent, useState } from 'react'

export const useInput = (init: string) => {
  const [value, setValue] = useState(init)
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return {value, onChange}
}