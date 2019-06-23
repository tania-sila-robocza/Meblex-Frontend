/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from '../../helpers';
import Blueprint from '../../assets/blueprint.png';
import RoomSizeForm from './RoomSizeForm';
import FitterItem from './FitterItem';
import * as API from '../../api';
import { Icons } from '../../assets';
import { removeItemFromFitter } from '../../redux/fitter';
import Button from '../shared/Button';
import LoadingSpinner from '../shared/LoadingSpinner';


const Fitter = ({ location }) => {
  const theme = useTheme();
  const [furniture, setFurniture] = useState([]);
  const fitterItems = useSelector(state => state.fitter.items);
  const roomSize = useSelector(state => state.fitter.roomSize);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const style = {
    container: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100vw;
      height: auto;
      min-height: 100vh;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(${Blueprint});
      padding-bottom: 50px;
    `,

    loading: css`
      width: 50px;
      height: 50px;
      margin: 30px 0;

      circle {
        stroke: ${theme.colors.primary};
      }
    `,

    header: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 20px;
      margin-bottom: 20px;

      h2 {
        font-size: 3.5em;
        padding: 10px 15px;
        text-shadow: 0px 0px 20px white;
        border-radius: 10px;
        margin: 0;
      }

      p {
        width: 70%;
        padding: 10px 15px;
        border-radius: 10px;
        text-shadow: 0px 0px 20px white;
        text-align: center;
        font-weight: bold;
        line-height: 1.7em;
      }
    `,

    title: css`
      margin: 0 auto;
      margin-top: 60px;
      margin-bottom: 20px;
      width: 80%;
    `,

    noitems: css`
      width: 90%;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0px 1px 15px rgba(4, 35, 101, 0.22);
      border-radius: 5px;
      padding: 20px;
      display: flex;
      flex-direction: column;

      p {
        font-weight: bold;
        line-height: 1.7em;
        margin: 0;
      }
    `,

    hintbtn: css`
      width: 30px;
      height: 30px;
      position: relative;
      top: 5px;
      margin: 0 5px;
      fill: ${theme.colors.primary};
    `,

    list: css`
      width: 80%;
      margin: 0 auto;
      margin-top: 20px;
    `,

    loginbtn: css`
      margin: 20px auto;
      margin-top: 30px;
    `,
  };

  useEffect(() => {
    const fetchFurniture = async () => {
      setIsLoading(true);
      try {
        const filter = fitterItems.map(item => `(id eq ${item})`).join(' or ') || undefined;
        const products = await API.getFurniture({ filter });
        setFurniture(products);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    };

    if (fitterItems.length > 0) fetchFurniture();
    else setFurniture([]);
  }, [fitterItems]);

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromFitter(id));

    const index = furniture.indexOf(furniture.filter(f => f.id === id)[0]);
    setFurniture([
      ...furniture.slice(0, index),
      ...furniture.slice(index + 1),
    ]);
  };

  return (
    <div css={style.container}>
      <div css={style.header}>
        <h2>FITTER™</h2>
        <p>Rewolucyjne narzędzie dzięki któremu sprawdzisz czy meble zmieszczą się w Twoim pokoju!</p>
      </div>

      {user ? (
        <React.Fragment>
          <h3 css={style.title}>Czy się zmieszczą?</h3>
          <RoomSizeForm initialValues={roomSize} furniture={furniture} />

          <h3 css={style.title}>Sprawdzane meble</h3>
          <div css={style.list}>
            {furniture.map(f => <FitterItem key={f.id} product={f} handleRemove={handleRemoveItem} />)}
          </div>

          {!isLoading && furniture.length === 0 && (
          <div css={style.noitems}>
            <p>Aby dodać mebel do FITTERa nacisnij przycisk <Icons.AddPuzzle css={style.hintbtn} /> przy przeglądaniu mebla.</p>
          </div>
          )}

          {isLoading && <LoadingSpinner css={style.loading} isLoading={isLoading} />}
        </React.Fragment>
      ) : (
        <div css={style.noitems}>
          <p>Tylko zalogowani użytkownicy mogą korzystać z FITTERa!</p>
          <Button
            css={style.loginbtn}
            component={Link}
            to={{
              pathname: '/logowanie',
              state: { from: location },
            }}
          >Zaloguj się!
          </Button>
        </div>
      )}
    </div>
  );
};

export default Fitter;
