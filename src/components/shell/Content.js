/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../shared/main.scss';
import { ToastContainer, toast } from 'react-toastify';
import { Roles } from '../../redux/auth';
import Toolbar from './Toolbar';
import Navigation from './Navigation';
import NotFound from '../shared/NotFound';
import Catalog from '../catalog/Catalog';
import Product from '../productScreen/Product';
import UserProfile from '../userProfile/UserProfile';
import ProtectedRoute from './ProtectedRoute';
import CustomSizeRequestPage from '../customSizeForm/CustomSizeRequestPage';
import WorkerPanel from '../workerPanel/WorkerPanel';
import Home from '../homeScreen/Home';
import 'react-toastify/dist/ReactToastify.css';
import Fitter from '../fitter/Fitter';
<<<<<<< HEAD
=======
import Cart from '../cart/Cart';
import Order from '../order/Order';
import FakePayment from '../order/FakePayment';
>>>>>>> e5bd51b4b8a93e0652c02c44f7430a901937875f

// import * as API from '../api'


const Content = () => {
  useEffect(() => {
    // const listing = API.getListing();
    // context.setListing(listing);
  }, []);

  const style = {
    content: css`
      min-height: calc(100vh - 70px);
      display: flex;
      flex-direction: column;
      transition: transform .3s ease-in-out; 
      padding-bottom: 70px;
      overflow: hidden;
    `,

    toast: css`
      background: red;
    `,

    toaster: css`
      bottom: 80px;
    `,
  };

  return (
    <React.Fragment>
      <Toolbar />
      <Navigation />

      <div css={style.content}>
        <ToastContainer
          css={[style.toaster]}
          toastClassName="toast"
          bodyClassName="toastBody"
          closeButton={false}
          draggable
          autoClose={3000}
          progressClassName="toastProgress"
          position={toast.POSITION.BOTTOM_CENTER}
        />

        <Switch>
          <Route path="/katalog/produkty/:product" component={Product} />
          <Route path="/katalog" component={Catalog} />
<<<<<<< HEAD
=======
          <ProtectedRoute path="/koszyk" roles={[Roles.USER, Roles.EMPLOYEE]} component={Cart} />
          <ProtectedRoute path="/zamowienie/dostawa" roles={[Roles.USER, Roles.EMPLOYEE]} component={Order} />
          <ProtectedRoute path="/zamowienie/platnosc" roles={[Roles.USER, Roles.EMPLOYEE]} component={FakePayment} />
>>>>>>> e5bd51b4b8a93e0652c02c44f7430a901937875f
          <ProtectedRoute path="/profil" roles={[Roles.USER, Roles.EMPLOYEE]} component={UserProfile} />
          <ProtectedRoute path="/niestandardowy" component={CustomSizeRequestPage} roles={[Roles.USER, Roles.EMPLOYEE]} />
          <ProtectedRoute path="/panel" component={WorkerPanel} roles={[Roles.EMPLOYEE]} />
          <ProtectedRoute path="/fitter" component={Fitter} roles={[Roles.USER, Roles.EMPLOYEE]} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Content;
