import Link from 'next/link'
import Layout from "@/components/Layout";
import EventItem from '@/components/EventItem'
import {API_URL} from '@/config/index';

export default function HomePage({events}) {
  return (
    <Layout>
      <h1>Próximos eventos</h1>
      {events.length === 0 && <h2>No hay eventos para mostrar</h2>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>Ver todos los eventos</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  const events = await res.json()

  return {
    props: { events },
    revalidate: 1
  }
}