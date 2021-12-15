import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import classes from "./index.module.scss";

import {
  changeImage,
  changeNickname,
} from "../../../redux/reducer/ToggleReducer";
import { useNavigate } from "react-router-dom";
import myAxios from "../../../hooks/myAxios";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.toggle.user);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      nickname: user.nickname,
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
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        setDefaultImage(reader.result);
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post("/api/data/userImg", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 15000,
      });
      dispatch(changeImage(res.data.img));
    }
  };
  const handleNickname = async (e) => {
    const { nickname } = e;
    const res = await myAxios("/api/data/user/modify", { nickname });
    console.log(res);
    dispatch(changeNickname(res.nickname));
  };

  return (
    <Fragment>
      <ImageUpload src={defaultImage} onChange={handleImage} />
      <label htmlFor="nickname">닉네임</label>
      <input
        className={classes.profile__input}
        name="nickname"
        ref={register}
        {...register("nickname", {})}
      />
      <button
        className={classes.profile__btn}
        onClick={handleSubmit(handleNickname)}
      >
        닉네임변경
      </button>
      <hr />

      <button
        className={`${classes.profile__btn} ${classes.profile__settings}`}
        onClick={() => navigate("settings")}
      >
        설정
      </button>
    </Fragment>
  );
};

export default Profile;
