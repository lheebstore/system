import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<any[]>([]);

  const loadOrders = async () => {
    const querySnapshot = await getDocs(
      collection(db, "orders")
    );

    const data = querySnapshot.docs.map(
      (doc) => ({
        firebaseId: doc.id,
        ...doc.data(),
      })
    );

    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const cancelOrder = async (
    firebaseId: string
  ) => {
    const confirmCancel = window.confirm(
      "هل أنت متأكد من إلغاء الطلب؟"
    );

    if (!confirmCancel) return;

    await updateDoc(
      doc(db, "orders", firebaseId),
      {
        status: "ملغي",
      }
    );

    loadOrders();
  };

  const today = new Date();

  return (
    <div className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-5xl font-bold">
          الطلبات
        </h1>

        <button
          onClick={() =>
            navigate("/orders/add")
          }
          className="bg-white text-black px-5 py-3 rounded-2xl font-bold"
        >
          إضافة طلب
        </button>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

        <table className="w-full text-center">

          <thead className="bg-zinc-800">
            <tr>
              <th className="p-4">ORDER</th>
              <th className="p-4">العميل</th>
              <th className="p-4">المنتج</th>
              <th className="p-4">طريقة الدفع</th>
              <th className="p-4">السعر</th>
              <th className="p-4">المتبقي</th>
              <th className="p-4">الحالة</th>
              <th className="p-4">الإجراءات</th>
            </tr>
          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>
                <td
                  colSpan={8}
                  className="p-10 text-zinc-500"
                >
                  لا توجد طلبات
                </td>
              </tr>

            ) : (

              orders.map((order, index) => {

                let remainingText = "-";
                let status =
                  order.status || "قيد التنفيذ";

                let statusClass =
                  "text-white";

                let remainingClass =
                  "text-white";

                if (
                  order.status === "ملغي"
                ) {
                  statusClass =
                    "text-red-400";
                }

                else if (
                  order.duration ===
                  "دائمة"
                ) {
                  remainingText =
                    "∞";

                  statusClass =
                    "text-yellow-400";
                }

                else if (
                  order.duration
                ) {

                  const endDate =
                    new Date(
                      order.createdAt
                    );

                  endDate.setDate(
                    endDate.getDate() +
                      Number(
                        order.duration
                      )
                  );

                  const remainingDays =
                    Math.ceil(
                      (endDate.getTime() -
                        today.getTime()) /
                        (1000 *
                          60 *
                          60 *
                          24)
                    );

                  if (
                    remainingDays <= 0
                  ) {

                    status =
                      "مكتمل";

                    remainingText =
                      "EXPIRED";

                    statusClass =
                      "text-green-400";

                    remainingClass =
                      "text-green-400";
                  }

                  else {

                    remainingText =
                      `${remainingDays} DAYS`;

                    status =
                      "قيد التنفيذ";

                    statusClass =
                      "text-yellow-400";
                  }
                }

                return (

                  <tr
                    key={order.firebaseId}
                    className="border-t border-zinc-800"
                  >

                    <td className="p-4 font-bold">
                      #{index + 1}
                    </td>

                    <td className="p-4">
                      {order.customerName}
                    </td>

                    <td className="p-4">
                      {order.product}
                    </td>

                    <td className="p-4">
                      {order.paymentMethod}
                    </td>

                    <td className="p-4">
                      {order.price} LYD
                    </td>

                    <td
                      className={`p-4 ${remainingClass}`}
                    >
                      {remainingText}
                    </td>

                    <td
                      className={`p-4 ${statusClass}`}
                    >
                      {status}
                    </td>

                    <td className="p-4">

                      {status !==
                        "ملغي" && (

                        <button
                          onClick={() =>
                            cancelOrder(
                              order.firebaseId
                            )
                          }
                          className="bg-red-600 px-4 py-2 rounded-xl"
                        >
                          إلغاء
                        </button>

                      )}

                    </td>

                  </tr>
                );
              })

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}