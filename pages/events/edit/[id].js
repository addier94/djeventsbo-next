import moment from "moment";
import { FaImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "@/helpers/index";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import { TiDelete } from "react-icons/ti";

export default function EditEventPage({ evt, token }) {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });
  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image : null
  );
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const openModal = async (e) => {
    setShowModal(true);
    window.scroll({ top: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (hasEmptyFields) {
      toast.error("Por favor llena todos los campos");
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("Unauthorized");
        return;
      }
      toast.error("Oops algo salio mal intente mas tarde");
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();

    setImagePreview(data.image);
    setShowModal(false);
  };

  const deleteImage = async () => {
    const res = await fetch(`${API_URL}/upload/files/${imagePreview.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setImagePreview(null);
    }
  };

  return (
    <Layout title="Añadir nuevo evento">
      <Link href="/events">Ir atras</Link>
      <h1>Editar evento</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Nombre del evento</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Quienes organizan el evento</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Donde se lleva el evento</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Fecha</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Hora</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Descripción para el evento</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Actualizar evento" className="btn" />
      </form>

      <h2>Imagen para el evento</h2>
      {imagePreview ? (
        <div className={styles.content_imgpreview}>
          <TiDelete onClick={deleteImage} className={styles.imgpreview_svg} />
          <Image
            src={imagePreview.formats.thumbnail.url}
            height={100}
            width={170}
          />
        </div>
      ) : (
        <div>
          <p>No hay imagen para este evento</p>
        </div>
      )}

      <div>
        <button onClick={openModal} className="btn-secondary">
          <FaImage /> Subir Imagen
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          imagePreview={imagePreview}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  return {
    props: {
      evt,
      token,
    },
  };
}
