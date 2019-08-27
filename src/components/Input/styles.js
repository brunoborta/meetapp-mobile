import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 15px 20px;
  height: 50px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.5)',
})`
  color: #fff;
  font-size: 18px;
  line-height: 21px;
`;
