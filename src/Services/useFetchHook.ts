import {useSessionStorage} from "usehooks-ts";
import axios from "axios";
import {useEffect, useState} from "react";

interface FetchMethods {
    Get: string
    Put: string;
    post: string;
    delete: string;
}



// const useFetchHook = (fetchMethod: FetchMethods, url: string, data: {}) => {
// const [jwt, setJwt] = useSessionStorage('jwt', '')
//
//        let abc = axios({method: fetchMethod}, url, data)
//            axios({url, data, method: fetchMethod})
//             .then(res => {
//                 // setJwt(res.headers.authorization)
//                 console.log(res)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
// }

const useGetFetchHook = (url: string) => {
    const [jwtToken] = useSessionStorage('jwt', '');

    axios.defaults.headers.common['authorization'] = 'Bearer ' + jwtToken;
    const [jwt, setJwt] = useSessionStorage('jwt', '')
    const [response, setResponse] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(url)
            .then(res => setResponse(res))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    },[])
    return{ response, error, loading }
}

export { useGetFetchHook };