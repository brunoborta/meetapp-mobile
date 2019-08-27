import React, { useRef, useState } from 'react';
import { Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';

import Background from '~/components/Background';

import logo from '~/assets/logo.png';

import {
  Container,
  Form,
  Anchor,
  AnchorText,
  FormInput,
  SubmitButton,
} from './styles';

function SignIn({ navigation }) {
  const passwordRef = useRef();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Digite um e-mail válido')
      .required('Preencha o campo de e-mail'),
    password: yup
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('Preencha o campo de senha'),
  });

  function submit() {}
  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            placeholder="Digite seu e-mail"
            autoCapitalize="none"
            autoCorrect="false"
            autoFocus="true"
            keyboardType="email-address"
            onSubmitEditing={() => passwordRef.current.focus()}
            returnKeyType="next"
            onChange={setEmail}
            value={email}
          />
          <FormInput
            placeholder="Sua senha secreta"
            autoCapitalize="none"
            autoCorrect="false"
            secureTextEntry
            ref={passwordRef}
            onSubmitEditing={submit}
            onChange={setPassword}
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
