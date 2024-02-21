import { useApplicationContext } from '@/context/useApplicationContext';
import useLoginWithEmailAndPassword from '@/features/login/useLoginWithEmailAndPassword';
import useLoginWithGoogle from '@/features/login/useLoginWithGoogle';
import { Flex } from '@/ui/Flex';
import LogoWithText from '@/ui/LogoWithText';
import { GoogleLogin } from '@react-oauth/google';
import { FormEventHandler, PropsWithChildren, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginPageContainer = styled(Flex.Column)`
  padding: 1.25rem;
  margin: auto 0;
  align-items: center;
`;

const LoginBody = styled(Flex.Column)`
  background-color: ${(props) => props.theme.sectionBg};
  padding: 1rem;
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;

  & h1 {
    font-size: 1.5rem;
  }
`;

const AppInternalLink = styled(Link)`
  color: ${(props) => props.theme.linkUnvisitedColor};
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.inputPlaceholderColor};
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;
  padding: 0.625rem;
`;

const PrimaryButton = styled.button`
  background-color: ${(props) => props.theme.primaryTextColor};
  color: ${(props) => props.theme.bg};
  padding: 0.75rem 0;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
`;

const DividerContainer = styled(Flex.Row)`
  align-items: center;
  height: 1.5rem;

  & > hr {
    width: 100%;
    border: 2px solid ${(props) => props.theme.borderColor};
    border-radius: 999rem;
  }

  & > p {
    padding: 0rem 1rem;
    color: ${(props) => props.theme.inputPlaceholderColor};
  }
`;

const PrivacyPolicy = styled.p`
  padding: 1rem 0rem;
  color: ${(props) => props.theme.inputPlaceholderColor};
`;

function Divider({ children }: PropsWithChildren) {
  return (
    <DividerContainer>
      <hr />
      <p>{children}</p>
      <hr />
    </DividerContainer>
  );
}

export default function LoginPage() {
  const { appUser } = useApplicationContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { googleLoginQuery, isPendingGoogleLogin } = useLoginWithGoogle();
  const { regularLoginQuery, isPendingRegularLogin } = useLoginWithEmailAndPassword();

  const onFormSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!email || !password) return;
    regularLoginQuery({ email, password });
  };

  if (appUser) return <Navigate to="/app" replace />;

  return (
    <LoginPageContainer $gap="3rem">
      <LogoWithText />
      <LoginBody $gap="1rem">
        <Flex.Column>
          <h1>Welcome to Worte Deck</h1>
          <p>
            Don't have an account? <AppInternalLink to="/signup">Sign up</AppInternalLink>{' '}
          </p>
        </Flex.Column>

        <Flex.Column as={'form'} action="#" $gap="0.5rem" onSubmit={onFormSubmitHandler}>
          <Input
            type="text"
            placeholder="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <PrimaryButton type="submit" disabled={isPendingGoogleLogin || isPendingRegularLogin}>
            Login
          </PrimaryButton>
        </Flex.Column>
        <AppInternalLink style={{ alignSelf: 'flex-end' }} to="/reset-password">
          Forgot your password?
        </AppInternalLink>
        <Divider>Or</Divider>
        <GoogleLogin
          containerProps={{ style: { display: 'flex', justifyContent: 'center' } }}
          size="large"
          shape="pill"
          onSuccess={(credentials) => googleLoginQuery({ idToken: credentials.credential ?? '' })}
        />
        <PrivacyPolicy>
          By continuing, you agree to Worte Deck's <AppInternalLink to="/terms-of-use">Terms of Use</AppInternalLink>{' '}
          and <AppInternalLink to="/privacy-policy">Privacy Policy</AppInternalLink>
        </PrivacyPolicy>
      </LoginBody>
    </LoginPageContainer>
  );
}
