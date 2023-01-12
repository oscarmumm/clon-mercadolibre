import './style.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';

function TarjetaProducto(){

  const [json, setJson] = useState([]);

  useEffect(() => {
    Axios({
      url: 'https://dummyjson.com/products'
    })
    .then((response)=>{
      console.log(response.data.products)
      setJson(response.data.products);
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [])
  

  return(
    <div className='tarjetaProducto'>
      {json.map((producto) => (
        <article className='tarjetaProducto_contenedor'>
          <section className='tarjetaProducto_fila'>
            <img src={producto.thumbnail} alt="miniatura" />
          </section>
          <div className='tarjetaProducto_lineaHorizontal'></div>
          <section className='tarjetaProducto_fila tarjetaProducto_fila-column tarjetaProducto_fila-izquierda tarjetaProducto_fila-padding'>
          <span className='tarjetaProducto_textoSecundario tarjetaProducto_textoSecundario-tachado tarjetaProducto_textoSecundario-s14'>${Math.round((producto.price)/((100 - producto.discountPercentage)/100))}</span>
          <p className='tarjetaProducto_precioNuevo'>${producto.price}<span className='tarjetaProducto_descuento'>{Math.round(producto.discountPercentage)}% OFF</span></p>
          <span className='tarjetaProducto_descuento'>6x ${Math.round(producto.price / 6)} sin interes</span>
          <span className='tarjetaProducto_descuento tarjetaProducto_descuento-negrita'> Envio gratis 💡 FULL</span>
          <span class="tarjetaProducto_textoSecundario">{producto.title}</span>
          </section>
        </article>
      ))}
    </div>
  );
}

export default TarjetaProducto;