/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../helpers';
import Blueprint from '../../assets/blueprint.png';
import RoomSizeForm from './RoomSizeForm';
import FitterItem from './FitterItem';
import * as API from '../../api';
import { Icons } from '../../assets';
import { removeItemFromFitter } from '../../redux/fitter';


const Fitter = () => {
  const theme = useTheme();
  const [furniture, setFurniture] = useState([]);
  const fitterItems = useSelector(state => state.fitter.items);
  const roomSize = useSelector(state => state.fitter.roomSize);
  const dispatch = useDispatch();

  const style = {
    container: css`
      width: 100vw;
      height: auto;
      min-height: 100vh;
      background-size: cover;
      background-image: url(${Blueprint});
      padding-bottom: 50px;
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
  };

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const filter = fitterItems.map(item => `(id eq ${item})`).join(' or ') || undefined;
        const products = await API.getFurniture({ filter });
        setFurniture(products);
      } catch (error) {
        //
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

      <h3 css={style.title}>Czy się zmieszczą?</h3>
      <RoomSizeForm initialValues={roomSize} />

      <h3 css={style.title}>Sprawdzane meble</h3>
      <div css={style.list}>
        {furniture.map(f => <FitterItem key={f.id} product={f} handleRemove={handleRemoveItem} />)}
      </div>

      {furniture.length === 0 && (
        <div css={style.noitems}>
          <p>Aby dodać mebel do FITTERa nacisnij przycisk <Icons.AddPuzzle css={style.hintbtn} /> przy przeglądaniu mebla.</p>
        </div>
      )}
    </div>
  );
};

export default Fitter;
