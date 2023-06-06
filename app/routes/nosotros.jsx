import imagen from '../../public/img/nosotros.jpg'
import styles from '../styles/nosotros.css'

export function meta() {
  return [
    { title: "GuitarLA - Sobre Nosotros" }
  ]
}

export function links(){
  return[
    {
      rel: 'stylesheet',
      href: styles
    }, 

    {
      rel: 'preload', 
      href: 'image'
    }
  ]
}

//la funcion de meta solamente funciona en routes
function Nosotros() {
  
  
  return (
   <main className='contenedor nosotros'>
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
          <img src={imagen} alt="imagen nosotros" />

          <div className=''>
            <p>
            GuitarLA es una tienda de renombre dedicada a ofrecer una amplia gama de guitarras de alta calidad, accesorios y servicios relacionados para músicos de todos los niveles. Desde nuestra fundación en fecha de 2023, hemos establecido una sólida reputación como destino principal para los amantes de la música y los entusiastas de la guitarra.
            Nuestro objetivo es proporcionar a nuestros clientes una experiencia excepcional al adquirir instrumentos musicales de primera calidad y ofrecerles un servicio personalizado. Valoramos la pasión por la música y nos enorgullece ayudar a nuestros clientes a encontrar la guitarra perfecta que se adapte a sus necesidades y estilo musical. 
            </p>
          </div>
      </div>
   </main>
  )
}

export default Nosotros


