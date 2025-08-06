import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserUpdate, useUserUpdatePhoto } from "../../services/auth";
import { IUpdateUser } from "../../types/types";
import Layout from "../../layouts/EnterLayout";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/UI/CustomInput";
import CustomBtn from "../../components/UI/CustomBtn";
import { profilePhoto } from "../../utils";
import userStore from "../../store/userStore";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = userStore();

  const updateUserMutation = useUserUpdate();
  const updatePhotoMutation = useUserUpdatePhoto();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IUpdateUser>({
    mode: "onBlur",
  });

  const onSubmit = async (data: IUpdateUser) => {
    try {
      // Обновить текстовые поля
      await updateUserMutation.mutateAsync({ data, id: user?.id });

      // Обновить фото, если файл выбран
      if (selectedFile) {
        const formData = new FormData();
        formData.append("avatar", selectedFile);
        await updatePhotoMutation.mutateAsync({ data: formData, id: user?.id });
      }

      console.log("Профиль успешно обновлён");
      navigate("/");
    } catch (error: any) {
      console.error("Ошибка при обновлении:", error);
    }
    reset();
  };

  return (
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
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file);

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const img = document.getElementById("avatarPreview") as HTMLImageElement;
                    if (img) img.src = reader.result as string;
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <div
              className="form_avatar_preview"
              onClick={() => fileInputRef.current?.click()}
              style={{ cursor: "pointer" }}
            >
              <img id="avatarPreview" src={profilePhoto} />
            </div>
          </div>

          <CustomBtn
            text="Подтвердить"
            // disabled={!isValid}
            width={248}
            height={60}
            ml="auto"
          />
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
