import { ReactNode } from 'react';
export interface MenuProps {
  heading: string
  children: ReactNode
  link?: string
  onClickEvent? : () => void
}