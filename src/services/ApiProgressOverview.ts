import axios from '@/services/axiosDefaults';
import {
  AppRestResponse,
  DifficultWord,
  PracticeSessionResultSummary,
  PracticeSessionStats,
  WordStats,
} from '@/types/domainTypes';

export async function getWordStats() {
  const { data } = await axios.get<AppRestResponse<WordStats>>('/words/stats/words-learnt');

  return data.payload;
}

export async function getPracticeSessionStats() {
  const { data } = await axios.get<AppRestResponse<PracticeSessionStats>>('/practice-sessions/results/stats/overall');

  return data.payload;
}

export async function getMostDifficultWords() {
  const { data } = await axios.get<AppRestResponse<DifficultWord[]>>(
    '/practice-sessions/results/stats/most-difficult-words',
  );

  return data.payload;
}

export async function getPracticeSessionResultSummary() {
  const { data } = await axios.get<AppRestResponse<PracticeSessionResultSummary[]>>(
    '/practice-sessions/results/summary',
  );

  return data.payload;
}
