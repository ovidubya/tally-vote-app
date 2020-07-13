import { getRepository, Repository, Connection } from "typeorm";
import { User } from "../../../database/entity/User";
import { PassThrough } from "stream";

type CreateUserDto = {
  user: string;
  vote: {
    repo: string;
    name: string;
  };
};

export class UserService {
  public repo: Repository<User>;
  constructor(connection: Connection) {
    this.initRepo(connection);
  }
  private async initRepo(connection: Connection) {
    this.repo = await connection.getRepository(User);
  }

  async getAll(): Promise<User[]> {
    return await this.repo.find({ relations: ["vote"] });
  }

  async add(payload: CreateUserDto): Promise<void> {
    let user = await this.repo.create({
      email: payload.user,
      vote: {
        name: payload.vote.name,
        repo: payload.vote.repo,
      },
    });
    console.log("what is user");
    console.log(user);
    await this.repo.save(user);
  }
}
