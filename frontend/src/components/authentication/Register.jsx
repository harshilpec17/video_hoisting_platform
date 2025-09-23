// ...existing code...
import { Form, useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer, Zoom } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constant";

const Register = () => {
  const navigate = useNavigate();

  // ...existing code...
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

  // ...existing code...
  const handleValidation = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fullName.trim().length < 3) {
      setError("Full name must be at least 3 characters long");
      return;
    } else if (userName.trim().length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    } else if (!email.match(emailPattern)) {
      setError("Email must be valid");
      return;
    } else if (password.trim().length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    } else if (!avatar) {
      setError("Please upload an avatar Image");
      return;
    } else if (!termsAccepted) {
      setError("Please accept the terms and conditions");
      return;
    } else {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar); // use the File directly (not avatar[0])
      if (coverImage) formData.append("coverImage", coverImage);
      formData.append("newsletterSubscribed", String(newsletterSubscribed));

      console.log(formData);

      try {
        const response = await axios.post(
          `${API_BASE_URL}/register`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          console.log(response);

          localStorage.setItem("refreshToken", response.data.data.refreshToken);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          sessionStorage.setItem("accessToken", response.data.data.accessToken);

          navigate("/videolistingpage");
        }
      } catch (err) {
        const status = err.response ? err.response.status : 500;
        if (status === 400) {
          setError(
            err.response.data.message || "An error occurred. Please try again."
          );
          navigate("/login");
        }
        if (status === 409) {
          setError("User already exists. Please login.");
          navigate("/login");
        } else {
          toast.error("Registration failed. Please try again.");
          // optional: console.error(err);
        }
      }
    }
  };

  // ...existing code...
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
      {/* Styles for custom animation (shuttle + stars) */}
      <style>{`
        .bg-grid {
          background-image:
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0);
          background-size: 40px 40px, 80px 80px;
        }
        @keyframes shuttle-flight {
          0% { transform: translate3d(-10%, -10%, 0) rotate(8deg) scale(0.9); opacity: 0; }
          10% { opacity: 0.8; }
          50% { transform: translate3d(50vw, 10vh, 0) rotate(2deg) scale(1); opacity: 0.9; }
          100% { transform: translate3d(110vw, -5vh, 0) rotate(-6deg) scale(0.95); opacity: 0; }
        }
        .shuttle-wrapper {
          animation: shuttle-flight 28s linear infinite;
          filter: drop-shadow(0 0 6px rgba(0,255,200,0.35));
        }
        .glass {
          backdrop-filter: blur(18px) saturate(140%);
          background: linear-gradient(135deg, rgba(30,41,59,0.75), rgba(15,23,42,0.6) 60%, rgba(0,0,0,0.55));
          border: 1px solid rgba(255,255,255,0.09);
        }
        .input-base {
          transition: border-color .25s, background .25s, box-shadow .25s;
        }
        .input-base:focus {
          outline: none;
          border-color: #0ea5e9;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.25);
          background: rgba(0,0,0,0.55);
        }
        .btn-primary {
          background: linear-gradient(90deg,#0d9488,#0ea5e9 55%,#06b6d4);
          color: #0f172a;
        }
        .btn-primary:hover {
          filter: brightness(1.08);
        }
        .btn-primary:active {
          transform: translateY(2px);
          filter: brightness(.95);
        }
        .file-input::-webkit-file-upload-button {
          cursor: pointer;
        }
        .file-input::file-selector-button {
          background: #0d9488;
          color: #f8fafc;
          border: none;
          padding: 0.5rem 0.9rem;
          margin-right: 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: .05em;
          transition: background .25s, transform .25s;
        }
        .file-input::file-selector-button:hover {
          background: #0f766e;
        }
        .file-input::file-selector-button:active {
          background: #115e59;
          transform: translateY(1px);
        }
      `}</style>

      <div className="relative min-h-screen overflow-hidden bg-[#0b0f17] text-white">
        {/* Animated gradient aura */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-1/3 -left-1/3 h-[70vh] w-[70vh] rounded-full bg-cyan-600/10 blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-[60vh] w-[60vh] rounded-full bg-teal-500/10 blur-[120px]" />
        </div>

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid opacity-40" />

        {/* Shuttle animation layer */}
        <div className="pointer-events-none absolute top-10 left-0 z-0 shuttle-wrapper">
          <svg
            width="140"
            height="140"
            viewBox="0 0 256 256"
            fill="none"
            className="opacity-90"
          >
            <defs>
              <linearGradient id="body" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
              <linearGradient id="flame" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="60%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
            </defs>
            <path
              d="M128 20c38 34 60 78 60 122 0 22-8 44-24 64l-72 0c-16-20-24-42-24-64 0-44 22-88 60-122z"
              fill="url(#body)"
              stroke="#0f172a"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <circle
              cx="128"
              cy="126"
              r="28"
              fill="#0f172a"
              stroke="#38bdf8"
              strokeWidth="6"
            />
            <path
              d="M98 206h60c4 0 6 4 4 7l-16 26c-2 3-6 5-10 5h-16c-4 0-8-2-10-5l-16-26c-2-3 0-7 4-7z"
              fill="#1e293b"
              stroke="#0ea5e9"
              strokeWidth="5"
            />
            <path
              d="M128 237c0 14-6 24-18 34-2 2-6 0-6-3 0-14 6-24 18-34 2-2 6 0 6 3z"
              fill="url(#flame)"
              opacity=".85"
            />
          </svg>
        </div>

        {/* Content wrapper */}
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
          <div className="w-full max-w-xl rounded-2xl glass p-8 shadow-2xl shadow-black/60">
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Join the platform. Complete the form below.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300">
                  Full Name *
                </label>
                <input
                  placeholder="Jane Doe"
                  autoComplete="off"
                  min={3}
                  max={50}
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  className="input-base w-full rounded-lg border border-slate-600/60 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500"
                />
              </div>

              {/* Username */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300">
                  Username *
                </label>
                <input
                  placeholder="jane_doe"
                  autoComplete="off"
                  min={3}
                  max={20}
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  className="input-base w-full rounded-lg border border-slate-600/60 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300">
                  Email *
                </label>
                <input
                  placeholder="you@example.com"
                  autoComplete="off"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="input-base w-full rounded-lg border border-slate-600/60 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300">
                  Password *
                </label>
                <div className="relative">
                  <input
                    placeholder="********"
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    min={6}
                    max={20}
                    className="input-base w-full rounded-lg border border-slate-600/60 bg-slate-900/60 px-4 py-3 pr-14 text-sm text-white placeholder:text-slate-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <label className="flex cursor-pointer select-none items-center gap-2 text-[10px] font-medium text-slate-300">
                      <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className="h-4 w-4 cursor-pointer accent-teal-500"
                      />
                      Show
                    </label>
                  </div>
                </div>
              </div>

              {/* Avatar */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300">
                  Avatar *
                </label>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    console.log(file);

                    if (file && file.size > 2 * 1024 * 1024) {
                      setError("File size exceeds 2MB");
                      setAvatar(null);
                      return;
                    }
                    setAvatar(file);
                  }}
                  className="file-input input-base w-full rounded-lg border border-slate-600/60 bg-slate-900/60 px-3 py-2 text-sm text-slate-200"
                />
              </div>

              {/* Cover Image */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300">
                  Cover Image
                </label>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.size > 2 * 1024 * 1024) {
                      setError("File size exceeds 2MB");
                    }
                    setCoverImage(file);
                  }}
                  className="file-input input-base w-full rounded-lg border border-slate-600/60 bg-slate-900/60 px-3 py-2 text-sm text-slate-200"
                />
              </div>

              {/* Newsletter */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="checkbox-1"
                  onChange={(e) => {
                    setNewsletterSubscribed(e.target.checked);
                  }}
                  checked={newsletterSubscribed}
                  className="mt-0.5 h-5 w-5 cursor-pointer rounded border border-slate-500 bg-slate-800 text-teal-500 accent-teal-500"
                />
                <label
                  htmlFor="checkbox-1"
                  className="cursor-pointer text-sm text-slate-300"
                >
                  You will get emails on new features and releases
                </label>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="checkbox-2"
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                  }}
                  checked={termsAccepted}
                  className="mt-0.5 h-5 w-5 cursor-pointer rounded border border-slate-500 bg-slate-800 text-teal-500 accent-teal-500"
                />
                <label
                  htmlFor="checkbox-2"
                  className="cursor-pointer text-sm text-slate-300"
                >
                  I agree to the terms and conditions
                </label>
              </div>

              {/* Submit */}
              <button
                onClick={() => {
                  handleValidation();
                }}
                className="btn-primary group cursor-pointer relative mt-2 w-full rounded-lg px-6 py-3 text-sm font-bold tracking-wide shadow-[0_0_0_0_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_8px_25px_-5px_rgba(6,182,212,0.35)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Create Account</span>
                  <span className="inline-block translate-x-0 transition-transform duration-300 group-hover:translate-x-1">
                    🚀
                  </span>
                </span>
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-400/0 via-cyan-300/10 to-teal-400/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              </button>

              {/* Login link */}
              <p className="pt-4 text-center text-sm text-slate-400">
                Already registered?{" "}
                <span
                  className="cursor-pointer font-semibold text-teal-400 hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </span>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
