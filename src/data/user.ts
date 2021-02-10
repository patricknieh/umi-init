import useSWR, { mutate } from 'swr';
import requester from '../utils/requester';

// mutate('/api/user')
// mutate('/api/user', newUser, false)      // use `false` to mutate without revalidation
// mutate('/api/user', updateUser(newUser))

// useSWR('/api/user', () => fetcher('/api/user'))
// useSWR('/api/user', url => fetcher(url))
// useSWR('/api/user', fetcher)

export default function (params: any) {
  let msg = '';
  const { data: id, error: error1 } = useSWR(
    ['/api/users/create', JSON.stringify(params), 'post'], ////params must be a stable value
    requester,
  );
  msg = error1;
  const { data: users, error: error2 } = useSWR(
    () => `/api/user?id=${id.id}`, //dependent id如果没有，swr会取消请求
    requester,
  );
  msg = error2;

  return {
    users,
    msg,
  };
}
