import Layout from "@/components/Layout";
import EventItem from '@/components/EventItem'
import {API_URL} from '@/config/index';

export default function EventsPage({events}) {
  return (
    <Layout>
      <h1>eventos</h1>
      {events.length === 0 && <h2>No hay eventos para mostrar</h2>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    props: {events: events.slice(0, 3) },
    revalidate: 1
  }
}