import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import classes from "./index.module.scss";
import {
  changeImage,
  changeNickname,
} from "../../../redux/reducer/ToggleReducer";

const ImgUpload = ({ onChange, src }) => (
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

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.toggle.user.nickname);
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: user,
    },
  });

  const userImage = useSelector((state) => state.toggle.user.img);

  const [defaultImage, setDefaultImage] = useState(
    process.env.REACT_APP_SERVER_URL +
      "/" +
      (userImage ?? process.env.REACT_APP_DEFAULT_IMG)
  );

  const handleImage = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setDefaultImage(reader.result);
    };
    reader.readAsDataURL(file);
    console.log("DONE");
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post("/api/register/userImg", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 15000,
    });
    dispatch(changeImage(res.data.img));
  };

  const handleNickname = async (e) => {
    const { nickname } = e;
    const res = await axios.post("/api/register/user/modify", { nickname });
    dispatch(changeNickname(res.data.nickname));
  };

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        background: " linear-gradient(270deg, #3fa1a9, #79f1a4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ImgUpload src={defaultImage} onChange={handleImage} />
      {/* <label htmlFor="file_upload">
        <img
          src="http://raymondubuntu.ddns.net:4000/img/default/092a5957a1ac2f6e3b262b5654339fa1"
          style={{
            width: "200px",
            height: "200px",
            background: "transparent",
          }}
        />
      </label>
      <input
        type="file"
        id="file_upload"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImage}
      /> */}

      <form>
        <input
          ref={register}
          {...register("nickname", {
            // required: (
            //   <h1 style={{ fontSize: "0.5rem", color: "red" }}>
            //     This field required.
            //   </h1>
            // ),
            // pattern: {
            //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            //   message: "invalid email address",
            // },
          })}
        />
        <button onClick={handleSubmit(handleNickname)}>닉네임</button>
      </form>
    </section>
  );
};

export default Profile;
