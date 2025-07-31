import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const RequireLogin = () => {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(5);
  const duration = 5; // seconds

  useEffect(() => {
    const start = Date.now();
    let frame;
    const animate = () => {
      const elapsed = (Date.now() - start) / 1000;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);
      setRemaining(Math.max(duration - elapsed, 0));
      if (elapsed < duration) {
        frame = requestAnimationFrame(animate);
      } else {
        navigate("/login");
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md flex flex-col items-center relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          You need to login first
        </h2>
        <p className="text-gray-500 mb-6">
          Redirecting to login page in 5 seconds...
        </p>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-400">{remaining.toFixed(1)}s</span>
      </div>
    </div>
  );
};

export default RequireLogin;
