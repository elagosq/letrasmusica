import { useState } from 'react';
import useLetras from "../hooks/useLetras";

const Formulario = () => {

    const { setAlert,busquedaLetra } = useLetras();
    const [busqueda,setBusqueda] = useState({
        artista:'',
        cancion:''
    });

    const handleSubmit = e => {
        e.preventDefault();

        if(Object.values(busqueda).includes('')){
            setAlert("Coloca nombre de artista y canción");
            return
        }

        busquedaLetra(busqueda);

        setBusqueda({
           artista:'',
           cancion:''   
        });
    }

    return (
       <form
        onSubmit={handleSubmit}
       >
           <legend>Busca por Artistas y Canción</legend>
           <div className="form-grid">
              <div>
                  <label htmlFor="artista">Artista</label>
                  <input
                    type="text"
                    id="artista"
                    name="artista"
                    placeholder="Nombre Artista"
                    value={busqueda.artista}
                    onChange={e => setBusqueda({
                        ...busqueda,
                        [e.target.name] : e.target.value
                    })}
                  />
               </div>
               <div>
                   <label htmlFor="cancion">Canción</label>
                   <input
                       id="cancion"
                       type="text"
                       name="cancion"
                       placeholder="Nombre Canción"
                       value={busqueda.cancion}
                       onChange={e => setBusqueda({
                           ...busqueda,
                           [e.target.name] : e.target.value
                       })}
                   />
               </div>
               <input
                 type="submit"
                 value="Buscar"
               />
           </div>
       </form>
    );
};

export default Formulario;