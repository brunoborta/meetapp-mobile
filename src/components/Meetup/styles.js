import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  padding: 10px 0;
  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Banner = styled.Image`
  height: 150px;
  border-radius: 4px;
`;

export const Infos = styled.View`
  background: #fff;
  padding: 20px;
  border-radius: 4px;
`;

export const MeetupTitle = styled.Text`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Info = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;

export const InfoText = styled.Text`
  font-size: 13;
  color: #999;
  margin-left: 5px;
`;

export const SubscribeButton = styled(Button)``;
