import { EntityManager, IDatabaseDriver, Connection } from "mikro-orm";

export type AppContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};
