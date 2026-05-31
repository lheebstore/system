import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function Dashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [showLoginAlert, setShowLoginAlert] =
    useState(false);

  useEffect(() => {

    const loadData = async () => {

      const ordersSnapshot =
        await getDocs(
          collection(db, "orders")
        );

      const productsSnapshot =
        await getDocs(
          collection(db, "products")
        );

      const ordersData =
        ordersSnapshot.docs.map(
          (doc) => ({
            firebaseId: doc.id,
            ...doc.data(),
          })
        );

      const productsData =
        productsSnapshot.docs.map(
          (doc) => ({
            firebaseId: doc.id,
            ...doc.data(),
          })
        );

      setOrders(ordersData);
      setProducts(productsData);
    };

    loadData();

    if (
      localStorage.getItem(
        "loginSuccess"
      )
    ) {

      setShowLoginAlert(true);

      setTimeout(() => {

        setShowLoginAlert(false);

        localStorage.removeItem(
          "loginSuccess"
        );

      }, 3000);

    }

  }, []);

  const activeOrders = orders.filter(
    (order) => order.status !== "ملغي"
  );

  const totalSales = activeOrders.reduce(
    (sum, order) => sum + Number(order.price || 0),
    0
  );

  const totalProfit = activeOrders.reduce(
    (sum, order) => sum + Number(order.profit || 0),
    0
  );

  const latestOrders = [...orders]
    .reverse()
    .slice(0, 5);

  const today = new Date();

  const expiringOrders = activeOrders.filter(
    (order) => {

      if (
        !order.duration ||
        order.duration === "دائمة"
      ) {
        return false;
      }

      const endDate = new Date(
        order.createdAt
      );

      endDate.setDate(
        endDate.getDate() +
        Number(order.duration)
      );

      const remainingDays = Math.ceil(
        (endDate.getTime() -
          today.getTime()) /
        (1000 * 60 * 60 * 24)
      );

      return (
        remainingDays > 0 &&
        remainingDays <= 7
      );

    }
  );

  return (
    <div className="p-8">

      {showLoginAlert && (

        <div className="mb-6 bg-green-500 text-black px-6 py-4 rounded-2xl font-bold">
          ✓ تم تسجيل الدخول بنجاح
        </div>

      )}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-white text-4xl font-bold">
            لوحة التحكم
          </h1>

          <p className="text-zinc-500 mt-4">
            نظرة عامة للمتجر
          </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-2xl text-white">
          المدير
        </div>

      </div>

      <div className="grid grid-cols-4 gap-5 mb-8">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-400">
            إجمالي المبيعات
          </p>

          <h2 className="text-white text-3xl font-bold mt-3">
            {totalSales.toFixed(2)} LYD
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-400">
            إجمالي الأرباح
          </p>

          <h2 className="text-white text-3xl font-bold mt-3">
            {totalProfit.toFixed(2)} LYD
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-400">
            عدد الطلبات
          </p>

          <h2 className="text-white text-3xl font-bold mt-3">
            {activeOrders.length}
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-400">
            عدد المنتجات
          </p>

          <h2 className="text-white text-3xl font-bold mt-3">
            {products.length}
          </h2>

        </div>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

        <h2 className="text-white text-2xl font-bold mb-5">
          أحدث الطلبات
        </h2>

        <div className="space-y-4">

          {latestOrders.length === 0 ? (

            <p className="text-zinc-500">
              لا توجد طلبات
            </p>

          ) : (

            latestOrders.map((order) => (

              <div
                key={order.firebaseId}
                className="flex justify-between text-zinc-300"
              >

                <span>
                  #{order.orderNumber || order.id}
                </span>

                <span>
                  {order.product}
                </span>

                <span>
                  {order.price} LYD
                </span>

              </div>

            ))

          )}

        </div>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mt-8">

        <h2 className="text-white text-2xl font-bold mb-5">
          ⚠️ اشتراكات قريبة من الانتهاء
        </h2>

        {expiringOrders.length === 0 ? (

          <p className="text-zinc-500">
            لا توجد اشتراكات قريبة من الانتهاء
          </p>

        ) : (

          <div className="space-y-3">

            {expiringOrders.map((order) => {

              const endDate = new Date(
                order.createdAt
              );

              endDate.setDate(
                endDate.getDate() +
                Number(order.duration)
              );

              const remainingDays = Math.ceil(
                (endDate.getTime() -
                  today.getTime()) /
                (1000 * 60 * 60 * 24)
              );

              return (

                <div
                  key={order.firebaseId}
                  className="flex justify-between items-center bg-black border border-zinc-800 rounded-2xl p-4"
                >

                  <span className="font-bold">
                    ORDER #{order.orderNumber || order.id}
                  </span>

                  <span>
                    {order.customerName}
                  </span>

                  <span>
                    {order.product}
                  </span>

                  <span
                    className={
                      remainingDays <= 3
                        ? "text-red-400 font-bold"
                        : "text-yellow-400 font-bold"
                    }
                  >
                    {remainingDays} DAYS
                  </span>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>
  );
}