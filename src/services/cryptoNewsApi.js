import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5000/api';

const createRequest = (url) => ({ url, headers: {} });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Authorization', 'FHZuyE9GSLLv7i9RSw1ccdz7AEfhXEUv56Y9FkG-D5qPaZA6');
      headers.set('Cache-Control', 'no-cache');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/search?keywords=${newsCategory}&language=en`)
    })
  })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
