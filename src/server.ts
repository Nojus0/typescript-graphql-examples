import "reflect-metadata";
import express, { Request, Response } from "express";
import { config } from "dotenv"
import { ApolloServer } from "apollo-server-express"
import { buildSchema, InterfaceType } from "type-graphql";
import { HelloResolver } from "./resolvers/Hello";
import { CustomTypeResolver } from "./resolvers/CustomTypeResolver";
import { RequestParams } from "./resolvers/QueryParams";
import cors from "cors"
import cookieParser from "cookie-parser"
import { ContextResolver } from "./resolvers/ContextResolver";

config();
const port = process.env.PORT || 4000;

(async () => {
    const app = express();
    app.use(cookieParser());
    app.use(cors({
        credentials: true,  // Accept document cookies from frontend including HttpOnly cookies,
                            // though frontend must specify when requesting
                            //  credentials: "include"

        origin: process.env.FRONTEND_URL || "http://example.com"
                            // CANNOT BE SET TO "*" IF YOU WANT TO ACCEPT CREDENTIALS / COOKIES
                            // Must the url you want to accept credentials from.
    }));

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, CustomTypeResolver, RequestParams, ContextResolver]
        }),
        context: ({ req, res }) => ({ req, res })
        // Pass the req and res objects so
        // we can access headers in req object
        // or set HttpOnly cookies in res object
    });

    server.applyMiddleware({ app, cors: false }); // We up your own cors, so we disable the auto one.

    app.listen(port, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
})();

export interface IContext {
    req: Request  // Express
    res: Response
}

