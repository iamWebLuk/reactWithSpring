import { useLocalStorage } from 'usehooks-ts';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface FetchMethods {
  Get: string;
  Put: string;
  post: string;
  delete: string;
}

type Assignment = {
  id: number;
  status: string;
  githubUrl: string;
  branch: string;
  codeReviewVideoUrl: string;
};
const useGetFetchHook = (
  url: string
  // data?: Assignment,
  // setData?: Dispatch<SetStateAction<Assignment[]>>
) => {
  const [jwtToken] = useLocalStorage('jwt', '');

  axios.defaults.headers.common['authorization'] = 'Bearer ' + jwtToken;
  // const [response, setResponse] = useState<Assignment[]>();
  const [data, setData] = useState<Assignment[]>();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get<Assignment[]>(url)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);
  console.log(data);
  return { data };
};

export { useGetFetchHook };
