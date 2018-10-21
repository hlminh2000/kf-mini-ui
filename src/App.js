import React from "react";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "emotion-theming";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import Profile from "./components/Profile";
import Header from "./components/Header";
import theme from "./theme";

const REACT_APP_GQL_API_URL =
  process.env.REACT_APP_GQL_API_URL || "http://localhost:4000/graphql";

const httpLink = createHttpLink({
  uri: REACT_APP_GQL_API_URL
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("EGO_JWT");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default ({}) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <>
          <Header />
          <Profile />
        </>
      </ThemeProvider>
    </ApolloProvider>
  );
};
