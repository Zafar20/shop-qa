import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/main.scss'
import {  RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const queryClient = new QueryClient({
  
})
let root = document.getElementById('root')

if(root) {
  ReactDOM.createRoot(root).render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ToastContainer
         
        />
      </QueryClientProvider>
  )
}

