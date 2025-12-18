import { TrainerDTO } from './trainerDTO';

export interface TrainerWithRank extends TrainerDTO {
  rank: number;
  points: number;
  wins: number;
  losses: number;
}
