import React from "react";
import classes from "./ImageUpload.module.scss";

const ImageUpload = ({ onChange, src }) => (
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
      type="file"
      onChange={onChange}
    />
  </label>
);

export default ImageUpload;
