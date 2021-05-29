import "reflect-metadata";
import express from "express";
import { config } from "dotenv"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/Hello";
import { CustomTypeResolver } from "./resolvers/CustomTypeResolver";
import { RequestParams } from "./resolvers/QueryParams";
config();
const port = process.env.PORT || 4000;

(async () => {
    const app = express();

    const schema = await buildSchema({
        resolvers: [HelloResolver, CustomTypeResolver, RequestParams]
    })

    const server = new ApolloServer({ schema });
    server.applyMiddleware({ app });

    app.listen(port, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));

})();

