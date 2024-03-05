import { GameContext } from '@/features/practice-session/GameContext';
import { useContext } from 'react';

export default function useGameContext() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGameContext needs to be used within <GameContext.Provider>');
  }

  return context;
}
