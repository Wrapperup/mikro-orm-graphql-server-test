import { MikroORM } from "mikro-orm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import config from "./mikro-orm.config";
import { User } from "./entities/User";

const main = async () => {
  const orm = await MikroORM.init(config);

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: { em: orm.em },
  });

  const user = orm.em.create(User, { userName: "testUser" });
  await orm.em.persistAndFlush(user);

  apolloServer.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

main();
