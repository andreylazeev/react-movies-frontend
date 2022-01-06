import { ReactNode } from 'react';
export interface MenuProps {
  heading: string
  children: ReactNode
  link?: string
  onClickEvent? : () => void
}

export interface MovieProps {
  posterUrlPreview: string
  genres?: {}[]
  nameRu?: string
  nameEn?: string
  rating?: string
  filmId: number,
  [key: string]: any
}