import { FC } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { useDebounce } from '../../hooks/debounce.hook'
import { useInput } from '../../hooks/input.hook'
import { SearchResults } from '../SearchResults/SearchResults'
import './Search.scss'

export const Search: FC = () => {
  const {value, onChange} = useInput('')
  const debounced = useDebounce(value,500)
  return (
    <div className='Search'>
      <div className="Search__InputBox">
      <input type="text" placeholder='Поиск' className='Search__InputField' value={value} onChange={onChange}/>
      <RiSearch2Line className='Search__InputIcon'/>
      </div>
      {debounced && <SearchResults query={debounced} />}
    </div>
  )
}
