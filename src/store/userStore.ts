import { create } from 'zustand';
import {  devtools  } from 'zustand/middleware'
import  {IUser} from '../types/types'

interface IUserStore {
  user: IUser | null;
  isAuthenticated: boolean;
  setUser: (userData: IUser | null) => void;
  logout: () => void
  setAvatar: (avatarUrl:string) => void
}

const userStore = create<IUserStore>()(devtools(
    (set, get) => ({
    user: null,
    isAuthenticated: false,
    setUser: (userData) => set({ user: userData, isAuthenticated: true }),
    setAvatar: (avatarUrl) => {
      const user = get().user; // Получаем текущее значение user
      if(user) {
        set({ user: { ...user, avatar: avatarUrl } }) // Создаем новый объект user с добавленным avatar
      }
    },
    logout: () => set({user: null, isAuthenticated: false}),
  }))
 
);

export default userStore;
