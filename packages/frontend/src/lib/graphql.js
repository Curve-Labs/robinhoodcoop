import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient, gql } from 'apollo-boost'
import { WebSocketLink } from 'apollo-link-ws'

export const ALL_MEMBERS = gql`
  subscription {
    members(orderDirection: asc) {
      address
      shares
      firstname
      lastname
      email
    }
  }
`

export const MEMBERS = gql`
  subscription {
    members(orderDirection: asc) {
      id
    }
  }
`

export const MEMBER = gql`
  subscription member($id: String) {
    member(id: $id) {
      address
      shares
      firstname
      lastname
      email
    }
  }
`

export const GRAPH_ENDPOINT = 'wss://api.thegraph.com/subgraphs/name/osarrouy/robinhoodcoop'

const link = new WebSocketLink({
  uri: GRAPH_ENDPOINT,
  options: {
    reconnect: true,
  },
})
const cache = new InMemoryCache()

export const graphql = new ApolloClient({ link, cache })
