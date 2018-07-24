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
export const ALL_USERS_QUERY = gql`
    query AllUsersQuery {
        allUsers {
            id
            username
            email
        }
    }
`
export const USER_QUERY = gql`
    query UserQuery($username: String!) {
        user(username: $username) {
            id
            username
            password
        }
    }
`
export const ADD_POST_MUTATION = gql`
    mutation AddPostMutation($title: String!, $content: String!) {
        addPost(
            title: $title,
            content: $content
        ) {
            id
            slug
            title
            content
            user {
                id
                username
                email
            }
        }
    }
`
export const ALL_POSTS_QUERY = gql`
    query AllPostsQuery {
        allPosts {
            id
            title
            slug
            user {
                username
            }
        }
    }
`
export const POST_QUERY = gql`
    query PostQuery($slug: String!) {
        post(slug: $slug) {
            id
            title
            slug
            content
            user {
                id
                username
                email
            }
        }
    }
`
