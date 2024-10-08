import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice.js";
import imageCompression from "browser-image-compression";
import logoCircle from "../../assets/logo-circle.png";
import WelcomeSection from "../../components/Auth/WelcomeSection.jsx";
import InputField from "../../components/Utility/InputField.jsx";
import Button from "../../components/Utility/Button/Button.jsx";
import PrimaryLink from "../../components/Utility/PrimaryLink.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    profileImage: "",
    userName: "",
    email: "",
    password: "",
  });
  const {
    firstName,
    lastName,
    birthDate,
    userName,
    email,
    profileImage,
    password,
  } = formData;
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/users/login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = async (e) => {
    if (e.target.name === "profileImage") {
      const file = e.target.files[0];

      if (file) {
        try {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 800,
          });

          const reader = new FileReader();

          reader.onloadend = () => {
            setFormData((prevState) => ({
              ...prevState,
              profileImage: reader.result,
            }));
            setImagePreview(reader.result);
          };

          reader.readAsDataURL(compressedFile);
        } catch (error) {
          console.error("Error compressing image:", error);
        }
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      birthDate,
      userName,
      email,
      profileImage,
      password,
    };

    dispatch(register(userData));
  };

  const formFields = [
    {
      label: "First Name",
      type: "text",
      id: "firstName",
      name: "firstName",
      required: true,
    },
    {
      label: "Last Name",
      type: "text",
      id: "lastName",
      name: "lastName",
      required: true,
    },
    {
      label: "Username",
      type: "text",
      id: "userName",
      name: "userName",
      required: true,
    },
    {
      label: "Birth Date",
      type: "date",
      id: "birthDate",
      name: "birthDate",
      required: true,
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      name: "email",
      required: true,
    },
    {
      label: "Password",
      type: "password",
      id: "password",
      name: "password",
      required: true,
    },
    {
      label: "Insert Profile Picture",
      type: "file",
      id: "profileImage",
      name: "profileImage",
      required: false,
    },
  ];

  return (
    <div className="min-h-screen  flex items-center justify-center bg-white">
      <div className="max-w-6xl w-5/6  flex rounded-2xl  bg-soft-white shadow-md border border-purple-telemagnet">
        <WelcomeSection />
        <div className="w-full px-2 py-4 md:w-[75%] mx-4 md:mb-0 ">
          <div className="flex items-center justify-center mb-2 mt-2">
            <img
              src={logoCircle}
              alt="Logo"
              className="w-12 h-12 rounded-full object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
          {isLoading ? <Spinner /> : ""}
          <form
            onSubmit={onSubmit}
            className="flex flex-wrap justify-between gap-y-4"
          >
            {formFields.map((field, index) => (
              <div
                key={index}
                className={`${
                  field.type === "file" ? "w-full" : "w-[calc(50%-1rem)]"
                }`}
              >
                <InputField
                  label={field.label}
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  value={
                    field.type === "file" ? undefined : formData[field.name]
                  }
                  onChange={onChange}
                  required={field.required}
                  placeholder={`Enter ${field.label}`}
                />
              </div>
            ))}
            {imagePreview && (
              <div className="flex justify-start mb-2">
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-24 h-auto object-cover"
                />
              </div>
            )}
            <Button type="submit" onClick={onSubmit} disabled="true">
              Register
            </Button>
          </form>
          <p className="text-center pr-6 text-lg text-gray mt-2">
            Already have an account?{" "}
            <PrimaryLink to="/users/login">Login</PrimaryLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
