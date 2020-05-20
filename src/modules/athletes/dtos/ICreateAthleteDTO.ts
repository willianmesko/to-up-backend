export default interface ICreateAthleteDTO {
  name: string;
  email: string;
  password: string;

  trainer_id: string;
  sexo: boolean;
  age: number;
  body_mass: number;
  stature: number;
  aerobic_profile: number;
  training_level: number;
  physical_activity: number;
  objective: number;
  basal_metabolic_rate: number;
  spent_daily_train: number;
  mass_muscle: number;
  mass_fat: number;
  personal_profile: number;
  imc: number;
}
