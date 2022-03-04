import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';

import UserProfile from './components/pages/user-profile-page';
import ProductsPage from './components/pages/products-page';
import Menubar from './components/menu-bar/menu-bar';

// This parent component will always render Menubar and will always be shown on each of its children components through using outlet
const Navigation = () => {
  return (
    <Grid>
      <Menubar />
      <Outlet />
    </Grid>
  )
}

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigation/>} >
          <Route index element={<ProductsPage />} />
          <Route path='userprofile' element={<UserProfile />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;