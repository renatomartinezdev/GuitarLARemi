import { useState, useEffect } from 'react';
import{
    Meta, 
    Links,
    Outlet, 
    Scripts, 
    LiveReload,
    isRouteErrorResponse,
    useRouteError, 
    Link
    
} from '@remix-run/react'

import styles from '~/styles/index.css'

import Header from '~/components/header'
import Footer from './components/footer';
//informacion meta
export function meta() {
    return [
      { charset: "utf-8" },
      { title: "GuitarLA" },
      { name: "viewport", content: "width=device-width,initial-scale=1" },
    ];
}




//hoja de estilos y fuentes de google fonts
/*
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap" rel="stylesheet">
*/
export function links(){
    return[
        //normalize
        {
            rel: 'stylesheet', 
            rel: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },

        {
            rel: 'stylesheet', 
            href: styles

        },

        {
            rel: 'preconnect', 
            href:"https://fonts.googleapis.com"
        }, 

        {
            rel: 'preconnect', 
            href:"https://fonts.gstatic.com", 
            crossOrigin: 'true'
        },

        {
            rel: 'stylesheet', 
            href:"https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap"
        }

        

    ]
}


export default function App(){

   
   const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
   const [carrito, setCarrito] = useState(carritoLS)

   useEffect(() =>{
    localStorage.setItem('carrito', JSON.stringify(carrito))
   }, [carrito])
   

   const agregarCarrito = guitarra =>{
    //iterar sobre los elementos que hay sobre el carrito
    /*
        Este método se utiliza para verificar si al menos un elemento en un arreglo
        cumple con una condición dada. Retorna un valor booleano: true si se cumple
        la condición al menos una vez, y false en caso contrario.
    */
    if(carrito.some(guitarraState => guitarraState.id === guitarra.id)){
        //iterar sobre el arreglo e identificar el elemento duplicado
        const carritoActualizado = carrito.map(guitarraState =>{
            if(guitarraState.id === guitarra.id){
                guitarraState.cantidad = guitarra.cantidad
            }

            return guitarraState
        })

        setCarrito(carritoActualizado)
    }

    //Si no existe, el registro es nuevo
    else{
        setCarrito([...carrito, guitarra])
    }
   }

   const actualizarCantidad = guitarra =>{
    const carritoActualizado = carrito.map(guitarraState => {
        if(guitarraState.id === guitarra.id){
            guitarraState.cantidad = guitarra.cantidad
        }

        return guitarraState
    })

    setCarrito(carritoActualizado)
   }

   const eliminarGuitarra = id =>{
    const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)
    setCarrito(carritoActualizado)
   }
    return(
        <Document>
            <Outlet
                context={{
                    agregarCarrito, 
                    carrito, 
                    actualizarCantidad,
                    eliminarGuitarra
                }}
            />
        </Document> 
    )
}


function Document({children}){
    return(
        <html lang="es">
            <head>
                <Meta/>
                <Links/>
            </head>

            <body>  
                {/*se ubica en este lugar para que pueda aparecer en todas las rutas */}
                <Header/>
                {children}
                <Footer/>

                <Scripts/>
                <LiveReload/>
            </body>
        </html>
    )
}

/*MANEJO DE ERRORES*/
export function ErrorBoundary(){
    const error = useRouteError()

    if(isRouteErrorResponse(error)){
        return(
            <Document>
                <p className='error'>{error.status} {error.statusText}</p>
                <Link className='errorEnlace' to='/'>Volver a lapagina principal</Link>
            </Document>
        )
    }

    return(
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>
            <Link className='errorEnlace' to='/'>Volver a lapagina principal</Link>
        </Document>
    )
}