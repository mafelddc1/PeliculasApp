//este acrhivo va a centralizar todas mis peticiones 

import axios from 'axios';

//creacion de peticion
const movieDB = axios.create({
    baseURL:'https://api.themoviedb.org/3/movie',
    params:{
        api_key:'52e0166c835a4dde23b38c301c5f9556',
        language:'es-ES'
    }
})

export default movieDB;