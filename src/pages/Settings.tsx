import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {

  const navigate = useNavigate();

  const [showReset, setShowReset] = useState(false);

  const [resetPassword, setResetPassword] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [newUsername, setNewUsername] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  useEffect(() => {

    if (
      !localStorage.getItem("adminUsername")
    ) {
      localStorage.setItem(
        "adminUsername",
        "admin"
      );
    }

    if (
      !localStorage.getItem("adminPassword")
    ) {
      localStorage.setItem(
        "adminPassword",
        "123456"
      );
    }

    setUsername(
      localStorage.getItem(
        "adminUsername"
      ) || "admin"
    );

  }, []);

  const saveCredentials = () => {

    if (
      !newUsername ||
      !newPassword
    ) {
      alert(
        "يرجى إدخال جميع البيانات"
      );
      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      alert(
        "كلمتا المرور غير متطابقتين"
      );
      return;
    }

    localStorage.setItem(
      "adminUsername",
      newUsername
    );

    localStorage.setItem(
      "adminPassword",
      newPassword
    );

    setUsername(newUsername);

    setNewUsername("");
    setNewPassword("");
    setConfirmPassword("");

    alert(
      "تم حفظ بيانات الدخول بنجاح"
    );
  };

  const logout = () => {
    const confirmLogout = window.confirm(
      "هل تريد تسجيل الخروج؟"
    );

    if (!confirmLogout) return;

    localStorage.removeItem(
      "isLoggedIn"
    );

    navigate("/login");

    window.location.reload();
  };

  const handleReset = () => {

    const adminPassword =
      localStorage.getItem(
        "adminPassword"
      ) || "123456";

    if (
      resetPassword !==
      adminPassword
    ) {
      alert(
        "كلمة المرور غير صحيحة"
      );
      return;
    }

    const orders = JSON.parse(
      localStorage.getItem(
        "orders"
      ) || "[]"
    );

    const activeOrders =
      orders.filter(
        (order: any) =>
          order.status !==
            "ملغي" &&
          order.status !==
            "مكتمل"
      );

    localStorage.setItem(
      "orders",
      JSON.stringify(
        activeOrders
      )
    );

    alert(
      "تمت إعادة الضبط بنجاح"
    );

    setShowReset(false);
    setResetPassword("");
  };

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        الإعدادات
      </h1>

      <div className="grid gap-6">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            بيانات المدير
          </h2>

          <p className="text-zinc-400">
            اسم المستخدم الحالي:
          </p>

          <p className="mt-2 text-xl">
            {username}
          </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            تغيير بيانات الدخول
          </h2>

          <div className="grid gap-4">

            <input
              placeholder="اسم المستخدم الجديد"
              value={newUsername}
              onChange={(e) =>
                setNewUsername(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-800 rounded-2xl p-4"
            />

            <input
              type="password"
              placeholder="كلمة المرور الجديدة"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-800 rounded-2xl p-4"
            />

            <input
              type="password"
              placeholder="تأكيد كلمة المرور"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-800 rounded-2xl p-4"
            />

            <button
              onClick={
                saveCredentials
              }
              className="bg-white text-black px-6 py-3 rounded-2xl font-bold"
            >
              حفظ البيانات
            </button>

          </div>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            الجلسة
          </h2>

          <p className="text-zinc-400 mb-6">
            تسجيل الخروج من المنظومة
          </p>

          <button
            onClick={logout}
            className="bg-yellow-500 text-black px-6 py-3 rounded-2xl font-bold"
          >
            تسجيل الخروج
          </button>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            إدارة المنظومة
          </h2>

          <p className="text-zinc-400 mb-6">
            حذف الطلبات الملغية والمكتملة فقط
          </p>

          <button
            onClick={() =>
              setShowReset(true)
            }
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl"
          >
            إعادة ضبط المنظومة
          </button>

        </div>

      </div>

      {showReset && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-[500px]">

            <h2 className="text-2xl font-bold mb-4 text-red-400">
              ⚠️ تنبيه
            </h2>

            <p className="mb-6 text-zinc-300">
              سيتم حذف الطلبات الملغية والمكتملة فقط.
            </p>

            <input
              type="password"
              placeholder="أدخل كلمة المرور"
              value={resetPassword}
              onChange={(e) =>
                setResetPassword(
                  e.target.value
                )
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl p-4 mb-6"
            />

            <div className="flex gap-4">

              <button
                onClick={handleReset}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl"
              >
                تأكيد
              </button>

              <button
                onClick={() => {
                  setShowReset(false);
                  setResetPassword("");
                }}
                className="bg-zinc-800 px-6 py-3 rounded-2xl"
              >
                إلغاء
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}