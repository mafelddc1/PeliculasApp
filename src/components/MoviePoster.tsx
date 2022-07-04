import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Movie } from '../interfaces/movieInterface';
import { Navigation } from '../navigation/Navigation';

interface Prop {
    movie:Movie;
    width:number;
    height:number;
}

export const MoviePoster = ({movie, width = 300,height = 400}:Prop) => {

    const uri= `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const navigation = useNavigation(); //esta es la manera mas eficiente porque no renderiza nuevamente lo mismo.

  return (

    //el padre(View) puede darle el tamaño de la tarjeta, por lo que podemos agregarle las caracteristicas al padre
    //y luego hacerle un flex a la imagen para que tome el tamaño del padre.
    //cambiamos al padre View por un touchable opacity para poder hacerlo un boton y poder seleccionar
    //el poster y acceder a los detalles de la pelicula.
    //la mando a details y aparte le mando todo el objeto de la movie con el 2do argumento ('Details',movie)
    //y lo recibe la pantalla details.
    <TouchableOpacity
    onPress={()=> navigation.navigate('DetailScreen', movie)}
    activeOpacity={0.8}
    style={{
        width,
        height,
        marginHorizontal:2,
        paddingBottom:20
    }}>


        <View style={styles.imageContainer}>
            <Image 
            source= {{uri}}
            style={styles.image}
            />
        </View>


        
    </TouchableOpacity>
  )
}

export const styles = StyleSheet.create({
    image:{
        flex:1,
        borderRadius:20
    },
    imageContainer:{
        flex:1,
        shadowColor: "#000",
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16
    }
});