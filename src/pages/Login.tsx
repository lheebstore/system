import { useState, useEffect } from "react";

export default function Login() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (
      !localStorage.getItem(
        "adminUsername"
      )
    ) {
      localStorage.setItem(
        "adminUsername",
        "admin"
      );
    }

    if (
      !localStorage.getItem(
        "adminPassword"
      )
    ) {
      localStorage.setItem(
        "adminPassword",
        "123456"
      );
    }

  }, []);

  const login = () => {

    setLoading(true);

    setTimeout(() => {

      const savedUsername =
        localStorage.getItem(
          "adminUsername"
        ) || "admin";

      const savedPassword =
        localStorage.getItem(
          "adminPassword"
        ) || "123456";

      if (
        username === savedUsername &&
        password === savedPassword
      ) {

        localStorage.setItem(
          "loginSuccess",
          "true"
        );

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        window.location.href = "/";

      } else {

        alert(
          "اسم المستخدم أو كلمة المرور غير صحيحة"
        );

        setLoading(false);

      }

    }, 1000);

  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-[420px]">

        <div className="text-center mb-8">

          <img
            src="/logo.PNG"
            alt="LHEB STORE"
            className="w-32 h-32 rounded-3xl object-cover mx-auto mb-5"
          />

          <h1 className="text-white text-4xl font-bold">
            LHEB STORE
          </h1>

        </div>

        <div className="space-y-4">

          <input
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="w-full bg-black border border-zinc-800 rounded-2xl p-4 text-white"
          />

          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full bg-black border border-zinc-800 rounded-2xl p-4 text-white"
          />

          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-2xl font-bold disabled:opacity-60"
          >
            {loading
              ? "⏳ جاري تسجيل الدخول..."
              : "تسجيل الدخول"}
          </button>

        </div>

      </div>

    </div>
  );
}