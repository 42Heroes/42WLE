import styled from 'styled-components';
import LanguageDropdown from '../../components/common/LanguageDropdown';
import Button from '../../components/common/Button';

interface Props {
  question: string;
}

export default function SelectLanguage({ question }: Props) {
  return (
    <Container>
      <Titlebox>{question}</Titlebox>
      <LanguageDropdown />
      <StyledButton type="button" size="medium" color="blue">
        NEXT
      </StyledButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Titlebox = styled.h1`
  color: ${({ theme }) => theme.fontColor.titleColor};
  font-size: 4.8rem;
  margin-bottom: 3rem;
  line-height: 8rem;
  padding-right: 2rem;
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.pointColor};
  border-radius: 1rem;
  padding: 0 10rem 0 10rem;
`;