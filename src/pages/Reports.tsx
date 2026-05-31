import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Reports() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    const querySnapshot =
      await getDocs(
        collection(db, "orders")
      );

    const data =
      querySnapshot.docs.map(
        (doc) => ({
          firebaseId: doc.id,
          ...doc.data(),
        })
      );

    setOrders(data);
  };

  const activeOrders = orders.filter(
    (order) => order.status !== "ملغي"
  );

  const totalSales = activeOrders.reduce(
    (sum, order) =>
      sum + Number(order.price || 0),
    0
  );

  const totalProfit = activeOrders.reduce(
    (sum, order) =>
      sum + Number(order.profit || 0),
    0
  );

  const productCounts: Record<
    string,
    number
  > = {};

  activeOrders.forEach((order) => {
    productCounts[order.product] =
      (productCounts[order.product] || 0) + 1;
  });

  const topProducts = Object.entries(
    productCounts
  )
    .map(([name, count]) => ({
      name,
      count,

      percentage:
        activeOrders.length > 0
          ? (
              (count /
                activeOrders.length) *
              100
            ).toFixed(1)
          : "0",
    }))
    .sort(
      (a, b) =>
        b.count - a.count
    );

  const mostRequested =
    topProducts.length > 0
      ? topProducts[0].name
      : "لا يوجد";

  const chartData =
    topProducts.map((item) => ({
      name: item.name,
      الطلبات: item.count,
    }));

  return (
    <div className="p-8 text-white">

      <h1 className="text-5xl font-bold mb-8">
        التقارير
      </h1>

      <div className="grid grid-cols-4 gap-5 mb-8">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-400">
            إجمالي المبيعات
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {totalSales.toFixed(2)} LYD
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-400">
            إجمالي الأرباح
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {totalProfit.toFixed(2)} LYD
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-400">
            عدد الطلبات
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {activeOrders.length}
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-400">
            الأكثر طلباً
          </p>

          <h2 className="text-xl font-bold mt-3">
            {mostRequested}
          </h2>

        </div>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          المنتجات الأكثر طلباً
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-center">

            <thead>

              <tr className="border-b border-zinc-800">

                <th className="p-4">
                  المنتج
                </th>

                <th className="p-4">
                  عدد الطلبات
                </th>

                <th className="p-4">
                  النسبة
                </th>

              </tr>

            </thead>

            <tbody>

              {topProducts.length === 0 ? (

                <tr>

                  <td
                    colSpan={3}
                    className="p-8 text-zinc-500"
                  >
                    لا توجد بيانات
                  </td>

                </tr>

              ) : (

                topProducts.map(
                  (item) => (

                    <tr
                      key={item.name}
                      className="border-b border-zinc-800"
                    >

                      <td className="p-4">
                        {item.name}
                      </td>

                      <td className="p-4">
                        {item.count}
                      </td>

                      <td className="p-4">
                        {item.percentage}%
                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          الرسم البياني للطلبات
        </h2>

        <div
          style={{
            width: "100%",
            height: 350,
          }}
        >

          <ResponsiveContainer>

            <BarChart
              data={chartData}
            >

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="الطلبات"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}