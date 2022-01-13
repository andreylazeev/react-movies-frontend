import {FC} from 'react'
import { Dictionary } from '../../interfaces'
import './MainCategories.scss'

export const MainCategories: FC<Dictionary<any>> = ({categories, onCategoryClick,current}) => {
  return (
    <div className='Main__Categories'>
      {categories.map((category: Dictionary<any>) => <button onClick={() => onCategoryClick(category.id)} className={`Main__Category ${current === category.id ? 'Main__Category--Active' : ''}`} key={category.id}>{category.name}</button>)}
    </div>
  )
}
