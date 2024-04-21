import axios from '@/services/axiosDefaults';
import { PagedAppRestResponse, VocabularyWord } from '@/types/domainTypes';

export async function getVocabularyWords(text: string, wordType: string | null, pageParam: number) {
  const { data } = await axios.get<PagedAppRestResponse<VocabularyWord[]>>(
    `/words/search?word=${text}&wordType=${wordType}&page=${pageParam}`,
  );

  return data;
}
