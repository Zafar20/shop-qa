import React from 'react';
import { useRegisterMutation } from '../../services/auth';
import { IRegister } from '../../types/types';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../layouts/EnterLayout';
import CustomInput from '../../components/UI/CustomInput';
import { useForm, SubmitHandler  } from 'react-hook-form'
import { errorMessage } from '../../utils/errorMessage';
import CustomBtn from '../../components/UI/CustomBtn';


const Register: React.FC = () => {
  
  const navigate = useNavigate()

  
  const registerMutation = useRegisterMutation();
  const [isError, setError] = React.useState<string | any>('')

  const { 
    register, // позволит регистрировать поля
    formState: {
      errors,
      isValid
    }, // объект у которого есть cвойства для ошибок
    handleSubmit, //
    reset,
    
  } = useForm<IRegister>({
    // mode по умолчанию равен onSubmit
    mode: "onBlur"
  })
  
  interface IRegister {
    email: string
    username: string
    password: string
    password2: string
}

  const onSubmit:SubmitHandler<IRegister> = async(data) => {
    try {
      await registerMutation.mutateAsync(data);
      console.log('Registration successful!');
      setError('')
      navigate('/login')
        
    } catch (error: any) {
        setError('')
        setError(errorMessage(error))
        console.log(error);
        console.error('Login failed:', error);
    }
  reset()
}


  
  return (
    <>
        <Layout>
          <div className="form_block">
              <h2 className="form_title">Регистрация</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="form_content">
              <CustomInput
                 holder='Логин'
                 type='text'
                 label="Ваш логин"
                 errors={errors?.username}
                 register={register('username', {
                   required: "Поле обязательно к заполнению",
                   minLength: {
                     value: 3,
                     message: 'Минимум 3 символов'
                   }
                 })}
              />
              <CustomInput
                 holder='Почта'
                 type='email'
                 label="Ваша почта"
                 errors={errors?.email}
                 register={register('email', {
                  required: "Поле обязательно к заполнению",
                 })}
              />
              <CustomInput
                 holder='Пароль'
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
              <CustomInput
                 holder='Повторите пароль'
                 type='password'
                 label="Повторите пароль"
                 errors={errors?.password2}
                 register={register('password2', {
                   required: "Поле обязательно к заполнению",
                   minLength: {
                     value: 8,
                     message: 'Минимум 8 символов'
                   }
                 })}
              />
               <CustomBtn text="Зарегистрироваться" disabled={!isValid} width={240} height={60} ml="auto"/>
            </form>
            <div className="form_info">
               { isError && <h2 className="error_auth">{isError}</h2> }
                <p className="form_info_text">Есть акканута?</p>
                <Link className="form_info_link" to="/login">Войти</Link>
              </div>
          </div>
         
        </Layout>
      
    </>

  )
}

export default Register;
