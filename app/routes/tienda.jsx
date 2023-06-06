import {useLoaderData, Outlet, useOutletContext} from '@remix-run/react'
import {getGuitarras} from '~/models/guitarras.server'
import ListadoGuitarras from '../components/listado-guitarras';
import styles from '../styles/guitarras.css'


export function meta() {
  return [
    { title: "GuitarLA - Tienda" }
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


export async function loader(){
  const guitarras = await getGuitarras()
  
  //en guitarras.data esta toda la informacion
  return guitarras.data
}

function Tienda() {


 
  const guitarras = useLoaderData()
  
  
  

  return (
   <main className='contenedor'>
    <ListadoGuitarras
      guitarras = {guitarras}
    />

     <Outlet
      context={useOutletContext()}
    /> 
   
    
   </main>
    
  )
}

export default Tienda


