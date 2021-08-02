import React from "react";
import styles from "@/styles/shared/ImgCard.module.css";
import Image from "next/image";

export const ImgCard = ({ image, h_img, w_img = "100%", brightness = "1" }) => {
  return (
    <div
      className={styles.image_wrapper}
      style={{
        height: h_img,
        width: w_img,
        filter: `brightness(${brightness})`,
      }}
    >
      {image?.length > 2 ? (
        <Image src={image} layout="fill" />
      ) : (
        <Image
          src={
            image?.formats?.large
              ? image.formats.large.url
              : "/images/event-default.png"
          }
          layout="fill"
        />
      )}
    </div>
  );
};
