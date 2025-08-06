import api from './api'
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { IProduct} from '../types/types';

export const useGetProducts = ({search, sort,offset,limit}: any) => {
    return useQuery(['products', search,sort,offset,limit], () => api.get(`/products?search=${search}&ordering=${sort}&offset=${offset}&limit=${limit}`), {
      select: (response) => response.data,
    }) 
  }
  
export const useGetProductById = (id: number):UseQueryResult<IProduct,Error> => {
    
    return useQuery(['products',id], () => api.get(`/products/${id}`),{
      select:(response) => response.data 
    } )
  }
  