import express from "express";
import schema from "./data/schema";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()

const app = express();
const GRAPHQL_PORT = 3000;

var whitelist = ["http://localhost:8080"];

var corsOptions = {
  origin: function(origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};

function logging(req,res,next){
  next();
}

app.use(logging)
app.use(cors(corsOptions));
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);

export default app;
