import api from './api'
import {  useMutation, useQuery } from '@tanstack/react-query';
import useStore from '../store/userStore';
import { ILogin,  IRegister } from '../types/types';


// Хук для выполнения запроса на получение текущего пользователя

export const useCurrentQuery = () => {
  let access_token = localStorage.getItem('access_token')
  return useQuery(['current'], () => api.get('/auth/users/profile'), {
    enabled: !!access_token,
    select: (response) => response.data,
  }) 
};

// Хук для выполнения запроса на вход пользователя
export const useLoginMutation = () => {
  // const setUser = useStore(state => state.setUser); 
  return useMutation((userData:ILogin) => api.post('/auth/login', userData), {
    onSuccess: ({data}) => {
      
      // В data может быть ваш токен, предположим он в формате data.token
      if (data && data.access) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
      }
    },
  });
};

// Хук для выполнения запроса на регистрацию пользователя
export const useRegisterMutation = () => {
  return useMutation((userData: IRegister) => api.post('/auth/register', userData));
};

// Хук для добавления аватарки
export const useAddAvatar = () => {
  const setAvatar = useStore(state => state.setAvatar); 
  return useMutation((info:any) => api.put(`/auth/users/${info.id}/update/avatar`, info.formData),{
    onSuccess:({data}) => {
      console.log(data);
      setAvatar(data.avatar)
    }
  });
};



