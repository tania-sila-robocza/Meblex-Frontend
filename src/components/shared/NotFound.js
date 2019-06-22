/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import HikingTraveller from '../../assets/hiking_traveller.svg';
import Button from './Button';


const NotFound = ({ history }) => {
  const handleClick = () => history.goBack();

  const style = {
    container: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      justify-content: center;
      width: 80%;
      align-self: center;
    `,

    image: css`
      width: 80%;
      margin-bottom: 20px;
    `,

    title: css`
      margin-bottom: 10px;
      text-align: center;
    `,

    button: css`
      margin-top: 50px;
    `,
  };

  return (
    <div css={style.container}>
      <img src={HikingTraveller} css={style.image} alt="" />
      <h3 css={style.title}>Dotarłeś na koniec świata</h3>
      <span>Co dalej?</span>
      <Button css={style.button} onClick={handleClick}>Wróć</Button>
    </div>
  );
};

export default NotFound;
