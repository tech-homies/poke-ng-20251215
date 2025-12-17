import { TrainerLevel } from './trainerDTO';

export const trainerLevels: { value: TrainerLevel; label: string }[] = [
  { value: 'beginner', label: '🌱 Débutant' },
  { value: 'intermediate', label: '⚡ Intermediaire' },
  { value: 'advanced', label: '🔥 Avancé' },
  { value: 'master', label: '👑 Maitre Pokémon' },
];
