import { useState,createContext } from "react";
import axios from 'axios';

const LetrasContext = createContext();

const LetrasProvider = ({children}) => {

    const [alert,setAlert] = useState('');
    const [letra,setLetra] = useState('');
    const [cargando,setCargando] = useState(false);
    

    const busquedaLetra = async busqueda => {
      setCargando(true)
      try{
        const { cancion,artista } = busqueda;
        const options = {
            method: 'get',
            url: `https://lyrics-plus.p.rapidapi.com/lyrics/${cancion}/${artista}`,
            headers: {
              'X-RapidAPI-Key': `${import.meta.env.VITE_API_KEY}`,
              'X-RapidAPI-Host': `${import.meta.env.VITE_API_HOST}` 
            }
        };
        const response = await axios(options)
        setLetra(response.data.body.lyrics)
        setAlert('');
      }catch (error){
         console.log('error');
         setAlert('Canción no Encontrada')
         setLetra('');
      }

      setTimeout(() => {
       setCargando(false)   
      },1000);

    }

    return (
        <LetrasContext.Provider
          value={{
              alert,
              setAlert,
              busquedaLetra,
              letra,
              cargando
          }}
        >
            {children}
        </LetrasContext.Provider>
    )
}

export {
    LetrasProvider
}

export default LetrasContext

