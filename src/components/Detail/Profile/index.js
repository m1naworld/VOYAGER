import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import classes from "./index.module.scss";
import {
  changeImage,
  changeNickname,
} from "../../../redux/reducer/ToggleReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.toggle.user);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      nickname: user.nickname,
    },
  });
  const provider = user.provider;
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
    <section className={classes.profile__section}>
      <div className={classes.profile__wrapper}>
        <ImageUpload src={defaultImage} onChange={handleImage} />
        <label htmlFor="nickname">닉네임</label>
        <input name="nickname" ref={register} {...register("nickname", {})} />
        <button className={classes.btn} onClick={handleSubmit(handleNickname)}>
          닉네임변경
        </button>
        <hr />
        <button className={`${classes.btn} ${classes.settings}`}>설정</button>
        {provider === "local" && <></>}
        <button className={`${classes.btn} ${classes.exit}`}>회원탈퇴</button>
      </div>
    </section>
  );
};

export default Profile;
