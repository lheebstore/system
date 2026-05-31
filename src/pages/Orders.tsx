import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    let counter = 1;

    const fixedOrders = savedOrders.map(
      (order: any) => ({
        ...order,
        orderNumber:
          order.orderNumber || counter++,
      })
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(fixedOrders)
    );

    setOrders(fixedOrders);
  }, []);

  const cancelOrder = (id: number) => {
    const confirmCancel = window.confirm(
      "هل أنت متأكد من إلغاء الطلب؟"
    );

    if (!confirmCancel) return;

    const updatedOrders = orders.map(
      (order) =>
        order.id === id
          ? {
              ...order,
              status: "ملغي",
            }
          : order
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    setOrders(updatedOrders);
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
              <th className="p-4">
                ORDER
              </th>

              <th className="p-4">
                العميل
              </th>

              <th className="p-4">
                المنتج
              </th>

              <th className="p-4">
                طريقة الدفع
              </th>

              <th className="p-4">
                السعر
              </th>

              <th className="p-4">
                المتبقي
              </th>

              <th className="p-4">
                الحالة
              </th>

              <th className="p-4">
                الإجراءات
              </th>
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

              orders.map((order) => {

                let remainingText = "-";
                let status =
                  order.status;

                let statusClass =
                  "text-white";

                let remainingClass =
                  "text-white";

                if (
                  order.status === "ملغي"
                ) {
                  status = "ملغي";

                  statusClass =
                    "text-red-400";
                }

                else if (
                  order.duration ===
                  "دائمة"
                ) {
                  remainingText =
                    "∞";

                  status =
                    "قيد التنفيذ";

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

                    status =
                      "قيد التنفيذ";

                    statusClass =
                      "text-yellow-400";

                    remainingText =
                      `${remainingDays} ${
                        remainingDays ===
                        1
                          ? "DAY"
                          : "DAYS"
                      }`;

                    if (
                      remainingDays <= 3
                    ) {
                      remainingClass =
                        "text-red-400 font-bold";
                    }

                    else if (
                      remainingDays <= 7
                    ) {
                      remainingClass =
                        "text-yellow-400 font-bold";
                    }
                  }
                }

                return (

                  <tr
                    key={order.id}
                    className="border-t border-zinc-800"
                  >

                    <td className="p-4 font-bold text-white">
                      #
                      {
                        order.orderNumber
                      }
                    </td>

                    <td className="p-4">
                      {
                        order.customerName
                      }
                    </td>

                    <td className="p-4">
                      {order.product}
                    </td>

                    <td className="p-4">
                      {
                        order.paymentMethod
                      }
                    </td>

                    <td className="p-4">
                      {order.price} LYD
                    </td>

                    <td
                      className={`p-4 ${remainingClass}`}
                    >
                      {
                        remainingText
                      }
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
                              order.id
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
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