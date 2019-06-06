/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { withRouter } from 'react-router';
import Storage from '../../assets/storage.svg';


const NoItem = () => {
  const style = {
    container: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      justify-content: center;
      width: 80%;
      align-self: center;
      margin: 40px 0;
    `,

    title: css`
      margin-bottom: 10px;
      text-align: center;
    `,

    goBack: css`
      margin-top: 50px;
    `,

    image: css`
      width: 80%;
      margin-bottom: 20px;
    `,
  };

  return (
    <div css={style.container}>
      <img src={Storage} css={style.image} alt="" />
      <h3 css={style.title}>Nie mamy takich mebli w naszym magazynie</h3>
    </div>
  );
};

export default withRouter(NoItem);
