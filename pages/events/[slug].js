import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from 'next/link'
import Image from 'next/image'
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from '@/styles/Event.module.css'

export default function EventPage({evt}) {
  const deleteEvent = (e) => {
    console.log('delete')
  }
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Editar Evento
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Eliminar Evento
          </a>
        </div>

        <span>
          {new Date(evt.date).toLocaleDateString('bo-BO')} <strong>a las</strong> {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image.formats.large.url} width={960}
            height={600} /> 
          </div>
        )}

        <h2>Author:</h2>
        <p>{evt.performers}</p>
        <h3>Descripción:</h3>
        <p>{evt.description}</p>
        <h3>Lugar de evento: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href='/events'>
          <a className={styles.back}>{'<'} Volver atrás</a>
        </Link>

      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()

  const paths = events.map(evt => ({
    params: {slug: evt.slug}
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug }}){
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await res.json()

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1
  }
}