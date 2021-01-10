export default interface ICreateExerciceDTO {
  name: string;
  muscle_group_id: number;
  muscle_group_name: string;
  duration?: number;
  calorie?: number;
  youtube_video_id?: string;
  trainer_id: string;
}
