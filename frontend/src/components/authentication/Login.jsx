import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast, ToastContainer, Zoom } from "react-toastify";
import ErrorPage from "../../utils/ErrorPage";
import { API_BASE_URL } from "../../utils/constant";
import { startLoading, stopLoading } from "../../store/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/Loader";
import "../../utils/Login.css";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.loader.isLoading);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/videolistingpage");
    }
  }, [navigate]);

  const loginUser = async () => {
    try {
      if (emailRef.current.value && passwordRef.current.value) {
        await dispatch(startLoading());
        await axios
          .post(`${API_BASE_URL}/login`, {
            email: emailRef.current.value,
            userName: emailRef.current.value,
            password: passwordRef.current.value,
          })
          .then((response) => {
            if (response.status === 200) {
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
            if (!error.response) {
              setErrorMessage(
                "Unable to connect to server. Please try again later."
              );
              toast.error(
                "Unable to connect to server. Please try again later.",
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  transition: Zoom,
                }
              );
              return;
            }
            if (
              error.response.status === 503 &&
              error.response.data.message &&
              error.response.data.message.includes("Database Connection Error")
            ) {
              setErrorMessage("Database Connection Error");
              toast.error("Database Connection Error", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Zoom,
              });
              return;
            }
            if (error.response.status === 400) {
              toast.error("Invalid email or password", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Zoom,
              });
              console.error("Invalid email or password");
              navigate("/login");
              return;
            }
            toast.error("An unexpected error occurred.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Zoom,
            });
          });
      } else {
        toast.error("Please enter Email & Password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Zoom,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <>
      {errorMessage && <ErrorPage message={errorMessage} />}
      {isLoading && <Loader />}
      <ToastContainer />

      <div className="relative h-screen w-full overflow-hidden bg-[#070D17] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Animated Background Layers */}
        <div className="stars-layer pointer-events-none"></div>
        <div className="gradient-orbs pointer-events-none"></div>

        {/* Shuttle Animation */}
        <div className="shuttle" aria-hidden="true">
          <div className="shuttle-body">
            <div className="window" />
            <div className="fin fin-left" />
            <div className="fin fin-right" />
            <div className="flame">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        {/* Glow Accent */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_20%_30%,rgba(14,165,233,0.15),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.15),transparent_55%)]"></div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="mb-10 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 ring-1 ring-white/10 backdrop-blur">
                <svg
                  className="w-14"
                  viewBox="0 0 63 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M47.25 47.458C55.9485 38.7595 55.9485 24.6565 47.25 15.958C38.5515 7.25952 24.4485 7.25952 15.75 15.958C7.05151 24.6565 7.05151 38.7595 15.75 47.458C24.4485 56.1565 38.5515 56.1565 47.25 47.458Z"
                    stroke="#D9FDFE"
                    strokeWidth="1.4"
                    strokeMiterlimit="10"
                  ></path>
                  <path
                    d="M10.5366 47.7971V17.5057C10.5366 16.9599 11.1511 16.6391 11.599 16.9495L33.4166 32.0952C33.8041 32.3639 33.8041 32.9368 33.4166 33.2076L11.599 48.3533C11.1511 48.6657 10.5366 48.3429 10.5366 47.7971Z"
                    stroke="url(#paint0_linear_new)"
                    strokeWidth="7"
                    strokeLinecap="round"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_new"
                      x1="2.23416"
                      y1="20.3361"
                      x2="26.863"
                      y2="44.9649"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#0EA5E9"></stop>
                      <stop offset="1" stopColor="#10B981"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Sign in to continue your journey
              </p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_4px_24px_-4px_rgba(0,0,0,0.6),0_8px_40px_-8px_rgba(14,165,233,0.15)] backdrop-blur-md">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  loginUser();
                }}
              >
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-300"
                >
                  Email or Username
                </label>
                <div className="relative mb-6">
                  <input
                    ref={emailRef}
                    id="email"
                    type="text" // changed from "email" to allow usernames without '@'
                    inputMode="email"
                    autoComplete="username"
                    placeholder="username or you@example.com"
                    className="peer w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 peer-focus:opacity-100 ring-2 ring-cyan-500/40 transition"></div>
                </div>

                <label
                  htmlFor="password"
                  className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-300"
                >
                  Password
                </label>
                <div className="relative mb-2">
                  <input
                    id="password"
                    ref={passwordRef}
                    type="password"
                    placeholder="••••••••"
                    className="peer w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 peer-focus:opacity-100 ring-2 ring-emerald-500/40 transition"></div>
                </div>

                <div className="mb-6 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      emailRef.current.value = "thor";
                      passwordRef.current.value = "12345678";
                    }}
                    className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition"
                  >
                    Fill Demo Credentials
                  </button>
                </div>

                <button
                  type="submit"
                  className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-slate-900 shadow ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 active:scale-[0.985]"
                >
                  <span className="relative z-10">Sign In</span>
                  <span className="absolute inset-0 -z-0 opacity-0 transition group-hover:opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_60%)]" />
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-400">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="cursor-pointer font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  Sign Up
                </span>
              </div>
            </div>

            <p
              onClick={async () => {
                emailRef.current.value = "thor";
                passwordRef.current.value = "12345678";
              }}
              className="mt-6 cursor-pointer rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-center text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200 transition"
            >
              Quick Demo (Auto Fill)
            </p>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
