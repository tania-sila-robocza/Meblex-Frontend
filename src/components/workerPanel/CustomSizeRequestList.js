/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import * as API from '../../api';
import RequestItem from './RequestItem';
import LoadingSpinner from '../shared/LoadingSpinner';
import { useTheme } from '../../helpers';


const CustomSizeRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const style = {
    loading: css`
      width: 50px;
      height: 50px;
      margin: 30px 0;

      circle {
        stroke: ${theme.colors.primary};
      }
    `,

    list: css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `,
  };

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const res = await API.getCustomSizeRequests(true);
      setRequests(res);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div css={style.list}>
      {requests.map((req, i) => (
        <RequestItem key={i} request={req} requestAccepted={fetchRequests} />
      ))}

      {isLoading && (
        <LoadingSpinner css={style.loading} isLoading={isLoading} />
      )}
    </div>
  );
};

export default CustomSizeRequestList;
