import { Alert } from 'react-native';
import { takeLatest, all, put, call } from 'redux-saga/effects';

import api from '~/services/api';

import { signFailure, signInSuccess } from './actions';

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    Alert.alert(
      'Conta criada com sucesso.',
      'Ja é possível se logar no Meetapp!'
    );
  } catch (err) {
    Alert.alert(
      'Erro ao criar sua conta.',
      'Verifique seus dados e tente novamente!'
    );
    yield put(signFailure());
  }
}

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    // Adiciona o token nos headers de todas as chamadas
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Erro ao logar na sua conta.',
      'Verifique seus dados e tente novamente!'
    );
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${payload.auth.token}`;
  }
}

export default all([
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('persist/REHYDRATE', setToken),
]);
