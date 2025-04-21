import { Form, useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer, Zoom } from "react-toastify";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [error, setError] = useState(null);

  const handleValidation = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fullName.trim().length < 3) {
      setError("Full name must be at least 3 characters long");
    } else if (userName.trim().length < 3) {
      setError("Username must be at least 3 characters long");
    } else if (!email.match(emailPattern)) {
      setError("Email must be valid");
    } else if (password.trim().length < 6) {
      setError("Password must be at least 6 characters long");
    } else if (!avatar) {
      setError("Please upload an avatar Image");
    } else if (!termsAccepted) {
      setError("Please accept the terms and conditions");
    } else {
      class form {
        constructor() {
          this.fullName = fullName;
          this.userName = userName;
          this.email = email;
          this.password = password;
          this.avatar = avatar;
          this.coverImage = coverImage ? coverImage : null;
        }
      }
      console.log(coverImage);

      const formData = new form();

      axios
        .post("http://localhost:8000/api/v1/users/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 201) {
            localStorage.setItem(
              "refreshToken",
              response.data.data.refreshToken
            );
            localStorage.setItem("user", JSON.stringify(response.data.data));
            sessionStorage.setItem(
              "accessToken",
              response.data.data.accessToken
            );

            navigate("/videolistingpage");
          }
        })
        .catch((error) => {
          console.error(error);

          if (error.response && error.response.data === 409) {
            setError(error.response.data.message);
            navigate("/login");
          } else {
            setError("An error occurred. Please try again later.");
          }
        });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    }
    setError(null);
  }, [error]);

  return (
    <>
      <div className="min-h-screen bg-[#121212]">
        <div className="mx-auto flex w-full items-stretch justify-between gap-10">
          <div className="mt-20 flex w-full flex-col items-start justify-start p-6 md:w-1/2 lg:px-10">
            <div className="w-full">
              <h1 className="mb-2 text-5xl font-extrabold text-white">
                Register
              </h1>
              <p className="text-xs text-slate-400">
                Before we start, please create your account
              </p>
            </div>

            <div className="my-14 flex w-full flex-col items-start justify-start gap-4">
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <label className="text-xs text-slate-200">Full Name *</label>
                <input
                  placeholder="Enter a Full name"
                  autoComplete="false"
                  min={3}
                  max={50}
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <label className="text-xs text-slate-200">Username *</label>
                <input
                  placeholder="Enter a userName"
                  autoComplete="false"
                  min={3}
                  max={20}
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="flex w-full flex-col items-start justify-start gap-2">
                <label className="text-xs text-slate-200">Email *</label>
                <input
                  placeholder="Enter an email"
                  autoComplete="false"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="flex w-full flex-col items-start justify-start gap-2">
                <label className="text-xs text-slate-200">Password *</label>
                <div className="relative w-full">
                  <input
                    placeholder="Enter a password"
                    autoComplete="false"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    min={6}
                    max={20}
                    className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showPasswordCheckbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="showPasswordCheckbox"
                    className="text-xs text-slate-200"
                  >
                    Show Password
                  </label>
                </div>
              </div>
              <label className="text-xs text-slate-200">Avatar *</label>

              <div className="flex w-full flex-col items-start justify-start gap-2">
                <input
                  type="file"
                  id="profile_pic"
                  accept=".jpg, .jpeg, .png"
                  name="profile_pic"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file.size > 2 * 1024 * 1024) {
                      setError("File size exceeds 2MB");
                    }
                    setAvatar(file);
                  }}
                  className="p-3 w-full cursor-pointer rounded-lg border border-gray-500 bg-gray-800 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-purple-600 file:py-2 file:px-4 file:text-white hover:file:bg-purple-700"
                />
              </div>

              <label className="text-xs text-slate-200">Cover Image</label>

              <div className="flex w-full flex-col items-start justify-start gap-2">
                <input
                  type="file"
                  id="profile_pic"
                  name="profile_pic"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file.size > 2 * 1024 * 1024) {
                      setError("File size exceeds 2MB");
                    }
                    setCoverImage(file);
                  }}
                  className="p-3 w-full cursor-pointer rounded-lg border border-gray-500 bg-gray-800 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-purple-600 file:py-2 file:px-4 file:text-white hover:file:bg-purple-700"
                />
              </div>

              <div className="mr-4 flex items-center">
                <input
                  type="checkbox"
                  id="checkbox-1"
                  name="checkbox-1"
                  onChange={(e) => {
                    setNewsletterSubscribed(e.target.checked);
                  }}
                  checked={newsletterSubscribed}
                  className="absolute h-6 w-6 cursor-pointer opacity-0 [&:checked+div]:bg-green-500 [&:checked+div_svg]:block"
                />
                <div className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center border-[1px] border-white bg-transparent focus-within:border-white">
                  <svg
                    className="pointer-events-none hidden h-3 w-3 fill-current text-white"
                    version="1.1"
                    viewBox="0 0 17 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g
                        transform="translate(-9 -11)"
                        fill="#000000"
                        fillRule="nonzero"
                      >
                        <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label
                    htmlFor="checkbox-1"
                    className="text-sm font-medium text-white"
                  >
                    You will get emails on new features and releases
                  </label>
                </div>
              </div>

              <div className="mr-4 flex items-center">
                <input
                  type="checkbox"
                  id="checkbox-2"
                  name="checkbox-2"
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                  }}
                  checked={termsAccepted}
                  className="absolute h-6 w-6 cursor-pointer opacity-0 [&:checked+div]:bg-green-500 [&:checked+div_svg]:block"
                />
                <div className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center border-[1px] border-white bg-transparent focus-within:border-white">
                  <svg
                    className="pointer-events-none hidden h-3 w-3 fill-current text-white"
                    version="1.1"
                    viewBox="0 0 17 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g
                        transform="translate(-9 -11)"
                        fill="#000000"
                        fillRule="nonzero"
                      >
                        <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label
                    htmlFor="checkbox-2"
                    className="text-sm font-medium text-white"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>
              </div>
              <button
                onClick={() => {
                  handleValidation();
                }}
                className="w-full bg-[#ae7aff] p-3 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
              >
                Create Account
              </button>
              <p className="my-14 text-sm font-light text-white">
                Already registered?{" "}
                <span
                  className="cursor-pointer font-bold hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Sign in to your account
                </span>
              </p>
            </div>
          </div>
          <div className="fixed right-0 z-20 hidden h-screen w-1/2 md:block">
            <img
              className="h-full w-full object-cover"
              src="https://images.pexels.com/photos/1144275/pexels-photo-1144275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="register_image"
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
