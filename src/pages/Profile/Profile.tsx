import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/auth";
import { ILogin } from "../../types/types";
import useStore from "../../store/userStore";
import Layout from "../../layouts/EnterLayout";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/UI/CustomInput";
import CustomBtn from "../../components/UI/CustomBtn";
import { profilePhoto } from "../../utils";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  const loginMutation = useLoginMutation();
  const [isError, setError] = React.useState<string | any>("");

  const {
    register, // позволит регистрировать поля
    formState: { errors, isValid }, // объект у которого есть cвойства для ошибок
    handleSubmit, //
    reset,
  } = useForm<ILogin>({
    // mode по умолчанию равен onSubmit
    mode: "onBlur",
  });

  const onSubmit = async (data: ILogin) => {
    try {
      await loginMutation.mutateAsync(data);
      setError("");
      console.log("Login successful!");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      setError("");
      setError(error.response.data.refresh);
      console.error("Login failed:", error);
    }
    reset();
  };

  return (
    <>
      <Layout>
        <div className="form_block">
          <h2 className="form_title">Редактировать профиль</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="form_content">
            <CustomInput
              holder="Email"
              type="mail"
              label="Ваш email"
              errors={errors?.email}
              register={register("email", {
                required: "Поле обязательно к заполнению",
              })}
            />
            <CustomInput
              holder="пароль"
              type="password"
              label="Ваш пароль"
              errors={errors?.password}
              register={register("password", {
                required: "Поле обязательно к заполнению",
                minLength: {
                  value: 8,
                  message: "Минимум 8 символов",
                },
              })}
            />
            <CustomInput
              holder="Имя"
              type="text"
              label="Ваше имя"
              errors={errors?.username}
              register={register("username", {
                required: "Поле обязательно к заполнению",
                minLength: {
                  value: 8,
                  message: "Минимум 8 символов",
                },
              })}
            />
            <div className="form_avatar_block">
              <label className="form_avatar_label" htmlFor="avatar">
                Изменить фото профиля 
              </label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  // пример логики: можно показать превью
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      // показываем превью
                      const img = document.getElementById(
                        "avatarPreview"
                      ) as HTMLImageElement;
                      if (img) img.src = reader.result as string;
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <div className="form_avatar_preview">
                <img
                  src={profilePhoto}
                />
              </div>
            </div>
            <CustomBtn
              text="Вход"
              disabled={!isValid}
              width={248}
              height={60}
              ml="auto"
            />
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
