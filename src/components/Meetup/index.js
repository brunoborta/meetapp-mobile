import React, { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { host } from '~/utils';

import {
  Container,
  Banner,
  Infos,
  MeetupTitle,
  Info,
  InfoText,
  SubscribeButton,
} from './styles';

export default function Meetup({ data: item, onPress, buttonLabel }) {
  const bannerUrl = useMemo(
    () => item.banner.url.replace(/localhost/gi, host),
    [item.banner]
  );

  const formattedDate = useMemo(
    () =>
      format(parseISO(item.date), "d 'de' MMMM, 'às' HH'h'", { locale: pt }),
    [item.date]
  );
  return (
    <Container past={item.past}>
      <Banner source={{ uri: bannerUrl }} />
      <Infos>
        <MeetupTitle>{item.name}</MeetupTitle>
        <Info>
          <Icon name="event" size={15} color="#999" />
          <InfoText>{formattedDate}</InfoText>
        </Info>
        <Info>
          <Icon name="place" size={15} color="#999" />
          <InfoText>{item.location}</InfoText>
        </Info>
        <Info>
          <Icon name="person" size={15} color="#999" />
          <InfoText>Organizador: {item.organizer.name}</InfoText>
        </Info>
        {!item.past && (
          <SubscribeButton onPress={onPress}>{buttonLabel}</SubscribeButton>
        )}
      </Infos>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape().isRequired,
  onPress: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};
