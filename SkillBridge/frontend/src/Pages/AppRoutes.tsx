import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from '../Components/Header/Header';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import { useSelector } from 'react-redux';
import Footer from '../Components/Footer/Footer';
import ProtectedRoute from '../Services/ProtectedRoute';
import PublicRoute from '../Services/PublicRoute';
import NotFoundPage from './NotFoundPage';
import { LoadingOverlay } from '@mantine/core';

const AppRoutes = () => {
  const overlay = useSelector((state: any) => state.overlay);
  return <BrowserRouter>
    <div className='relative overflow-hidden'>
      {overlay && <div className='fixed !z-[2000] w-full h-full flex  items-center justify-center'>
        <LoadingOverlay
          visible={overlay}
          zIndex={2000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'brightSun.4', type: 'bars' }}
        />

      </div>}
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<PublicRoute><SignUpPage /></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><SignUpPage /></PublicRoute>} />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
}
export default AppRoutes;