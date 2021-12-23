import React from "react";
import classes from "./ImageUpload.module.scss";

const ImageUpload = ({ src, selectImage }) => {
  return (
    <label
      htmlFor="photo-upload"
      className={`${classes.custom_file_upload} ${classes.profile_label} fas`}
    >
      <div className={`${classes.img_wrap} ${classes.img_upload}`}>
        <img
          className={classes.profile_img}
          htmlFor="photo-upload"
          src={src}
          alt="inputimage"
        />
      </div>
      <input
        className={classes.profile_input}
        id="photo-upload"
        name="image"
        type="file"
        accept="image/*"
        onChange={selectImage}
      />
    </label>
  );
};

export default ImageUpload;
