import React, { useEffect, useState, useCallback } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';

import '../shared/main.scss';
import { theme } from '../../styles';

import LoginScreen from '../loginScreen/LoginScreen';
import Content from './Content';

import * as API from '../../api';
import Registration from '../registration/Registration';
import Loading from '../shared/Loading';
import { setUserData } from '../../redux/auth';
import Logout from './Logout';
import { fetchRooms, fetchCategories, fetchColors, fetchMaterials, fetchPatterns } from '../../redux/data';


const App = withRouter(() => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  // const setUserData = useCallback(data => dispatch(setUserDataAction(data)), [dispatch]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (accessToken) {
      const loginStatusChecking = async () => {
        try {
          const userData = await API.getUserData();
          dispatch(setUserData(userData));
        } catch (error) {
          //
        }
        setTimeout(() => setIsLoading(false), 0);
      };
      loginStatusChecking();
    }
    setIsLoading(false);

    dispatch(fetchRooms());
    dispatch(fetchCategories());
    dispatch(fetchColors());
    dispatch(fetchMaterials());
    dispatch(fetchPatterns());
  }, [accessToken, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/logowanie" component={LoginScreen} />
        <Route path="/rejestracja" component={Registration} />
        <Route path="/wyloguj" component={Logout} />

        <Route render={() => (
          <Loading isLoading={isLoading} type="alt" text="Ładowanie...">
            <Content />
          </Loading>
        )}
        />
      </Switch>
    </ThemeProvider>
  );
});


export default App;
