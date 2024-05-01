import { Flex } from '@/ui/Flex';
import PageTitle from '@/ui/PageTitle';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled(Flex.Column)`
  padding: 0 1.5rem;
  padding-bottom: 1.5rem;
  gap: 1rem;
`;
const PageBody = styled(Flex.Column)`
  gap: 1rem;
`;

const PageOption = styled.button`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.sectionBg};
  padding: 1rem;
  font-weight: 600;
  text-align: center;
`;

export default function ManageVocabularyPage() {
  return (
    <PageContainer>
      <PageTitle>Manage vocabulary</PageTitle>
      <PageBody>
        <PageOption as={Link} to="add-word">
          Add a word
        </PageOption>
        <PageOption as={Link} to="edit-word">
          Edit a word
        </PageOption>
      </PageBody>
    </PageContainer>
  );
}
