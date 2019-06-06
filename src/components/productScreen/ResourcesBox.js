/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import config from '../../config';

const ResourcesBox = ({ title, product, type }) => {
  const [data, setData] = useState([]);

  const style = {
    box: css`
      padding: 20px 30px;
    `,

    title: css`
      margin: 0 0 20px 0;
    `,

    resource: css`
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
    `,

    img: css`
      width: 40px;
      height: 40px;
      display: inline-block;
      border-radius: 50%;
      border: 2px solid;
      margin-right: 20px;
    `,

    info: css`
      display: flex;
      flex-direction: column;
      justify-content: center;

      p {
        margin: 0;
        font-size: 0.8em;
      }

      h5 {
        font-weight: bold;
        margin: 0;
      }
    `,
  };

  useEffect(() => {
    setData([
      ...product.parts.map(part => ({ resource: part[type], name: part.name })),
      { resource: product[type] },
    ]);
  }, [product, type]);

  return (
    <div css={style.box}>
      <h3 css={style.title}>{title}</h3>
      {data.map((d, k) => {
        const background = {
          material: `url(${config.IMAGES_SERVER}${d.resource.photo})`,
          pattern: `url(${config.IMAGES_SERVER}${d.resource.photo})`,
          color: d.resource.hexCode,
        }[type];

        return (
          <div css={style.resource} key={k}>
            <span css={[style.img, { background }]} />
            <div css={style.info}>
              <h5>{d.resource.name}</h5>
              {d.name && <p>{d.name}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResourcesBox;
