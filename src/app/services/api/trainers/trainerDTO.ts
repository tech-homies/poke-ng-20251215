export type TrainerLevel = 'beginner' | 'intermediate' | 'advanced' | 'master';

export interface TrainerDTO {
  id: number;
  name: string;
  age: number;
  hometown: string;
  description: string;
  avatarUrl: string;
  level: TrainerLevel;
  favoritePokemon?: number;
}

export type CreateTrainerDTO = Omit<TrainerDTO, 'id'>;
