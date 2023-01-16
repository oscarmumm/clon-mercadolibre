import './style.css';
import Axios from 'axios'
import { useEffect, useState } from 'react';
import TarjetaProductoEnBusqueda from '../../Components/TarjetaProductoEnBusqueda';

function PanelDeBusqueda(){

  const [json, setJson] = useState([]);
  const [listaCategorias, setListaCategorias ] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [buscar, setBuscar] = useState([]);

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

  useEffect(() => {
    Axios({
      url: 'https://dummyjson.com/products/categories'
    })
    .then((response) => {
      console.log(response.data)
      setListaCategorias(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    if(buscar === true){
      Axios({
        url: `https://dummyjson.com/products/category/${categoria}`
      })
      .then((response) => {
        setJson(response.data.products);
      })
      .catch((error) => {
        console.log(error)
      })
      setBuscar(false)
    }
  }, [buscar])

  return(
    <div>
      <div className='panelDeBusqueda'>
        <div className='ordenarPor'>
          <label htmlFor="">Ordenar por </label>
          <select className='seleccionDeOrden' name="price" id="">
            <option value="default"> Relevancia </option>
            <option value="low"> Mas Baratos Primero </option>
            <option value="high"> Mas Caros Primero </option>
          </select>
        </div>
        <aside className='filtrosDeBusqueda'>
          <section className='seccionCategorias'>
            <h4 className='tituloDeFiltro'>Categorías</h4>
            {listaCategorias.map((cat)=>(
              <span className='categoria' onClick={() => {setBuscar(true);setCategoria(cat)}}>{cat} {} </span>
              ))}
          </section>
        </aside>
        <div className='tarjetaProductoB'>
      {json.map((producto) => (
        <article className='tarjetaProductoB_contenedor'>
          <section className='tarjetaProductoB_columna-uno tarjetaProductoB_fila-foto'>
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
      </div>
    </div>
  );
}

export default PanelDeBusqueda;