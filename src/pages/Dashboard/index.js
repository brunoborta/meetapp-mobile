import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  Title,
  MeetupList,
  Meetup,
  Banner,
  Infos,
  MeetupTitle,
  Info,
  SubscribeButton,
} from './styles';

import { host } from '~/utils';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    async function loadMeetups() {
      try {
        const response = await api.get('/meetups', {
          params: { date },
        });
        const data = response.data.map(meetup => {
          meetup.bannerUrl = meetup.banner.url.replace(/localhost/gi, host);
          return meetup;
        });

        console.tron.log(data);
        setMeetups(data);
      } catch (err) {
        Alert.alert('Erro ao carregar meetups', err.message);
      }
    }
    loadMeetups();
  }, [date]);

  return (
    <Background>
      <Container>
        <Header />
        <Title>31 de Maio</Title>
        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup past={item.past}>
              <Banner source={{ uri: item.bannerUrl }} />
              <Infos>
                <MeetupTitle>{item.name}</MeetupTitle>
                <Info>24 de junho, às 20h</Info>
                <Info>{item.location}</Info>
                <Info>Organizador: {item.organizer.name}</Info>
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
};
