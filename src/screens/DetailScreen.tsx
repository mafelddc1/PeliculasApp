import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../components/MoviePoster';
import { RootStackParams } from '../navigation/Navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieFull } from '../interfaces/movieInterface';
import { MovieDetails } from '../components/MovieDetails';
const screenHeight = Dimensions.get('screen').height;
//para poder recibir el argumento movie, es necesario mapear las props.
//se extiende de StackScreenProps que me entrega parte de la navegacion la cual le indica
//que tipo de parametros reciben nuestras pages, por lo que aqui le indicamos que es de tipo rootStack hacia DetailScreen
interface Props extends StackScreenProps<RootStackParams,'DetailScreen'>{}


export const DetailScreen = ({route}:Props) => {
  const movie = route.params;//con esto podemos ver que movie es de tipo Movie dado que a la page details le dijimos que seria tipo Movie

  const uri= `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const{isLoading,movieFull,cast}= useMovieDetails(movie.id)
  

  return (

    <ScrollView>

    <View style={{width:'100%', height:screenHeight*0.7}}>
    <Image source={{uri}} style={styles.image}/>
    </View>

    <View style={{marginHorizontal:20, marginTop:20}}>
      <Text style={{fontSize:16, opacity:0.6}}>{movie.original_title}</Text>
      <Text style={{fontSize:16, fontWeight:'bold'}}>{movie.title}</Text>

    </View>

    <View style={{marginHorizontal:20, marginTop:20}}>
     {isLoading ? <ActivityIndicator size={35} color='grey' style={{marginTop:20}} />
      : <MovieDetails movieFull={movieFull!}/>
    }
     
    </View>





    </ScrollView>
  )
}
