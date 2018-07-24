import gql from 'graphql-tag'

export const REGISTER_MUTATION = gql`
    mutation RegisterMutation($username: String!, $password: String!) {
        register(
            username: $username,
            password: $password
        )
    }
`
export const LOGIN_MUTATION = gql`
    mutation LoginMutation($username: String!, $password: String!) {
        token(
            username: $username,
            password: $password
        )
    }
`
