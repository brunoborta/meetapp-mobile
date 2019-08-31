import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, MeetupList, Title } from './styles';

function Subscriptions({ isFocused, navigation }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);
  async function unsubscribe(id) {
    setLoading(true);
    try {
      await api.delete(`meetups/${id}/subscriptions`);
      Alert.alert('Sucesso', 'Você se desinscreveu da meetup com sucesso!');
    } catch (err) {
      Alert.alert('Erro ao desinscrever-se na meetup', err.response.data.error);
    }
    setLoading(false);
    navigation.navigate('Dashboard');
  }

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);
      try {
        const response = await api.get('/subscriptions');
        setMeetups(response.data);
      } catch (err) {
        Alert.alert('Erro ao carregar meetups', err.response.data.error);
      }
      setLoading(false);
    }
    loadMeetups();
  }, [isFocused]);

  return (
    <Background>
      <Container>
        <Header />
        {meetups.length > 0 ? (
          <MeetupList
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                buttonLabel="Cancelar Inscrição"
                data={item.meetup}
                onPress={() => unsubscribe(item.meetup.id)}
              />
            )}
          />
        ) : (
          <Title>Você não esta inscrito em nenhuma meetup =(</Title>
        )}
        {loading && <ActivityIndicator size="small" color="#fff" />}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
