import './style.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';

function TarjetaProductoEnBusqueda(){
  const [json, setJson] = useState([]);

  useEffect(() => {
    Axios({
      url: 'https://dummyjson.com/products'
    })
    .then((response)=>{
      setJson(response.data.products);
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [])
  

  return(
    <div className='tarjetaProductoB'>
      {json.map((producto) => (
        <article className='tarjetaProductoB_contenedor'>
          <section className='tarjetaProductoB_columna-uno tarjetaProducto_fila-foto'>
            <img src={producto.thumbnail} alt="miniatura" />
          </section>
          <section className='tarjetaProductoB_columna-dos tarjetaProducto_fila-column tarjetaProducto_fila-izquierda tarjetaProducto_fila-padding'>
            <span className="tarjetaProductoB_titulo">{producto.title}</span>
            <span className='tarjetaProducto_textoSecundario tarjetaProductoB_textoSecundario-tachado tarjetaProducto_textoSecundario-s14'>${Math.round((producto.price)/((100 - producto.discountPercentage)/100))}</span>
            <p className='tarjetaProducto_precioNuevo'>${producto.price}<span className='tarjetaProducto_descuento'>  {Math.round(producto.discountPercentage)}% OFF</span></p>
            <span className='tarjetaProducto_descuento'>6x ${Math.round(producto.price / 6)} sin interes</span>
            <span className='tarjetaProducto_descuento tarjetaProducto_descuento-negrita'>Envio gratis ⚡<i className='full'>FULL</i></span>
          </section>
        </article>
      ))}
    </div>
  );
}

export default TarjetaProductoEnBusqueda;