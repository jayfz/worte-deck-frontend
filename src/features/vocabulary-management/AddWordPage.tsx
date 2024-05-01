import useCreateWord from '@/features/vocabulary-management/useCreateWord';
import useDictionaryWords from '@/features/vocabulary-management/useDictionaryWords';
import useKnownWords from '@/features/vocabulary-management/useKnownWords';
import useUpdateWord from '@/features/vocabulary-management/useUpdateWord';
import { Adjective, BaseWord, NounGender, Word, WordType } from '@/types/domainTypes';
import { Button } from '@/ui/Button';
import { Flex } from '@/ui/Flex';
import PageTitle from '@/ui/PageTitle';
import { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled(Flex.Column)`
  padding: 0 1.5rem;
  padding-bottom: 1.5rem;
  gap: 1rem;
`;
const PageBody = styled(Flex.Column)`
  gap: 1rem;
`;

const Select = styled.select``;

const InputText = styled.input``;

type NounInputs = {
  word: string;
  gender: NounGender;
  plural: string;
  englishTranslations: string;
  germanExample: string;
  englishExample: string;
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${(props) => props.theme.sectionBg};
  padding: 1rem;
  border-radius: 1rem;

  border: 1px solid ${(props) => props.theme.borderColor};
  & > select,
  & > input {
    margin-bottom: 0.5rem;
    /* height: 2rem; */
    background-color: ${(props) => props.theme.bg};
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 0.5rem;
    padding: 0.5rem 0.5rem;
    color: ${(props) => props.theme.formInputText};
  }
`;

type AddNounFormProps = {
  nounPlural: string;
  setNounPlural: (value: string) => void;
  nounGender: NounGender | null;
  setNounGender: (value: NounGender | null) => void;
};

function AddNounForm(props: AddNounFormProps) {
  return (
    <>
      <label htmlFor="plural">Plural</label>
      <InputText id="plural" value={props.nounPlural} onChange={(e) => props.setNounPlural(e.target.value)} />

      <label htmlFor="gender">Gender</label>
      <Select
        id="gender"
        value={props.nounGender == null ? 'default' : props.nounGender}
        onChange={(e) => props.setNounGender(e.target.value == 'default' ? null : (e.target.value as NounGender))}
      >
        <option value="default">Select a value</option>
        <option value="MASCULINE">Masculine</option>
        <option value="FEMENINE">Femenine</option>
        <option value="NEUTER">Neuter</option>
      </Select>
    </>
  );
}

const WordMatchSelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  border: 1px solid ${(props) => props.theme.sortingPillBorderHighlited};
  border-radius: 0.5rem;
  padding: 0.25rem 0.25rem;
  flex-wrap: wrap;
`;

type WordMatchSelectorProps = {
  phrase: string;
  matches: Set<string>;
  onMatchClick: (match: string) => void;
};

const SelectorSpan = styled.span<{ $highlight: boolean }>`
  background-color: ${(props) => (props.$highlight ? props.theme.sortingPillBorderHighlited : 'inherit')};
  color: ${(props) => (props.$highlight ? props.theme.sortingPillBackgroundHighlated : 'inherit')};
  padding: 0.125rem 0.25rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
`;
function WordMatchSelector(props: WordMatchSelectorProps) {
  return (
    <WordMatchSelectorContainer>
      {props.phrase.split(' ').map((item, index) => {
        return (
          <SelectorSpan
            role="button"
            aria-label="span-selector"
            $highlight={props.matches.has(item)}
            key={`${item}:${index}`}
            onClick={() => props.onMatchClick(item)}
          >
            {item}
          </SelectorSpan>
        );
      })}
    </WordMatchSelectorContainer>
  );
}

type AddAdjectiveFormProps = {
  adjectiveComparable: boolean | null;
  setAdjectiveComparable: (value: boolean) => void;
  adjectiveComparative: string;
  setAdjectiveComparative: (value: string) => void;
  adjectiveSuperlative: string;
  setAdjectiveSuperlative: (value: string) => void;
};

function AddAdjectiveForm(props: AddAdjectiveFormProps) {
  return (
    <>
      <label htmlFor="isComparable">Is Comparable</label>
      <Select
        id="isComparable"
        value={props.adjectiveComparable?.toString() || 'default'}
        onChange={(e) => props.setAdjectiveComparable(e.target.value == 'true')}
      >
        <option value="default">Select an option</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </Select>
      {props.adjectiveComparable && (
        <>
          <label htmlFor="comparative">Comparative</label>
          <InputText
            id="comparative"
            value={props.adjectiveComparative == null ? '' : props.adjectiveComparative}
            onChange={(e) => props.setAdjectiveComparative(e.target.value)}
          />
          <label htmlFor="superlative">Superlative</label>
          <InputText
            id="superlative"
            value={props.adjectiveSuperlative == null ? '' : props.adjectiveSuperlative}
            onChange={(e) => props.setAdjectiveSuperlative(e.target.value)}
          />
        </>
      )}
    </>
  );
}

type AddVerbFormProps = {
  verbIsRegular: boolean | null;
  setVerbIsRegular: (value: boolean | null) => void;
  verbIsSeparable: boolean | null;
  setVerbIsSeparable: (value: boolean | null) => void;
  verbHasPrefix: boolean | null;
  setVerbHasPrefix: (value: boolean | null) => void;
};

function AddVerbForm(props: AddVerbFormProps) {
  return (
    <>
      <label htmlFor="isRegular">Regular</label>
      <Select
        id="isRegular"
        value={props.verbIsRegular == null ? 'default' : props.verbIsRegular.toString()}
        onChange={(e) => props.setVerbIsRegular(e.target.value == 'default' ? null : e.target.value == 'true')}
      >
        <option value="default">Select an option</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </Select>

      <label htmlFor="isSeparable">Separable</label>
      <Select
        id="isSeparable"
        value={props.verbIsSeparable == null ? 'default' : props.verbIsSeparable.toString()}
        onChange={(e) => props.setVerbIsSeparable(e.target.value == 'default' ? null : e.target.value == 'true')}
      >
        <option value="default">Select an option</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </Select>
      <label htmlFor="hasPrefix">Has Prefix</label>
      <Select
        id="hasPrefix"
        value={props.verbHasPrefix == null ? 'default' : props.verbHasPrefix.toString()}
        onChange={(e) => props.setVerbHasPrefix(e.target.value == 'default' ? null : e.target.value == 'true')}
      >
        <option value="default">Select an option</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </Select>
    </>
  );
}

const WordOptionItem = styled.li``;

const WordOptions = styled.ul``;

type MutateWordPage = {
  action: 'create' | 'update';
};

export default function AddWordPage(props: MutateWordPage) {
  const [id, setId] = useState<number>(-1);
  const [word, setWord] = useState<string>('');
  const [wordType, setWordType] = useState<WordType>('NOUN');
  const [pronunciations, setPronunciations] = useState<string>('');
  const [englishTranslations, setEnglishTranslations] = useState<string>('');
  const [nounGender, setNounGender] = useState<NounGender | null>(null);
  const [nounPlural, setNounPlural] = useState<string>('');
  const [adjectiveComparable, setAdjectiveComparable] = useState<boolean | null>(null);
  const [adjectiveComparative, setAdjectiveComparative] = useState<string>('');
  const [adjectiveSuperlative, setAdjectiveSuperlative] = useState<string>('');
  const [verbIsRegular, setVerbIsRegular] = useState<boolean | null>(true);
  const [verbIsSeparable, setVerbIsSeparable] = useState<boolean | null>(null);
  const [verbHasPrefix, setVerbHasPrefix] = useState<boolean | null>(null);
  const [germanExample, setGermanExample] = useState<string>('');
  const [englishExample, setEnglishExample] = useState<string>('');
  const [matches, setMatches] = useState<Set<string>>(new Set());
  const [isReady, setReady] = useState<boolean | null>(false);
  const [showWordOptions, setShowWordOptions] = useState<boolean>(false);
  const { dictionaryWords, isPendingDictionaryWords } = useDictionaryWords(word, props.action);
  const { knownWords, isPendingKnownWords } = useKnownWords(word, props.action);
  const { createWord, isCreatingWord } = useCreateWord();
  const { updateWord, isUpdatingWord } = useUpdateWord();

  const onSpanSelectorClick = (wordFragment: string) => {
    const setCopy = new Set(matches);
    if (matches.has(wordFragment)) {
      setCopy.delete(wordFragment);
    } else {
      setCopy.add(wordFragment);
    }
    setMatches(setCopy);
  };

  const updateSelectedDictionaryWord = (dictionaryWord: Word) => {
    setWord(dictionaryWord.word);
    setWordType(dictionaryWord.type);
    setPronunciations(dictionaryWord.pronunciations.join(','));
    setEnglishTranslations(dictionaryWord.englishTranslations.join(','));
    setGermanExample(dictionaryWord.germanExample || '');
    setEnglishExample(dictionaryWord.englishExample || '');
    setMatches(new Set(dictionaryWord.matches));
    setId(dictionaryWord.id);
    setReady(dictionaryWord.isReady);
    if (dictionaryWord.type == 'NOUN') {
      setNounGender(dictionaryWord.gender || null);
      setNounPlural(dictionaryWord.plural || '');
    }

    if (dictionaryWord.type == 'ADJECTIVE') {
      setAdjectiveComparable(dictionaryWord.isComparable || null);
      setAdjectiveComparative(dictionaryWord.comparative || '');
      setAdjectiveSuperlative(dictionaryWord.superlative || '');
    }

    if (dictionaryWord.type == 'VERB') {
      setVerbHasPrefix(dictionaryWord.hasPrefix || null);
      setVerbIsRegular(dictionaryWord.isRegular || null);
      setVerbIsSeparable(dictionaryWord.isSeparable || null);
    }
  };

  const createWordHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!word || !pronunciations || !englishTranslations || !germanExample || !englishExample || matches.size == 0) {
      console.log('error');
      return;
    }

    const wordToCreate: Record<string, string | string[] | boolean | null> = {
      word: word,
      type: wordType,
      pronunciations: pronunciations.split(','),
      englishTranslations: englishTranslations.split(','),
      germanExample: germanExample,
      englishExample: englishExample,
      matches: [...matches],
      isReady: isReady == null ? false : isReady,
    };

    if (wordToCreate.type == 'ADJECTIVE') {
      wordToCreate.isComparable = adjectiveComparable;
      wordToCreate.comparative = adjectiveComparative;
      wordToCreate.superlative = adjectiveSuperlative;
    }

    if (wordToCreate.type == 'NOUN') {
      wordToCreate.gender = nounGender;
      wordToCreate.plural = nounPlural;
    }

    if (wordToCreate.type == 'VERB') {
      wordToCreate.isRegular = verbIsRegular;
      wordToCreate.isSeparable = verbIsSeparable;
      wordToCreate.hasPrefix = verbHasPrefix;
    }

    if (props.action == 'create') {
      createWord(wordToCreate as unknown as Word);
    }

    if (props.action == 'update') {
      updateWord({ word: wordToCreate, wordId: id });
    }
  };

  return (
    <PageContainer>
      <PageTitle>{props.action == 'create' ? 'Add a word' : 'Edit a word'}</PageTitle>
      <PageBody>
        <Form onSubmit={createWordHandler}>
          <label htmlFor="word">Word</label>
          <InputText
            id="word"
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
              setShowWordOptions(true);
            }}
            onBlur={() =>
              setTimeout(() => {
                setShowWordOptions(false);
              }, 200)
            }
          />
          <label htmlFor="type"> Select word type</label>
          <Select id="type" value={wordType} onChange={(e) => setWordType(e.target.value as WordType)}>
            <option value="NOUN">Noun</option>
            <option value="ADJECTIVE">Adjective</option>
            <option value="VERB">Verb</option>
            <option value="ADVERB">Adverb</option>
            <option value="COMMON_EXPRESSION">Common Expression</option>
          </Select>

          {showWordOptions && (
            <WordOptions>
              {props.action == 'create' &&
                dictionaryWords?.map((dictionaryWord) => {
                  return (
                    <WordOptionItem
                      key={dictionaryWord.id}
                      onClick={() => updateSelectedDictionaryWord(dictionaryWord)}
                    >
                      {dictionaryWord.word} - {dictionaryWord.type}
                    </WordOptionItem>
                  );
                })}

              {props.action == 'update' &&
                knownWords?.map((knownWord) => {
                  return (
                    <WordOptionItem key={knownWord.id} onClick={() => updateSelectedDictionaryWord(knownWord)}>
                      {knownWord.word} - {knownWord.type}
                    </WordOptionItem>
                  );
                })}
            </WordOptions>
          )}

          {wordType != 'COMMON_EXPRESSION' && (
            <>
              <label htmlFor="pronunciations">Pronunciation</label>
              <InputText
                id="pronunciations"
                value={pronunciations}
                onChange={(e) => setPronunciations(e.target.value)}
              />
            </>
          )}

          <label htmlFor="englishTranslations">Meaning</label>
          <InputText
            id="englishTranslations"
            value={englishTranslations}
            onChange={(e) => setEnglishTranslations(e.target.value)}
          />

          {wordType == 'NOUN' && <AddNounForm {...{ nounGender, nounPlural, setNounGender, setNounPlural }} />}
          {wordType == 'ADJECTIVE' && (
            <AddAdjectiveForm
              {...{
                adjectiveComparable,
                setAdjectiveComparable,
                adjectiveComparative,
                setAdjectiveComparative,
                adjectiveSuperlative,
                setAdjectiveSuperlative,
              }}
            />
          )}
          {wordType == 'VERB' && (
            <AddVerbForm
              {...{
                verbHasPrefix,
                setVerbHasPrefix,
                verbIsRegular,
                setVerbIsRegular,
                verbIsSeparable,
                setVerbIsSeparable,
              }}
            />
          )}
          <label htmlFor="germanExample">German example</label>
          <InputText id="germanExample" value={germanExample} onChange={(e) => setGermanExample(e.target.value)} />
          {germanExample.length != 0 && (
            <WordMatchSelector phrase={germanExample} matches={matches} onMatchClick={onSpanSelectorClick} />
          )}

          <label htmlFor="englishExample">English example</label>
          <InputText id="englishExample" value={englishExample} onChange={(e) => setEnglishExample(e.target.value)} />
          <Button $variant="primary" type="submit" disabled={isCreatingWord}>
            Submit
          </Button>
        </Form>
      </PageBody>
    </PageContainer>
  );
}
