import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";
import { HiLocationMarker } from "react-icons/hi";

export default function EventItem({ evt }) {
  console.log(evt);
  return (
    <div className={styles.event}>
      <Link href={`/events/${evt.slug}`}>
        <div className={styles.img_wrapper}>
          <Image
            src={
              evt.image
                ? evt.image.formats.thumbnail.url
                : "/images/event-default.png"
            }
            layout="fill"
          />
        </div>
      </Link>
      <div className={styles.user}>
        <div className={styles.userimage_wrapper}>
          <Image
            src={
              evt.user.avatar?.formats.thumbnail
                ? evt.user.avatar?.formats.thumbnail.url
                : "/images/default-user.jpg"
            }
            layout="fill"
          />
        </div>
        <span>{evt.user?.username}</span>
      </div>
      <div className={styles.info}>
        <div className={styles.date}>
          <span>{moment(evt.date).format("MMM")}</span>
          <span>{moment(evt.date).format("MM")}</span>
          <span className={styles.year}>{moment(evt.date).format("Y")}</span>
          {/* <span>{moment(evt.date).format("yyyy-MM-DD")}</span> */}
        </div>
        <div className={styles.description}>
          <h3>{evt.name}</h3>
          <button className="btn-primary bagde">Category</button>
          <span>
            <HiLocationMarker />
            {evt.address}
          </span>
        </div>
      </div>
    </div>
  );
}
