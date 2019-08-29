import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Background from '~/components/Background';

import logo from '~/assets/logo.png';

import { signUpRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  Anchor,
  AnchorText,
  FormInput,
  SubmitButton,
} from './styles';

function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const emailRef = useRef();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function createAccount() {
    passwordRef.current.blur();
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            placeholder="Digite seu nome completo"
            autoCapitalize="words"
            autoCorrect={false}
            onSubmitEditing={() => emailRef.current.focus()}
            returnKeyType="next"
            onChangeText={setName}
            value={name}
          />
          <FormInput
            placeholder="Digite seu e-mail"
            autoCapitalize="none"
            autoCorrect={false}
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
            onSubmitEditing={createAccount}
            onChangeText={setPassword}
            value={password}
            returnKeyType="send"
          />
          <SubmitButton onPress={createAccount}>Entrar</SubmitButton>
        </Form>
        <Anchor onPress={() => navigation.navigate('SignIn')}>
          <AnchorText>Já tenho conta!</AnchorText>
        </Anchor>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default SignUp;
