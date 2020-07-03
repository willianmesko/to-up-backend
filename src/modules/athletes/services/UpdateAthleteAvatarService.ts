import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IAthletesRepository from '../repositories/IAthletesRepository';

interface IRequest {
  athlete_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateAthleteAvatarService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    athlete_id,
    avatarFilename,
  }: IRequest): Promise<Athlete> {
    const athlete = await this.athletesRepository.findById(athlete_id);

    if (!athlete) {
      throw new AppError('Only authenticated users can change avatar.');
    }

    // deletar avatar anterior
    if (athlete.avatar) {
      await this.storageProvider.deleteFile(athlete.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    athlete.avatar = filename;

    await this.athletesRepository.save(athlete);

    return athlete;
  }
}

export default UpdateAthleteAvatarService;
