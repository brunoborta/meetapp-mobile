import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  margin-top: 50px;
  align-self: stretch;
  justify-content: center;
`;

export const Anchor = styled.TouchableOpacity`
  margin-top: 20px;
  align-self: center;
`;
export const AnchorText = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-weight: bold;
  font-size: 16px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;
