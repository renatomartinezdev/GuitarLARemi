import { useEffect, useState } from 'react';
import {useOutletContext} from '@remix-run/react'
import styles from '../styles/carrito.css'
import {ClientOnly} from 'remix-utils'

export function meta() {
    return [
      { title: "GuitarLA - Carrito" }
    ];
  }
  
  export function links(){
    return[
      {
        rel: 'stylesheet',
        href: styles
      }
    ]
  }
  

function Carrito() {
  const [total, setTotal] = useState(0)
  const {carrito, actualizarCantidad, eliminarGuitarra} = useOutletContext()

  useEffect(()=>{
      const calculoTotal = carrito.reduce((total,producto ) => total + (producto.cantidad * producto.precio), 0)
      setTotal(calculoTotal)
  }, [carrito])
  
  return (
    <ClientOnly
      fallback8={'cargando...'}
      
    >
      {() =>(
        <main className="contenedor">
          <h1 className="heading">Carrito de Compras</h1>

          <div className="contenido">
              <div className='carrito'>
                  <h2>Articulos</h2>

                  {carrito?.length === 0 ? 'Carrito Vacio' : (
                    carrito?.map(producto =>(
                      <div className='producto' key={producto.id}>
                        <div>
                          <img src={producto.imagen}/>

                        </div>

                        <div>
                          <p className='nombre'>{producto.nombre}</p>
                          <p>Cantidad:</p>

                          <select
                            className='select'
                            value={producto.cantidad}
                            onChange={e => actualizarCantidad({
                              cantidad: +e.target.value, 
                              id: producto.id
                            })}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>

                          
                          <p className='precio'>$ <span>{producto.precio}</span></p>
                          <p className='subtotal'>Subtotal: $<span>{producto.cantidad * producto.precio}</span></p>
                        </div>

                        <button
                        className='btn_eliminar'
                        onClick={() => eliminarGuitarra(producto.id)}
                        type='button'>
                        
                          X
                        </button>
                      </div>
                    ))
                  )}
              </div>
              <aside className="resumen">
                  <h3>Resumen del Pedido</h3>
                  <p>Total a Pagar:$ {total} </p>
              </aside>
          </div>

        
        </main>
      )}
    </ClientOnly>  
  )
}

export default Carrito
