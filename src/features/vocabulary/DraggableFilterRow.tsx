import { WordType } from '@/types/domainTypes';
import { Flex } from '@/ui/Flex';
import { PropsWithChildren } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

export const FilterRow = styled(Flex.Row)`
  overflow-x: auto;
  gap: 0.5rem;
`;

const FilterPillContainer = styled.button<{ $active: boolean }>`
  padding: 2px 1rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => (props.$active ? 'orange' : props.theme.sectionBg)};
  font-weight: ${(props) => (props.$active ? '600' : '400')};
  color: ${(props) => (props.$active ? 'white' : 'inherit')};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  white-space: nowrap;
`;

type FilterPillProps = {
  $by: WordType;
};
export function FilterPill(props: PropsWithChildren<FilterPillProps>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterBy = searchParams.get('filterByWordType');

  const updateFilterText = (text: string) => {
    setSearchParams({ filterByWordType: filterBy == text ? 'ALL' : text });
  };

  return (
    <FilterPillContainer $active={props.$by == filterBy} onClick={() => updateFilterText(props.$by)}>
      {props.children}
    </FilterPillContainer>
  );
}
