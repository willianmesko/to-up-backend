import { uuid } from 'uuidv4';

import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
import ICreateAthleteDTO from '@modules/athletes/dtos/ICreateAthleteDTO';

import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';

class FakeAthleteRepository implements IAthletesRepository {
  private athletes: Athlete[] = [];

  public async findById(id: string): Promise<Athlete | undefined> {
    // const findUser = this.users.find(user => user.id === id);
    // return findUser;
  }

  public async findByEmail(email: string): Promise<Athlete | undefined> {
    // const findUser = this.users.find(user => user.email === email);
    // return findUser;
  }

  public async findAll(except_user_id: string): Promise<Athlete[]> {
    // let { users } = this;
    // if (except_user_id) {
    //   users = this.users.filter(user => user.id !== except_user_id);
    // }
    // return users;
  }

  public async create(athleteData: ICreateAthleteDTO): Promise<Athlete> {
    const athlete = new Athlete();

    Object.assign(athlete, { id: uuid() }, athleteData);

    this.athletes.push(athlete);

    return athlete;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeAthleteRepository;
