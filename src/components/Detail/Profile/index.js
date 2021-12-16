import React, { Fragment, useEffect, useState } from "react";
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
let birthday;
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.toggle.user);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      nickname: user.nickname,
    },
  });
  if (user?.birth) {
    birthday = `${user?.birthyear}-${user?.birth?.substring(
      0,
      2
    )}-${user?.birth?.substring(2, 4)}`;
  }

  const [changeMessage, setChangeMessage] = useState(null);
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
    setChangeMessage(res.message);
    dispatch(changeNickname(res.nickname));
  };
  useEffect(() => {
    setTimeout(() => setChangeMessage(null), 3000);
  }, [changeMessage]);
  return (
    <Fragment>
      <ImageUpload src={defaultImage} onChange={handleImage} />
      <form className={classes.profile__form}>
        <label htmlFor="name">이름</label>
        <input
          disabled
          name="name"
          value={user?.name}
          className={classes.profile__input}
          style={{ backgroundColor: "white" }}
        />

        <label htmlFor="email">이메일</label>
        <input
          readOnly
          name="email"
          value={user?.email ?? "empty"}
          className={classes.profile__input}
        />
        <label htmlFor="birthday">생일</label>
        <input
          readOnly
          name="birthday"
          value={birthday ?? "empty"}
          className={classes.profile__input}
        />
        <label htmlFor="phone]">전화번호</label>
        <input
          readOnly
          className={classes.profile__input}
          name="phone"
          value={user.phone ?? "empty"}
        />
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

        <div
          className={
            changeMessage
              ? classes.profile__popup__view
              : classes.profile__popup
          }
        >
          <h1>{changeMessage}</h1>
        </div>
      </form>
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
