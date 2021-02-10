import React, { useState, useEffect } from 'react';
import { ConnectRC, Loading, connect, IGlobalState } from 'umi';
import { getBin } from '../api';
import useUser from '../data/user';

interface PageProps {
  global: IGlobalState;
  loading: boolean;
  title: string;
}

const Page: ConnectRC<PageProps> = ({ loading, global, dispatch, title }) => {
  const { userInfo } = global;

  const { users, msg } = useUser({ name: 'paddy' });
  console.log('users', users);
  console.log('msg', msg);

  useEffect(() => {
    async function getData() {
      const res = await dispatch({ type: 'global/getUserInfo', payload: {} });
      const res2 = await getBin();
      console.log(res);
      console.log(res2);
    }
    getData();
  }, []);

  return (
    <div>
      hi {userInfo.name}, loading {loading.toString()}
    </div>
  );
};

export default connect(
  ({ loading, global }: { loading: Loading; global: IGlobalState }) => ({
    loading: loading.global,
    global,
  }),
)(Page);
