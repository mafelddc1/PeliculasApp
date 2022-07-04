import React, { useEffect } from 'react'
import Carousel from 'react-native-snap-carousel';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native'
import { useMovies } from '../hooks/useMovies';
import { MoviePoster } from '../components/MoviePoster';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { HorizontalSlider } from '../components/HorizontalSlider';

const {width:windowWidth}=Dimensions.get('window')
export const HomeScreen = () => {
  
  const {nowPlaying, isLoading,popular,topRated,upComing} = useMovies();

    if(isLoading){
      return(
        <View style={{flex:1 , justifyContent: 'center', alignContent:'center'}}>
          <ActivityIndicator color='red' size={100}/>
        </View>
      )
    }

  return ( //renderitem manda a llamaru na funcion la cual yo quiero renderizar
  //el carusel sirve para poder pasar las imaganes de un lado a otro.
  //para colocar la lista de peliculas es necesario saber que moviePoster tiene la propiedad
  //de movie y movie es una interface que tiene en su propiedad el path.
  

    <ScrollView>
   <View>
        {/* carusel principal */}
        <View style={{height:440}}>
        <Carousel
        data={nowPlaying}
        renderItem={({item}:any)=> <MoviePoster movie={item} />}
        sliderWidth={windowWidth}
        itemWidth={300}
        
        />
        </View>

{/* carusel de las mas polulares */}
<HorizontalSlider title='Peliculas Populares' movies={popular}/>
<HorizontalSlider title='Peliculas en cine' movies={nowPlaying}/>
<HorizontalSlider title='Peliculas top' movies={topRated}/>
<HorizontalSlider title='Peliculas por estrenar' movies={upComing}/>



    </View>
  </ScrollView>
  )
}