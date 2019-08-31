import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
  Separator,
  ErrorText,
} from './styles';

function Profile() {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const name = useSelector(state => state.user.name);
  const email = useSelector(state => state.user.email);

  const schema = yup.object().shape({
    name: yup.string().required('O campo nome é obrigatório'),
    email: yup
      .string()
      .email('O e-mail deve ser válido')
      .required('O campo e-mail é obrigatório'),
    oldPassword: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres'),
    password: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .when('oldPassword', (oldPassword, password) => {
        return oldPassword ? password.required() : password;
      }),
    confirmPassword: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .when('password', (password, confirmPassword) => {
        return password
          ? confirmPassword.required().oneOf([yup.ref('password')])
          : confirmPassword;
      }),
  });

  function submit(data) {
    dispatch(updateProfileRequest(data));
  }
  function logout() {
    dispatch(signOut());
  }
  return (
    <Background>
      <SafeAreaView>
        <Header />
      </SafeAreaView>
      <Container>
        <Formik
          initialValues={{ name, email }}
          onSubmit={submit}
          validationSchema={schema}
        >
          {({ values, touched, errors, handleSubmit, handleChange }) => (
            <Form>
              <FormInput
                value={values.name}
                name="name"
                onChangeText={handleChange('name')}
                placeholder="Nome completo"
                autoCapitalize="words"
                autoCorrect={false}
                onSubmitEditing={() => emailRef.current.focus()}
                returnKeyType="next"
              />
              {touched.name && errors.name && (
                <ErrorText>{errors.name}</ErrorText>
              )}

              <FormInput
                value={values.email}
                name="email"
                ref={emailRef}
                onChangeText={handleChange('email')}
                placeholder="Seu e-mail"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {touched.email && errors.email && (
                <ErrorText>{errors.email}</ErrorText>
              )}

              <Separator />

              <FormInput
                placeholder="Sua senha atual"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                ref={oldPasswordRef}
                onSubmitEditing={() => passwordRef.current.focus()}
                onChangeText={handleChange('oldPassword')}
                value={values.oldPassword}
                returnKeyType="next"
              />
              {touched.oldPassword && errors.oldPassword && (
                <ErrorText>{errors.oldPassword}</ErrorText>
              )}

              <FormInput
                placeholder="Nova senha"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                ref={passwordRef}
                onSubmitEditing={() => confirmPasswordRef.current.focus()}
                onChangeText={handleChange('password')}
                value={values.password}
                returnKeyType="next"
              />
              {touched.password && errors.password && (
                <ErrorText>{errors.password}</ErrorText>
              )}

              <FormInput
                placeholder="Confirme a nova senha"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                ref={confirmPasswordRef}
                onSubmitEditing={handleSubmit}
                onChangeText={handleChange('confirmPassword')}
                value={values.confirmPassword}
                returnKeyType="send"
              />
              {touched.password && errors.password && (
                <ErrorText>{errors.password}</ErrorText>
              )}

              <SubmitButton onPress={handleSubmit}>Salvar perfil</SubmitButton>
              <LogoutButton onPress={logout}>Sair do Meetapp</LogoutButton>
            </Form>
          )}
        </Formik>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};

export default Profile;
