import React from 'react'


const RegisterPage = () => {
  return (
    <section className='flex flex-col justify-center mt-20 max-w-[500px] m-auto'>
      <div className='p-10 bg-white rounded-md shadow-md border-t-[1px]'>
        <h1 className='text-3xl font-semibold text-center mb-4'>
          회원가입
        </h1>
        <form className='mb-6'>
          <div className='mb-2'>
            <label
              htmlFor='email'
              className='text-lg font-semibold text-gray-800'
            >Email</label>
            <input 
              type='email'
              id='email'
              className='w-full px-4 py-2 mt-2 bg-white border-2 rounded-md border-gray-300'
            />
          </div>
          <div className='mb-2'>
            <label
              htmlFor='name'
              className='text-lg font-semibold text-gray-800'
            >Name</label>
            <input 
              type='text'
              id='name'
              className='w-full px-4 py-2 mt-2 bg-white border-2 rounded-md border-gray-200'
            />
          </div>
          <div className='mb-2'>
            <label
              htmlFor='pw'
              className='text-lg font-semibold text-gray-800'
            >Password</label>
            <input 
              type='password'
              id='pw'
              className='w-full px-4 py-2 mt-2 bg-white border-2 rounded-md border-gray-200'
            />
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
