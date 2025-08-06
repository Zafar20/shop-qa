import { FC, useEffect } from 'react'
import s from './Products.module.scss'
import Product from './ProductItem'
import { useGetProducts } from '../../services/products'
import { IProduct } from '../../types/types'
import Search from '../Search/Search'
import Sort from '../Sort/Sort'
import ProductsSkeleton from './ProductsSkeleton'
import Pagination from '../Pagination/Pagination'
import { useLocation, useNavigate } from 'react-router-dom'
import filterStore from '../../store/filterStore'


const Products: FC = () => {

  const {searchValue,sortValue,currentPage,setCurrentPage, setSearchValue, setSortValue, skip, setSkip, limit } = filterStore(state => state)

  const navigate = useNavigate()
  const location = useLocation()
  

  // после перезагрузки страницы фильтрация не сбрасывается 
  useEffect(() => {
  
    const params = new URLSearchParams(location.search);
    
    setSearchValue(params.get('search') || '');
    setCurrentPage(Number(params.get('page')) || 1);
    setSortValue(params.get('sort') || '');


  }, [location.search]);
  

  
  useEffect(() => {

    
    setSkip(currentPage * limit - limit);
    
    const queryParams = new URLSearchParams();
    if (searchValue) queryParams.set('search', searchValue);
    if (sortValue && sortValue != 'товары') queryParams.set('sort', sortValue);
    if (currentPage != 1) queryParams.set('page', currentPage.toString());
    
    navigate(`?${decodeURIComponent(queryParams.toString())}`);
  }, [currentPage,  searchValue,sortValue]);
  
  
  const onChangePage = (num: number) => {
    setCurrentPage(num)
    setSkip(num * limit - limit)
    window.scrollTo(0,0)
  }

  const { data } = useGetProducts({ search: searchValue, sort: sortValue, offset: skip, limit: limit })

  const products = data?.results.map((item: IProduct) => <Product key={item.id} {...item} />)
  const skeletons = [... new Array(6)].map((_, i) => <ProductsSkeleton key={i} />)
  const errorMessage = data?.results.length == 0 ? 'Товары по поиску не найдены' : ''

  return (
    <div className={s.products}>
      <div className={s.products_filter}>
        <div className={s.products_filter_left}>
          <Sort/>
        </div>
        <div className={s.products__filter_right}>
        <Search/>
        </div>
      </div>
      <div className={s.products_list}>
        {data ? products : skeletons}
      </div>
      { data && data.results.length != 0 && <Pagination limit={limit} totalCount={data.count} currentPage={currentPage} onChangePage={onChangePage} /> }
      
      <h2>{errorMessage}</h2>
    </div>
  )
}

export default Products