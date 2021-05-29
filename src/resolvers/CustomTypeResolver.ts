import { Field, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType() // Generate GraphQl Types from Class
export class CustomResponse {

    @Field()
    message: string

    @Field()
    user: string
}

@Resolver()
export class CustomTypeResolver {
    @Query(() => CustomResponse, { nullable: true })
    getCustom() {
        return {
            message: "nice",
            user: "Graph"
        }
    }
}