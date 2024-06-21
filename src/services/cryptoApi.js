import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your API headers
const cryptoApiHeaders = {
    'X-RapidAPI-Key': '66e8848669mshb23ffbaf3548492p168609jsn036f539b78de',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
};

// Define the base URL for the API
const baseUrl = 'https://coinranking1.p.rapidapi.com';

// Helper function to create request configurations
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

// Create the API service using RTK Query
export const cryptoApi = createApi({
    reducerPath: 'crypto',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', cryptoApiHeaders['X-RapidAPI-Key']);
            headers.set('X-RapidAPI-Host', cryptoApiHeaders['X-RapidAPI-Host']);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getExchanges: builder.query({
            query: () => createRequest(`/exchanges`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        })
    })
});

// Export hooks for the API endpoints
export const {
    useGetCryptosQuery,
    useGetExchangesQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi;
