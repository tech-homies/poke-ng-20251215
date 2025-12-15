export interface TrainerDTO {
  id: number;
  name: string;
  age: number;
  hometown: string;
}

export type CreateTrainerDTO = Omit<TrainerDTO, 'id'>;
