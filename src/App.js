import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PageNotFound from './pages/PageNotFound'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import UserOrders from './features/user/components/UserOrders'
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useEffect } from 'react';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAsync, selectLoggedInUser,checkAuthAsync,selectUserChecked } from './features/auth/authSlice';
import OrderSucessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminHome from './pages/AdminHome';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin'
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage'
import AdminOrdersPage from './pages/AdminOrdersPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AlertTemplate from 'react-alert-template-basic';
import { positions,Provider } from 'react-alert';

const options={
  timeout:5000,
  position:positions.BOTTOM_LEFT
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected><Home></Home></Protected>,
  },
  {
    path:'/admin',
    element:(
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    )
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },
  { 
    path: '/cart',
    element: <Protected><CartPage></CartPage></Protected>,
  },
  { 
    path: '/checkout',
    element: <Protected><Checkout></Checkout></Protected>,
  },
  { 
    path: '/product-detail/:id',
    element: <Protected><ProductDetailPage></ProductDetailPage></Protected>,
  },
  { 
    path: '/admin/product-detail/:id',
    element: <ProtectedAdmin><AdminProductDetailPage></AdminProductDetailPage></ProtectedAdmin>,
  },
  { 
    path: '/admin/orders',
    element: <ProtectedAdmin><AdminOrdersPage/></ProtectedAdmin>
    
  },
  { 
    path: '/admin/product-form',
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>,
    
  },
  { 
    path: '/admin/product-form/edit/:id',
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>,
  },
  {
    path: '/order-success/:id',
    element:(
      <OrderSucessPage/>
    )
  },
  {
    path:'/orders',
    element:(
      <Protected><UserOrdersPage></UserOrdersPage></Protected>
    )
  },
  {
    path:'/profile',
    element:(
      <Protected><UserProfilePage/></Protected>
    )
  },
  {
    path:'/logout',
    element:(
      <Logout></Logout>
    )
  },
  {
    path:'/forgot-password',
    element:(
      <ForgotPasswordPage/>
    )
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage></ResetPasswordPage>,
  },
  {
    path:'*',
    element: (<Protected><PageNotFound/></Protected>)
  }
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      // we can get req.user by token on backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="App">
        {userChecked && (
          <Provider template={AlertTemplate} {...options}>
            <RouterProvider router={router} />
          </Provider>
        )}
        {/* Link must be inside the Provider */}
      </div>
    </>
  );
}

export default App;
