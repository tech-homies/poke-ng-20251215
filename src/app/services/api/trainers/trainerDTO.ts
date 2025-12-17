export interface TrainerDTO {
  id: number;
  name: string;
  age: number;
  hometown: string;
  description: string;
  avatarUrl: string;
}

export type CreateTrainerDTO = Omit<TrainerDTO, 'id'>;
