import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Layout from "@/components/Layout";
import EventMap from "@/components/EventMap";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import { useRouter } from "next/router";
import { AvatarUser } from "@/components/shared/AvatarUser";
import { ImgCard } from "@/components/shared/ImgCard";

export default function EventPage({ evt }) {
  const router = useRouter();
  // console.log(evt.user.avatar);

  return (
    <Layout>
      <div className={styles.image}>
        <ImgCard image={evt.image} h_img={"260px"} />
      </div>
      <div className={styles.user_wrapper}>
        <span>
          {moment(evt.date).format("yyyy-MM-DD")}
          <strong> a las </strong> {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <div className={styles.user}>
          <AvatarUser user={evt.user} size={"60px"} />
          <h2>Creado por {evt.user.username}</h2>
        </div>
      </div>
      <div className={styles.event_detail}>
        <p>{evt.performers}</p>
        <h3>Descripción:</h3>
        <p>{evt.description}</p>
        <h3>Lugar de evento: {evt.venue}</h3>
        <p>{evt.address}</p>

        {/* <EventMap evt={evt} /> */}

        <Link href="/events">
          <a className={styles.back}>{"<"} Volver atrás</a>
        </Link>
      </div>
      <ToastContainer />
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();

//   const paths = events.map((evt) => ({
//     params: { slug: evt.slug },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);

  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
  };
}
