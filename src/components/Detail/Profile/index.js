import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import classes from "./index.module.scss";
import { getCroppedImg } from "../../../hooks/getCroppedImg";

import {
  changeImage,
  changeNickname,
  editUser,
  toggleLogin,
} from "../../../redux/reducer/ToggleReducer";
import { Link } from "react-router-dom";
import myAxios from "../../../hooks/myAxios";
import Cropper from "react-easy-crop";
import AstronautSpinner from "../../animations/Spinner/AstronautSpinner";

const Profile = () => {
  const dispatch = useDispatch();
  const userImage = useSelector((state) => state.toggle.user.img);
  const user = useSelector((state) => state.toggle.user);

  const [changeMessage, setChangeMessage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [defaultImage, setDefaultImage] = useState(
    userImage ??
      process.env.REACT_APP_PROFILE_IMG + process.env.REACT_APP_DEFAULT_IMG
  );

  const { handleSubmit, register } = useForm({
    defaultValues: {
      nickname: user.nickname,
    },
  });

  const onCropComplete = useCallback((croppedAreaa, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const selectImage = useCallback(async (img) => {
    if (img.target.files && img.target.files.length > 0) {
      const file = img.target.files[0];
      setFileInfo({ name: file.name, type: file.type });
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        fileInfo.type
      );

      //Usage example:
      urltoFile(croppedImage, fileInfo.name, fileInfo.type).then(
        async function (file) {
          await handleImage(file);
        }
      );
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const handleImage = async (e) => {
    // e.preventDefault();
    // if (e.target.files && e.target.files.length > 0) {
    // const file = e.target.files[0];
    const file = e;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setDefaultImage(reader.result);
    };

    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post("/api/data/userImg", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 15000,
    });
    setImageSrc(null);
    setLoading(false);
    dispatch(changeImage(res.data.img));
  };

  const handleNickname = async (e) => {
    const { nickname } = e;
    const res = await myAxios("/api/data/user/modify", { nickname });
    setChangeMessage(res.message);
    dispatch(changeNickname(res.nickname));
  };
  const handleLogout = useCallback(async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      dispatch(toggleLogin(false));
      dispatch(editUser(""));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => setChangeMessage(null), 3000);
  }, [changeMessage, croppedImage, loading]);

  return !imageSrc ? (
    <Fragment>
      <ImageUpload
        src={defaultImage}
        onChange={handleImage}
        selectImage={selectImage}
      />
      <form className={classes.profile__form}>
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
      <Link
        to="settings"
        state={user}
        className={`${classes.profile__btn} ${classes.profile__settings}`}
        style={{ textDecoration: "none", textAlign: "center" }}
      >
        설정
      </Link>
      <button
        className={`${classes.profile__btn} ${classes.profile__settings}`}
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </Fragment>
  ) : (
    <Fragment>
      <div style={{ width: "70vw", height: "50vh", position: "relative" }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          cropShape="round"
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <button
        className={classes.profile__btn}
        style={{ width: "fit-content" }}
        onClick={(v) => {
          setLoading(true);
          showCroppedImage(v);
        }}
      >
        변경하기
      </button>
      {loading && <AstronautSpinner />}
    </Fragment>
  );
};
export default Profile;

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
function urltoFile(url, filename, mimeType) {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
}
