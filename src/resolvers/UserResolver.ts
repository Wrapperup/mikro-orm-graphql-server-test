import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../entities/User";
import { AppContext } from "../context";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { em }: AppContext) {
    return em.find(User, {});
  }
}
