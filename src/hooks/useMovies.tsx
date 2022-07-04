import React, { useEffect, useState } from 'react'
import movieDB from '../api/movieDB'
import { MovieDBNowPlaying, Movie } from '../interfaces/movieInterface';

//para hacer multiples peticiones y no realizar muhos useState para cada peticion, lo mejor
//es crear una interface que nos permita grabar los estaos de cada uno.

//Como estaba antes:
// const [PeliculasEnCine, setPeliculasEnCine] = useState<Movie []>([]);
// const [PeliculasPopulares, setPeliculasPopulares] =useState<Movie []>([]);
//   const getMovies = async()=>{

//       const resp_populares = await movieDB.get<MovieDBNowPlaying>('/popular')
//       const resp = await movieDB.get<MovieDBNowPlaying>('/now_playing') // aqui me entrega la respuesta a la api
//       const pelicula = resp.data.results;
//       const populares = resp_populares.data.results;
//       setPeliculasEnCine(pelicula);
//       setPeliculasPopulares(populares);


interface MovieState{
  nowPlaying:Movie[];
  popular:Movie[];
  topRated:Movie[];
  upComing:Movie[];


}

export const useMovies = () => {


    const [isLoading, setisLoading] = useState(true);


    //Es de tipo movieState porque me interesa el contenido del intergace
    const [MovieState, setMovieState] = useState<MovieState>();
    const getMovies = async()=>{


 // aqui me entrega la respuesta a la api
 //sin declararlas como constantes tenemos promesas, por lo que el then es quien dispara la peticion.
        const nowPlayingPromise = movieDB.get<MovieDBNowPlaying>('/now_playing');
        const popularPromise = movieDB.get<MovieDBNowPlaying>('/popular');
        const topRatedPromise  = movieDB.get<MovieDBNowPlaying>('/top_rated');
        const upComingPromise= movieDB.get<MovieDBNowPlaying>('/upcoming');

        //dispararar promesas de manera simultanea:
        const response = await Promise.all([ //arreglo de las promesas
        nowPlayingPromise,
        popularPromise,
        topRatedPromise,
        upComingPromise
            ])

            setMovieState({//apuntar a la data y guardarla segun orden de llegada de la promesa
              nowPlaying: response[0].data.results,//es la posicion 0 porque es la primera que ejecute
              popular: response[1].data.results,
              topRated: response[2].data.results,
              upComing: response[3].data.results,
            })
        setisLoading(false);
    } 
            //el use effect va a lanzar la peticion get
    useEffect(() => {
    //llamando a la api
    getMovies();
    },[])
    
      return {
          ...MovieState,
          isLoading,
          
  }
    
}
