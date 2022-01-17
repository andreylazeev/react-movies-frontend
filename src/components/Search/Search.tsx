import { FC, useEffect, useRef, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { useDebounce } from '../../hooks/debounce.hook'
import { useInput } from '../../hooks/input.hook'
import { SearchResults } from '../SearchResults/SearchResults'
import './Search.scss'

export const Search: FC = () => {
  const value = useInput('')
  const searchRef = useRef<HTMLDivElement>(null)
  const debounced = useDebounce(value.value,500)
  const [isVisible, setIsVisible] = useState(false)

  const handleOutsideClick = (e: MouseEvent) => {
    if (!searchRef.current?.contains(e.target as HTMLElement)) {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [debounced])

  useEffect(() => {
    debounced.length && setIsVisible(true)
  }, [debounced])
  return (
    <div className='Search'>
      <div className="Search__Box">
      <input type="text" placeholder='Поиск' className='Search__InputField' {...value}/>
      <RiSearch2Line className='Search__InputIcon'/>
      </div>
      {debounced && isVisible && <SearchResults onMovieClick={() => setIsVisible(false)} ref={searchRef} query={debounced} />}
    </div>
  )
}
