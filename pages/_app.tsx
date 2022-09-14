import { AppProps } from "next/app";
import toast, { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps | any) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Toaster />
        <Head>
          <title>Reddit Clone</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/logoMiniClr.png" />
        </Head>
        <div className="h-screen overflow-y-scroll bg-slate-200">
          <Header />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
