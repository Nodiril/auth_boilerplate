import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'
import {
  typeDef as User,
  resolvers as userResolvers
} from './types/user'

const Query = `
type Query {
  _empty: String
}

type Mutation {
  _empty: String
}
`

const resolvers = { }

const schema = makeExecutableSchema(
  {
    typeDefs: [Query, User],
    resolvers: merge(resolvers, userResolvers)
  }
)

export default schema
