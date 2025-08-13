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
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<IUpdateUser>({
    mode: "onBlur",
  });

  const email = watch("email") || "";
  const password = watch("password") || "";
  const username = watch("username") || "";

  const isAllTextFieldsFilled =
    email.trim() !== "" && password.trim() !== "" && username.trim() !== "";
  const isAllTextFieldsEmpty =
    email.trim() === "" && password.trim() === "" && username.trim() === "";
  const hasImage = Boolean(selectedFile);

  const canSubmit =
    (isAllTextFieldsFilled && !hasImage) || // все поля, без картинки
    (hasImage && isAllTextFieldsEmpty) || // только картинка
    (isAllTextFieldsFilled && hasImage); // все поля + картинка

  const onSubmit = async (data: IUpdateUser) => {
    try {
      // Обновить текстовые поля, если они заполнены
      if (isAllTextFieldsFilled) {
        await updateUserMutation.mutateAsync({ data, id: user?.id });
      }

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

  const handleRemoveAvatar = async () => {
    try {
      setSelectedFile(null);
      const img = document.getElementById("avatarPreview") as HTMLImageElement;
      if (img) img.src = profilePhoto;

      // Отправляем пустой FormData для удаления фото
      const formData = new FormData();
      formData.append("avatar", "");
      await updatePhotoMutation.mutateAsync({ data: formData, id: user?.id });

      console.log("Аватарка удалена");
    } catch (error) {
      console.error("Ошибка при удалении аватара:", error);
    }
  };

  const avatarSrc =
    selectedFile
      ? URL.createObjectURL(selectedFile)
      : user?.avatar
      ? `https://prowebapi.tech${user.avatar}`
      : profilePhoto;

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
            register={register("email")}
          />
          <CustomInput
            holder="пароль"
            type="password"
            label="Ваш пароль"
            errors={errors?.password}
            register={register("password")}
          />
          <CustomInput
            holder="Имя"
            type="text"
            label="Ваше имя"
            errors={errors?.username}
            register={register("username")}
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
                    const img = document.getElementById(
                      "avatarPreview"
                    ) as HTMLImageElement;
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
              <img id="avatarPreview" src={avatarSrc} />
            </div>

            {(selectedFile || user?.avatar) && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ff4d4f",
                  marginTop: "8px",
                  cursor: "pointer",
                  marginRight: 'auto'
                }}
              >
                Удалить фото
              </button>
            )}
          </div>

          <CustomBtn
            text="Подтвердить"
            disabled={!canSubmit}
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
