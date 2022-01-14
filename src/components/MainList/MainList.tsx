import { FC, useEffect, useRef, useState } from 'react'
import { KP_API, KP_HEADERS, MAIN_CATEGORIES } from '../../constants'
import { useFetch } from '../../hooks/fetch.hook'
import useScroll from '../../hooks/scroll.hook'
import { Dictionary } from '../../interfaces'
import { MainCategories } from '../MainCategories/MainCategories'
import { MovieCard } from '../MovieCard/MovieCard'
import './MainList.scss'

export const MainList: FC = () => {
  const [currentCategory, setCurrentCategory] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const defaultUrl = MAIN_CATEGORIES[0].url
  const [result, setResult] = useState<Dictionary<any>>([])
  const { response } = useFetch(`${KP_API}${defaultUrl}&page=1`, {
    headers: KP_HEADERS
  })
  const ref = useRef<HTMLDivElement | null>(null)
  const mainRef = useRef<HTMLDivElement | null>(null)
  const url = MAIN_CATEGORIES.find(category => category.id === currentCategory)!.url
  const handleIntersection = () => {
    if (response && currentPage < response.pagesCount) {
      fetch(`${KP_API}${url}&page=${currentPage}`, {
        headers: KP_HEADERS
      }).then(res => res.json()).then(json => {
        setResult((prev: any) => [...prev, ...json.films])
        setCurrentPage(prev => prev + 1)
      })
    }
  }
  const intersected = useScroll(ref, handleIntersection)

  const handleCategoryClick = (id: number) => {
    const url = MAIN_CATEGORIES.find(category => category.id === id)!.url
    if (window.matchMedia("(max-width: 600px)").matches) {
      document.querySelector('.MainPage')!.scrollIntoView(true)
    }
    setCurrentCategory(id)
    setCurrentPage(1)
    fetch(`${KP_API}${url}&page=1`, {
      headers: KP_HEADERS
    }).then(res => res.json()).then(json => {
      setResult(() => [...json.films])
      setCurrentPage(prev => prev + 1)
    })
  }

  useEffect(() => {
    if (response) {
      setResult((prev: any) => [...prev, ...response.films])
      setCurrentPage(prev => prev + 1)
    }
  }, [response])

  
  return (
    <div className='Main__List' ref={mainRef}>
      <MainCategories
        categories={MAIN_CATEGORIES}
        onCategoryClick={handleCategoryClick}
        current={currentCategory}
      />
      <div className="Main__Movies">
        {result && result.map((film: Dictionary<any>) => <MovieCard filmId={film.filmId} posterUrlPreview={film.posterUrlPreview} key={film.filmId} rating={film.rating} nameRu={film.nameRu || ''} nameEn={film.nameEn || ''}/>)}
      </div>
      <div ref={ref} style={{color: 'transparent'}}>123</div>
    </div>
  )
}
