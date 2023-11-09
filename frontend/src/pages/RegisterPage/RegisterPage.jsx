import React from 'react'
import { useForm } from "react-hook-form"


const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: 'onChange'})

  const onSubmit = ({ email, password, name }) => {
    
    reset();
  }

  // register 양식
  const userEmail = {
    required: "이메일을 입력해 주세요."
  }
  const userName = {
    required: "이름을 입력해 주세요."
  }
  const userPassword = {
    required: "비밀번호를 입력해 주세요.",
    minLength: {
      value: 6,
      message: "최소 6자리 이상의 번호를 입력해 주세요."
    }
  }

  return (
    <section className='flex flex-col justify-center mt-20 max-w-[500px] m-auto'>
      <div className='p-10 bg-white rounded-md shadow-md border-t-[1px]'>
        <h1 className='text-3xl font-semibold text-center mb-4'>
          회원가입
        </h1>
        <form className='mb-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-2'>
            <label
              htmlFor='email'
              className='text-lg font-semibold text-gray-800'
            >Email</label>
            <input 
              type='email'
              id='email'
              className='focus:outline-none focus:ring-2 w-full px-4 py-2 mt-2 bg-white border-2 rounded-md border-gray-300'
              {...register('email', userEmail)}
            />
            {
              errors?.email &&
              <div>
                <span className='text-red-500 pt-4 text-xs'>
                  {errors.email.message}
                </span>
              </div>
            }
          </div>
          <div className='mb-2'>
            <label
              htmlFor='name'
              className='text-lg font-semibold text-gray-800'
            >Name</label>
            <input 
              type='text'
              id='name'
              className='focus:outline-none focus:ring-2 w-full px-4 py-2 mt-2 bg-white border-2 rounded-md border-gray-200'
              {...register('name', userName)}
            />
           {
              errors?.name &&
              <div>
                <span className='text-red-500 pt-4 text-xs'>
                  {errors.name.message}
                </span>
              </div>
            }
          </div>
          <div className='mb-2'>
            <label
              htmlFor='pw'
              className='text-lg font-semibold text-gray-800'
            >Password</label>
            <input 
              type='password'
              id='pw'
              className='focus:outline-none focus:ring-2 w-full px-4 py-2 mt-2 bg-white border-2 rounded-md border-gray-200'
              {...register('password', userPassword)}
            />
            {
              errors?.password &&
              <div>
                <span className='text-red-500 pt-4 text-xs'>
                  {errors.password.message}
                </span>
              </div>
            }
          </div>

          <div className='mt-6'>
            <button type='submit' className='w-full bg-black text-white py-2 px-4 rounded-md hover:bg-orange-700 duration-200'>
              회원가입
            </button>
          </div>
          <p className='mt-4 text-xs font-light text-center'>
            가입한 아이디가 있으신가요? 
            <a
              href='/login'
              className='font-semibold hover:text-orange-800'
            > 로그인</a>
          </p>

        </form>
      </div>
    </section>
  )
}

export default RegisterPage
