import React, { useEffect, useState } from 'react'
import movieDB from '../api/movieDB';
import { MovieFull } from '../interfaces/movieInterface';

interface MovieDetails {
    cast?:any[];
    isLoading:boolean;
    movieFull?:MovieFull;
}

export const useMovieDetails = (movieId:number) => {
 
    const [movieDetails, setMovieDetails] = useState<MovieDetails>({
        isLoading:true,
        movieFull:undefined,
        cast:[]
    });
   

   const getMovieDetails = async ()=>{

      const resp= await movieDB.get<MovieFull>(`/${movieId}`)
      setMovieDetails({
        isLoading:false,  
        movieFull: resp.data,
        cast:[]
    })
   }
   
   useEffect(() => {

    getMovieDetails();
   }, [])
   
return{
    ...movieDetails

}

}
