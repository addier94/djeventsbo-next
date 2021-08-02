import React from "react";
import styles from "@/styles/shared/ImgCard.module.css";
import Image from "next/image";

export const ImgCard = ({ image, h_img }) => {
  return (
    <div className={styles.image_wrapper} style={{ height: h_img }}>
      <Image
        src={
          image?.formats.large
            ? image.formats.large.url
            : "/images/event-default.png"
        }
        layout="fill"
      />
    </div>
  );
};
