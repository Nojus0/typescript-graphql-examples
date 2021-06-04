import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { IContext } from "../server";

@Resolver()
export class ContextResolver {

    // To accept cookies frontend must set credentials: "include" to access cookies
    // For testing purposes in GraphQl playground settings set "request.credentials": "include"
    @Query(() => String)
    async ContextExample(@Ctx() { req, res }: IContext) {

        if (req.cookies.auth == null) return "You dont have an auth cookie";

        return `Your auth cookie is ${req.cookies.auth}`
    }

    @Query(() => String)
    async getAuth(@Ctx() { req, res }: IContext) {

        if (req.cookies.auth != null) return "You already have an auth cookie";

        res.cookie("auth", "authstuff", {
            httpOnly: true, // cannot be accessed by javascript
            secure: process.env.ISPROD === "true", // allow only to send the cookie on https
            maxAge: 7 * 86400 // cookie expiration date from now in seconds,
                              // currently set to 7 days if nothing is provided in maxAge or expires
                              // cookie will be deleted on browser close
        })

        return `Here you go`
    }
}