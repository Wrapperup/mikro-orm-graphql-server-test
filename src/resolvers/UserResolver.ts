import { Resolver, Query, Ctx, Mutation, Arg } from "type-graphql";
import { User } from "../entities/User";
import { AppContext } from "../context";
import * as argon2 from "argon2";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { em }: AppContext) {
    return em.find(User, {});
  }

  @Query(() => Boolean)
  async login(
    @Ctx() { em }: AppContext,
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
    try {
      const user = await em.findOneOrFail(User, { username: username });
      const valid = await argon2.verify(user.password, password);

      return valid;
    } catch (e) {
      console.log(`Error: ${e}`);
      return false;
    }
  }

  @Mutation(() => User, { nullable: true })
  async register(
    @Ctx() { em }: AppContext,
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
    try {
      const hashedPassword = await argon2.hash(password);
      const user = em.create(User, {
        username: username,
        password: hashedPassword,
      });

      em.persistAndFlush(user);

      return user;
    } catch (e) {
      console.log(`Error: ${e}`);
      return null;
    }
  }
}
