import React, {useState} from 'react'
import "../styles/globals.css";
import { AppProps } from "next/app";
import {  ApolloProvider } from '@apollo/client';
import { useApollo } from "@/graphql/lib/apolloClient";
import { AppContext } from "@/context/app-context";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  const [listContact, setListContact] = useState({
      listContact: [],
      listContactFavorite: [],
      detailContact: {}
  })
  
  const appContextValue:any = {
    listContact,
    setListContact,
  }
  return (
    <>
    <ApolloProvider client={apolloClient}>
      <AppContext.Provider value={appContextValue}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </ApolloProvider>
    </>
  );
}

export default MyApp;
