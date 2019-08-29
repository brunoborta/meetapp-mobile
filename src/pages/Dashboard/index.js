import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { format, parseISO, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  Controls,
  Title,
  MeetupList,
  Meetup,
  Banner,
  Infos,
  MeetupTitle,
  Info,
  SubscribeButton,
  InfoText,
} from './styles';

import { host } from '~/utils';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMeetups() {
      try {
        const response = await api.get('/meetups', {
          params: { date },
        });
        const data = response.data.map(meetup => {
          meetup.bannerUrl = meetup.banner.url.replace(/localhost/gi, host);
          meetup.formattedDate = format(
            parseISO(meetup.date),
            "d 'de' MMMM, 'às' HH'h'",
            { locale: pt }
          );
          return meetup;
        });
        setMeetups(data);
      } catch (err) {
        Alert.alert('Erro ao carregar meetups', err.message);
      }
    }
    loadMeetups();
  }, [date]);

  function incrementDay() {
    setDate(addDays(date, 1));
  }
  function decrementDay() {
    setDate(subDays(date, 1));
  }

  return (
    <Background>
      <Container>
        <Header />
        <Controls>
          <TouchableOpacity onPress={decrementDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <Title>{format(date, "d 'de' MMMM", { locale: pt })}</Title>
          <TouchableOpacity onPress={incrementDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </Controls>
        <MeetupList
          data={meetups}
          // onEndReachedThreshold={0.2}
          // onEndReached={this.loadMore}
          // onRefresh={this.refreshList}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup past={item.past}>
              <Banner source={{ uri: item.bannerUrl }} />
              <Infos>
                <MeetupTitle>{item.name}</MeetupTitle>
                <Info>
                  <Icon name="event" size={15} color="#999" />
                  <InfoText>{item.formattedDate}</InfoText>
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
                  <SubscribeButton onPress={() => {}}>
                    Realizar Inscrição
                  </SubscribeButton>
                )}
              </Infos>
            </Meetup>
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
