import AppError from '@shared/errors/AppError';

import FakeAthleteRepository from '@modules/athletes/repositories/fakes/FakeAthleteRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateAthleteService from './CreateAthleteService';

enum Athlete {
  name = 'john',
  surname = 'Doue',
  email = 'johndue@gmail',
  password = '12345',
  sexo = 1,
}

let fakeAthleteRepository: FakeAthleteRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createAthlete: CreateAthleteService;

describe('CreateAthlete', () => {
  beforeEach(() => {
    fakeAthleteRepository = new FakeAthleteRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createAthlete = new CreateAthleteService(
      fakeAthleteRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it.only('should be able to create a new athlete', async () => {
    const athlete = await createAthlete.execute(Athlete);

    expect(athlete).toHaveProperty('id');
  });

  //   it('should not be able to create a new user with same email from another', async () => {
  //     await createUser.execute({
  //       name: 'John',
  //       surname: 'Doe',
  //       sexo: 0,
  //       email: 'johndoe@example.com',
  //       password: '123456',
  //     });

  //     await expect(
  //       createUser.execute({
  //         name: 'John',
  //         surname: 'Doe',
  //         sexo: 0,
  //         email: 'johndoe@example.com',
  //         password: '123456',
  //       }),
  //     ).rejects.toBeInstanceOf(AppError);
  //   });
});
