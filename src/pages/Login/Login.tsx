import React, { useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../services/auth'
import { ILogin } from '../../types/types'
import useStore  from '../../store/userStore'
import Layout from '../../layouts/EnterLayout'
import { useForm } from 'react-hook-form'
import CustomInput from '../../components/UI/CustomInput'
import CustomBtn from '../../components/UI/CustomBtn'

const Login:React.FC = () => {
  const navigate = useNavigate()
  const isAuthenticated = useStore(state => state.isAuthenticated)

  
  const loginMutation = useLoginMutation();
  const [isError, setError] = React.useState<string | any>('')


  
  const { 
    register, // позволит регистрировать поля
    formState: {
      errors,
      isValid
    }, // объект у которого есть cвойства для ошибок
    handleSubmit, //
    reset,
    
  } = useForm<ILogin>({
    // mode по умолчанию равен onSubmit
    mode: "onBlur"
  })
  
  const onSubmit = async(data: ILogin) => {
      try {
          await loginMutation.mutateAsync(data);
          setError('')
          console.log('Login successful!');
          navigate('/')
          
      } catch (error: any) {
          console.log(error);
          setError('')
          setError(error.response.data.refresh)
          console.error('Login failed:', error);
      }
    reset()
  }



  
  return (
   <>
   {
    !isAuthenticated && (
      <Layout>
      <div className="form_block">
          <h2 className="form_title">Вход</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="form_content">
            <CustomInput
                holder='Логин'
                type='text'
                label="Ваш логин"
                errors={errors?.username}
                register={register('username', {
                  required: "Поле обязательно к заполнению",
                  minLength: {
                    value: 5,
                    message: 'Минимум 5 символов'
                  }
                })}
            />
            <CustomInput
              holder='пароль'
              type='password'
              label="Ваш пароль"
              errors={errors?.password}
              register={register('password', {
                required: "Поле обязательно к заполнению",
                minLength: {
                  value: 8,
                  message: 'Минимум 8 символов'
                }
              })}
            />
            <CustomBtn text="Вход" disabled={!isValid} width={248} height={60} ml="auto"/>
          </form>
            <div className="form_info">
              { isError && <h2 className="form_info_error">{isError}</h2> }
              <p className="form_info_text">Нет акканута?</p>
              <Link className="form_info_link" to="/register">Зарегистриироваться</Link>
            </div>
      </div>
      
 </Layout>
    )

   }

   
   </>
  )
}

export default Login


