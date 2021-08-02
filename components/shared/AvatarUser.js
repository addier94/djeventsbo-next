import React from "react";
import styles from "@/styles/shared/AvatarUser.module.css";
import Image from "next/image";

export const AvatarUser = ({ user, size }) => {
  return (
    <div className={styles.img_wrapper} style={{ width: size, height: size }}>
      <Image
        src={
          user?.avatar?.formats.thumbnail
            ? user.avatar.formats.thumbnail.url
            : "/images/default-user.jpg"
        }
        layout="fill"
      />
    </div>
  );
};
