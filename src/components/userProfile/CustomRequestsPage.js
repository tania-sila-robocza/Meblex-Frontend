/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import CustomSizeRequest from './CustomSizeRequest';
import * as API from '../../api';
import LoadingSpinner from '../shared/LoadingSpinner';
import { useTheme } from '../../helpers';

const CustomRequestsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const theme = useTheme();

  const style = {
    userProfile: css`
      padding: 30px 20px;
      display: flex;
      flex-direction: column;
    `,

    subTitle: css`
      margin: 0;
      margin-bottom: 30px;
    `,

    loading: css`
      width: 50px;
      height: 50px;
      margin: 30px 0;
      align-self: center;

      circle {
        stroke: ${theme.colors.primary};
      }
    `,
  };

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const req = await API.getClientCustomSizeRequests();
        setRequests(req);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div css={style.userProfile}>
      <h3 css={style.subTitle}>Twoje zapytania</h3>
      {requests.map((request, i) => (
        <CustomSizeRequest key={i} request={request} />
      ))}

      {isLoading && (
        <LoadingSpinner css={style.loading} isLoading={isLoading} />
      )}
    </div>
  );
};

export default CustomRequestsPage;
