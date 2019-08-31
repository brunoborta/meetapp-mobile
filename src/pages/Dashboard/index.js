import React, { useEffect, useState, useCallback } from 'react';
import { Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, Controls, Title, MeetupList } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const refreshing = false;

  const loadMeetups = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/meetups', {
        params: { date, page: 1 },
      });
      setMeetups(response.data);
    } catch (err) {
      Alert.alert('Erro ao carregar meetups', err.response.data.error);
    }
    setLoading(false);
    setPage(1);
  }, [date]);

  async function loadMore() {
    setLoading(true);
    try {
      const response = await api.get('/meetups', {
        params: { date, page: page + 1 },
      });
      setMeetups([...meetups, ...response.data]);
    } catch (err) {
      Alert.alert('Erro ao carregar meetups', err.response.data.error);
    }
    setPage(page + 1);
    setLoading(false);
  }

  async function subscribe(id) {
    setLoading(true);
    try {
      await api.post(`meetups/${id}/subscriptions`);
      Alert.alert('Sucesso', 'Você se inscreveu nesta meetup com sucesso!');
    } catch (err) {
      Alert.alert('Erro ao inscrever-se na meetup', err.response.data.error);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadMeetups();
  }, [date, loadMeetups]);

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
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              buttonLabel="Realizar Inscrição"
              data={item}
              onPress={() => subscribe(item.id)}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          onRefresh={loadMeetups}
        />
        {loading && <ActivityIndicator size="small" color="#fff" />}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
