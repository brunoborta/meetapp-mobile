import React from 'react';
import { Image } from 'react-native';

import Background from '~/components/Background';
import Button from '~/components/Button';
import Input from '~/components/Input';

import logo from '~/assets/logo.png';

import { Container, Form } from './styles';

export default function SignIn() {
  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <Input placeholder="Digite seu e-mail" />
          <Button>Entrar</Button>
        </Form>
      </Container>
    </Background>
  );
}
