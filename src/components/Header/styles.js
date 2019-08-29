import styled from 'styled-components/native';

import logo from '~/assets/logo.png';

export const Container = styled.View`
  background: rgba(0, 0, 0, 0.3);
  height: 64px;

  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})``;
