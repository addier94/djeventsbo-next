import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import { API_URL } from "@/config/index";
import styles from "@/styles/Dashboard.module.css";
import { useRouter } from "next/router";

export default function DashboardPage({ events, token }) {
  const router = useRouter();
  const deleteEvent = async (id, imageId) => {
    if (confirm("Estas seguro de querer eliminar?")) {
      const headers = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // If imageId is positive or negative number, event has images in DB
      if (!!imageId) {
        await Promise.all([
          fetch(`${API_URL}/upload/files/${imageId}`, headers),
          fetch(`${API_URL}/events/${id}`, headers),
        ]);
      } else {
        await fetch(`${API_URL}/events/${id}`, headers);
      }
    }
  };
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>Mis Eventos</h3>

        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
}
