export const typeDef = `
extend type Query {
  user(username: String!): User
}

extend type Mutation {
  token(username: String!, password: String!): String
  register(username: String!, password: String!): String
}

type User {
  id: Int
  username: String
  password: String
}
`;

import User from "../../models/User";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

export const resolvers = {
  Query: {
    async user(root, args) {
      var test = await User.where({ username: args.username }).fetch();
      return test.toJSON();
    }
  },
  Mutation: {
    async token(_, userInfo) {
      var user = await User.where({ username: userInfo.username }).fetch();
      user = user.toJSON();

      if (!user) {
        throw new Error("No user with that email");
      }

      const valid = await bcrypt.compareSync(userInfo.password, user.password);

      if (!valid) {
        throw new Error("Incorrect password");
      }
      
      return jsonwebtoken.sign(
          { id: user.id, username: user.username, password: user.password },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        )
    },
    async register(_, userInfo) {

      var user = await User.where({ username: userInfo.username }).fetch();

      if (user) {
        throw new Error("User already exists");
      }

      const salt = bcrypt.genSaltSync()
      const hash = bcrypt.hashSync(userInfo.password, salt)
      userInfo.password = hash

      user = await new User(userInfo).save(null, {method:'insert'})
      
      return jsonwebtoken.sign(
          { id: user.id, username: user.username, password: user.password },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        )
    }
  }
}
