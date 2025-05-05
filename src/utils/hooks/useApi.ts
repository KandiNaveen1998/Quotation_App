// import {useState, useCallback} from 'react';
// import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
// import {useToast} from './ToastContext'; // Your custom toast hook
// import {LogInStore} from '../Stores/ZustandStore';

// type UseApiReturn<T> = {
//   data: T | null;
//   loading: boolean;
//   error: string | null;
//   request: (config: AxiosRequestConfig) => Promise<T | null>;
//   status: number;
// };

// export function useApi<T = any>(): UseApiReturn<T> {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [status, setStatus] = useState(0);
//   const {showToast} = useToast(); // ✅ memoized
//   const LOGIN_Data = LogInStore(state => state.LOGIN_Data);

//   const request = useCallback(
//     async (config: AxiosRequestConfig): Promise<T | null> => {
//       setLoading(true);
//       setError(null);
//       setData(null); // ✅ clear old data before new request
//       setStatus(0);

//       // console.log('config', config);
//       try {
//         // const token = localStorage.getItem('token'); // or sessionStorage, Zustand, Redux, etc.
//         // const token = LOGIN_Data?.loginToken; // Get the token from Zustand store
//         let token =
//           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJwYWN0NUBnbWFpbC5jb20iLCJ0ZW5hbnRJZCI6MSwicm9sZSI6ImVtcGxveWVyIiwiaWF0IjoxNzQ1Mjk0MjI5LCJleHAiOjE3NDUzMjMwMjl9.sfxTOE4pz2Az11_VBj0KLZ07DftIELvHckqHo9PrS-0';
//         let xShowroomToken =
//           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVuYW50SWQiOjEsInNob3dyb29tSWQiOjIsImlhdCI6MTc0NTI5NDIyOSwiZXhwIjoxNzQ1MzIzMDI5fQ.I07IiVaq7fQ8CIj5ndPea6QKs3cUNxNCvmANmX3zkjs';
//         const headersWithAuth = {
//           ...(config.headers || {}),
//           ...(token && {Authorization: `Bearer ${token}`}), // Only adds token if it exists
//           ...(xShowroomToken && {'x-showroom-token': xShowroomToken}), // Only adds token if it exists
//         };

//         const finalConfig: AxiosRequestConfig = {
//           ...config,
//           headers: headersWithAuth,
//         };

//         // const response: AxiosResponse<T> = await axios(config);
//         const response: AxiosResponse<T> = await axios(finalConfig);
//         console.log('response?.status', response);
//         setData(response.data);
//         setStatus(response.status);
//         if (response.status === 401) {
//           // Handle unauthorized access (e.g., redirect to login)
//           console.error('Unauthorized access - redirecting to login');
//           // Redirect logic here, e.g., window.location.href = '/login';

//           //if response.status is 401, navigate user to login page
//         }
//         return {data: response?.data, loading, error, status};
//         // return response.data;
//       } catch (err: any) {
//         console.log('err', err);
//         const message =
//           err?.response?.data?.message ||
//           err?.message ||
//           'Something went wrong';
//         console.error('Error:', message);
//         setError(message);
//         showToast(message, 'error');
//         return null;
//       } finally {
//         setLoading(false);
//       }
//     },
//     [showToast],
//     // ✅ Only runs if showToast changes
//   );

//   return {data, loading, error, request, status};
// }
// /*
// const { data: userData, loading: loadingUser, request: fetchUser } = useApi<UserType>();
// const { data: postsData, loading: loadingPosts, request: fetchPosts } = useApi<PostType[]>();

// useEffect(() => {
//   fetchUser({ method: 'GET', url: '/api/user/123' });
//   fetchPosts({ method: 'GET', url: '/api/posts' });
// }, []);
// */

import {useState, useCallback} from 'react';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {useToast} from './ToastContext'; // Your custom toast hook
import {LogInStore} from '../Stores/ZustandStore';
import {useNavigation} from '@react-navigation/core';

type UseApiReturn<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  request: (config: AxiosRequestConfig) => Promise<T | null>;
  status: number;
};

export function useApi<T = any>(tokenFromParent?: string): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(0);
  const {showToast} = useToast(); // ✅ memoized
  const LOGIN_Data = LogInStore(state => state.LOGIN_Data); // If needed

  const request = useCallback(
    async (config: AxiosRequestConfig): Promise<T | null> => {
      setLoading(true);
      setError(null);
      setData(null);
      setStatus(0);

      try {
        // Normally you'd get tokens from Zustand or localStorage
        const token = LOGIN_Data?.loginToken || tokenFromParent || ''; //if it  getting undefined then i want send
        const xShowroomToken = LOGIN_Data?.selectedShowroom?.token || '';
        const headersWithAuth = {
          ...(config.headers || {}),
          ...(token && {Authorization: `Bearer ${token}`}),
          ...(xShowroomToken && {'x-showroom-token': xShowroomToken}),
        };

        const finalConfig: AxiosRequestConfig = {
          ...config,
          headers: headersWithAuth,
        };

        const response: AxiosResponse<T> = await axios(finalConfig);
        setData(response.data);
        setStatus(response.status);
        // console.log('nnn response in api call', response?.status); //here api status is not coming when there is an error
        return response.data; // ✅ return only the data
      } catch (err: any) {
        // catch (err: any) {
        //   console.log('nnn error in api call', err);

        //   const message =
        //     err?.response?.data?.message ||
        //     err?.message ||
        //     'Something went wrong';
        //   console.error('API Error:', message);
        //   setError(message);
        //   showToast(message, 'error');
        //   return null;
        // }
        console.log('nnn error in api call', err);

        const message =
          err?.response?.data?.message ||
          err?.message ||
          'Something went wrong';

        // console.error('API Error:', message, typeof message);

        setError(message);
        setStatus(err?.response?.status || 0); // ✅ Capture the status here
        showToast(message, 'error');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [showToast, LOGIN_Data],
  );

  return {data, loading, error, request, status};
}
