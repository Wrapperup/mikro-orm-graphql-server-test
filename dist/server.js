"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mikro_orm_1 = require("mikro-orm");
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./resolvers/UserResolver");
const main = async () => {
    const orm = await mikro_orm_1.MikroORM.init();
    const schema = await type_graphql_1.buildSchema({
        resolvers: [UserResolver_1.UserResolver],
    });
    const apolloServer = new apollo_server_1.ApolloServer({
        schema,
        context: { em: orm.em },
    });
    apolloServer.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
};
main();
