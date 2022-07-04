import React from 'react'
import { Text, View } from 'react-native';
import { MovieFull } from '../interfaces/movieInterface';
import  Icon  from 'react-native-vector-icons/Ionicons';

interface Props {
    movieFull:MovieFull;
}

export const MovieDetails = ({movieFull}:Props) => {
  console.log(movieFull);
  
  return (
      <>
    <View style={{marginHorizontal:20}}>
        <View style ={{flexDirection:'row'}}>
        <Icon name='star-outline' color='grey'/>
        <Text>{movieFull.vote_average}</Text>
        <Text>-{movieFull.genres.map(g=>g.name).join(',')}</Text>
        </View>
    </View>
            


    <View>
        <Text>{movieFull.overview}</Text>
    </View>
      
      </>
  )
}
