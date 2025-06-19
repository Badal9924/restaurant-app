import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './auth/Login'
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'
import MainLayout from './Layout/MainLayout'
import Homepage from './components/Homepage'
import Profile from './components/Profile'
import SearchPage from './components/SearchPage'
import RestaurantDetails from './components/RestaurantDetails'
import CartPage from './components/CartPage'
import Restaurant from './admin/Restaurant'
import AddMenu from './admin/AddMenu'
import Orders from './admin/Orders'
import Success from './components/Success'
import { useUserStore } from './store/useUserStore'
import { useEffect } from 'react'
import Loading from './components/Loading'

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  if (!user?.isVerified) {
    return <Navigate to='/verifyEmail' replace />
  }

  return children
}

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to='/' replace />
  }
  return children;
}

const AdminRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  if (!user?.admin) {
    return <Navigate to='/' replace />
  }

  return children
}

function App() {

  const { checkAuthentication, isCheckingAuth } = useUserStore();
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (isCheckingAuth) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoutes><MainLayout /></ProtectedRoutes>}>
          <Route path='/' element={<Homepage />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/search/:searchText' element={<SearchPage />} />
          <Route path='/restaurant/:id' element={<RestaurantDetails />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/admin/restaurant' element={<AdminRoutes><Restaurant /></AdminRoutes>} />
          <Route path='/admin/menu' element={<AdminRoutes><AddMenu /></AdminRoutes>} />
          <Route path='/admin/orders' element={<AdminRoutes><Orders /></AdminRoutes>} />
          <Route path='/order/status' element={<Success />} />
        </Route>

        <Route path='/login' element={<AuthenticatedUser><Login /></AuthenticatedUser>} />
        <Route path='/signup' element={<AuthenticatedUser><Signup /></AuthenticatedUser>} />
        <Route path='/forgotPassword' element={<AuthenticatedUser><ForgotPassword /></AuthenticatedUser>} />
        <Route path='/resetPassword/:token' element={<ResetPassword />} />
        <Route path='/verifyEmail' element={<VerifyEmail />} />

      </Routes>
    </BrowserRouter>
  )
}
export default App;