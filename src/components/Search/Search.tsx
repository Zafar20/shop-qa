import React, {useState, useEffect,FC} from 'react'
import s from './Search.module.scss'
import {  closeIcon, lupaIcon, searchclose } from "../../utils/index";
import { useLocation } from 'react-router-dom'
import filterStore from '../../store/filterStore';


const Search:FC = () => {
    
    const [value, setValue] = useState('')
    const {setSearchValue, setCurrentPage} = filterStore(state => state)
    const location = useLocation()


    const confirm = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setSearchValue(value)
      setCurrentPage(1); 

    }

    const reset = () => {
      setSearchValue('')
      setValue('')
    }

    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
            
      const searchValue = searchParams.get('search') || '';
      setValue(searchValue);
    }, [location.search]);
    
    
    
  return (
    <>
    <form className={s.search} onSubmit={(event) => confirm(event)}>
      <div className={s.search_box}>
          <input 
              className={s.search_box_input} 
              type="text"
              value={value}
              placeholder='Введите...'
              onChange={(event) =>  setValue(event.target.value)}
          />
          {value &&  <img src={closeIcon} className={s.search_box_close} alt="" onClick={reset}/>}
      </div>
      <button className={s.search_btn}>
        <img src={lupaIcon} alt="" />
      </button>
    </form>
    
    </>
    
  )
}

export default Search