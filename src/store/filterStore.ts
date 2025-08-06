import { create } from 'zustand';
import {  devtools  } from 'zustand/middleware'

interface IFilterStore {
  searchValue: string;
  sortValue: string;
  currentPage: number;
  skip: number;
  limit: number
  setSearchValue: (value: string) => void
  setSortValue: (value: string) => void
  setCurrentPage:(value:number) => void
  setSkip: (value: number) => void
}

const filterStore = create<IFilterStore>()(
  devtools(
    (set) => ({
    searchValue: '',
    sortValue: '',
    currentPage: 1,
    skip: 0,
    limit: 6,
    setSearchValue:(value: string) => set({searchValue: value}),
    setSortValue:(value: string) => set({sortValue: value}),
    setCurrentPage: (value:number) => set({currentPage: value}),
    setSkip: (value:number) => set({skip: value})
  }))
 
);

export default filterStore;
