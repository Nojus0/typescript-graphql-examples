import { Arg, Field, Float, ID, Int, Mutation, ObjectType, Query, Resolver } from "type-graphql";

@Resolver()
export class RequestParams {

    // query {
    //     name(name: "John")
    // }

    // {
    //     "data": {
    //       "name": "nice John"
    //     }
    //}

    @Query(() => String, { nullable: true }) // Query with return type of String.
    async name(@Arg("name") gotname: string) {
        return `nice ${gotname}`
    }




    // mutation {
    //     changeName(name: "Noah", password: "123") {
    //       name,  /* Get "changed" name and password */
    //       password  
    //     }
    //   }


    // {
    //     "data": {
    //       "changeName": {
    //         "name": "Noah",
    //         "password": "123"
    //       }
    //     }
    //   }


    @Mutation(() => CrendentialsType, { nullable: true }) // Response type is CredentialsType
    async changeName(@Arg("name") nameParam: string, @Arg("password") ReciEvEdPaSs: string) {

        // Do something on db or other.

        if (nameParam === "John") return null;

        const CHANGED: CrendentialsType = {
            name: nameParam,
            password: ReciEvEdPaSs
        }

        return CHANGED;
    }
}


@ObjectType()
class CrendentialsType {
    @Field(() => String, { nullable: true })
    name?: string

    @Field()
    password: string

    // @Field(() => Int, { nullable: true })
    // number: number

    // @Field(() => Float, { nullable: true })
    // number: number

    // @Field(() => ID)
    // id: number
}