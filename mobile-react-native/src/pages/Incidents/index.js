import React, { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import api from '../../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {

  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    loadIncidents();
  }, []);

  async function loadIncidents(){

    if(loading){      
      return;
    }

    if(total > 0 && incidents.length === total){
      return;
    }

    setLoading(true);

    const response = await api.get('incidents',{ params: { page } });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page+1);
    setLoading(false);
  }

  const navigation = useNavigation();

  function navigateToDetail(incident){
    navigation.navigate('Detail', { incident });    
  }

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Image source={logoImg} />

        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList 
          data={incidents} 
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          style={styles.incidentList}           
          keyExtractor={incident => String(incident.id)}
          showsVerticalScrollIndicator={true}
          /* item: incident troca a variavel de nome, item agora é incident*/ 
          renderItem={({ item: incident }) => (

        <View style={styles.incident}>

          <Text style={styles.incidentProperty}>ID:</Text>
          <Text style={styles.incidentValue}>{incident.id}</Text>

          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name}</Text>

          <Text style={styles.incidentProperty}>Caso</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>Valor</Text>
          <Text style={styles.incidentValue}>{Intl.NumberFormat('pr-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

          <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
            <Text style={styles.detailsButtonText}> Ver mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#E02041" />
          </TouchableOpacity>

        </View>

      )} />  

    </View>
  );
}

