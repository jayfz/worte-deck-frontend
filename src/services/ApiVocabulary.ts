import axios from '@/services/axiosDefaults';
import { AppRestResponse, PagedAppRestResponse, VocabularyWord, Word } from '@/types/domainTypes';

export async function getVocabularyWords(text: string, wordType: string | null, pageParam: number) {
  const { data } = await axios.get<PagedAppRestResponse<VocabularyWord[]>>(
    `/words/search?word=${text}&wordType=${wordType}&page=${pageParam}`,
  );

  return data;
}

export async function getKnownWords(text: string) {
  const { data } = await axios.get<AppRestResponse<Word[]>>(`/words/search/complete?word=${text}`);

  return data.payload;
}

export async function getDictionaryWords(text: string) {
  const { data } = await axios.get<PagedAppRestResponse<Word[]>>(`/words/search/raw?word=${text}`);

  return data.payload;
}

export async function postCreateWord(word: Word) {
  console.log('we received', word);
  const { data } = await axios.post<AppRestResponse<Word>>('/words', word);

  return data.payload;
}

export async function putUpdateWord(word: Record<string, any>, wordId: number) {
  const { data } = await axios.put<AppRestResponse<Word>>(`/words/${wordId}`, word);

  return data.payload;
}
