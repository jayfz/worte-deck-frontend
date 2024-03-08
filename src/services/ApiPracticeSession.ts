import { GameResults } from '@/features/practice-session/GameContext';
import axios from '@/services/axiosDefaults';

import { AppRestResponse, CreatedPracticeSession, PagedAppRestResponse, Word } from '@/types/domainTypes';

export async function getPracticeSessionWords(practiceSessionId: number, pageNumber = 0) {
  const { data } = await axios.get<PagedAppRestResponse<Word[]>>(
    `/practice-sessions/${practiceSessionId}?page=${pageNumber}&size=2`,
  );

  return data;
}

export async function createPracticeSession() {
  const { data } = await axios.post<AppRestResponse<CreatedPracticeSession>>('/practice-sessions');

  return data.payload.practiceSessionId;
}

export async function postPracticeSessionResults(results: GameResults) {
  const { data } = await axios.post<AppRestResponse<string>>('/practice-sessions/results', results);

  return data.payload;
}
