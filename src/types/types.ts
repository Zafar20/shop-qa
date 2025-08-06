export interface IUser {
    id: string;
    email: string;
    avatar?: string
    username: string
}




export interface IRegister {
    email: string
    username: string
    password: string
    password2: string
}

export interface ILogin {
    username: string
    password: string
}


export interface IUpdateUser {
    username: string
    password: string
    email: string
}

export interface IUpdateUserPhoto {
    avatar: null | string;
}



export interface IProduct {
  id: number
  title: string
  description: string
  image: string
  rating:  number
  price: string
  quantity: number | null
}

