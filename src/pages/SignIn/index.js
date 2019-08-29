import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Background from '~/components/Background';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  Anchor,
  AnchorText,
  FormInput,
  SubmitButton,
} from './styles';

function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function submit() {
    dispatch(signInRequest(email, password));
  }
  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            placeholder="Digite seu e-mail"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            keyboardType="email-address"
            onSubmitEditing={() => passwordRef.current.focus()}
            returnKeyType="next"
            onChangeText={setEmail}
            value={email}
          />
          <FormInput
            placeholder="Sua senha secreta"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            ref={passwordRef}
            onSubmitEditing={submit}
            onChangeText={setPassword}
            value={password}
            returnKeyType="send"
          />
          <SubmitButton onPress={submit}>Entrar</SubmitButton>
        </Form>
        <Anchor onPress={() => navigation.navigate('SignUp')}>
          <AnchorText>Criar conta grátis</AnchorText>
        </Anchor>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default SignIn;
