import { useState } from "react";
import { API_URL } from "../config";
import styles from "@/styles/Form.module.css";
import { CgSpinner } from "react-icons/cg";

export default function ImageUpload({ evtId, imageUploaded, token }) {
  const [image, setImage] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", evtId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
      setSpinner(false);
    }
  };

  const handleFileChange = (e) => {
    // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Subir Imagen</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button
          disabled={spinner}
          type="submit"
          className="btn spinner_content"
        >
          {spinner ? (
            <CgSpinner className="spinner__svg" />
          ) : (
            <span>Subir</span>
          )}
        </button>
      </form>
    </div>
  );
}
