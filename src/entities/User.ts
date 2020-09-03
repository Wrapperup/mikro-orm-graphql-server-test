import {
  Entity,
  PrimaryKey,
  Property,
  Collection,
  ManyToMany,
} from "mikro-orm";
import { ObjectType, Field, ID } from "type-graphql";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

  @Field(() => Date)
  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => Date)
  @Property()
  createdAt = new Date();

  @Field()
  @Property()
  userName!: string;

  @Field(() => [User])
  @ManyToMany()
  friends: Collection<User> = new Collection<User>(this);
}
