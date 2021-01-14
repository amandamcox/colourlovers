import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri: "https://colourlovers-graphql-api.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});
