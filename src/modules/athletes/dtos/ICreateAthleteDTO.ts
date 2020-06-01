import Training from '@modules/training/infra/typeorm/entities/Training';

export default interface ICreateAthleteDTO {
  name: string;
  email: string;

  age: number;
  password: string;
  trainer_id: string;
  trainings?: Training[];
  sexo: number;
  body_mass: number;
  stature: number;
  aerobic_profile: number;
  training_level: number;
  physical_activity: number;
  objective: number;
  basal_metabolic_rate: number | undefined;

  imc: number | undefined;
}
