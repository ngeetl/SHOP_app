import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from './store/thunkFunctions';
import ProtectedRoutes from './components/ProtectedRoutes';
import ProtectedPage from './pages/ProtectedPage/ProtectedPage';
import NotAuthRoutes from './components/NotAuthRoutes';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import CartPage from './pages/CartPage/CartPage';
import DetailProductPage from './pages/DetailProductPage/DetailProductPage';
import UploadProductPage from './pages/UploadProductPage/UploadProductPage';


function Layout() {
  return (
    <div className='flex flex-col h-screen justify-between'>

      <ToastContainer 
        position='bottom-right'
        theme='light'
        pauseOnHover
        autoClose={1500}
      />

      <Navbar />
      <main className='mb-auto w-10/12 max-w-4xl mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if(isAuth) {
      dispatch(authUser());
    }
  }, [ isAuth, pathname, dispatch ]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        <Route index element={<LandingPage />} />
        <Route path='/product/:productId' element={<DetailProductPage />} />

        {/* 로그인 유저만 접속할 수 있는 경로 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path='/protected' element={<ProtectedPage />} />
          <Route path='/product/upload' element={<UploadProductPage />} />
          {/* <Route path='/product/:productId' element={<DetailProductPage />} /> */}
          <Route path='/user/cart' element={<CartPage />} />
          <Route path='/history' element={<HistoryPage />} />
        </Route>

        {/* 로그인 유저가 아닌 경우 */}
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>

      </Route>

    </Routes>
  )
}

export default App
