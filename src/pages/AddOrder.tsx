import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AddOrder() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    product: "",
    paymentMethod: "كاش",
    notes: "",
  });

  useEffect(() => {
    const savedProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    setProducts(savedProducts);
  }, []);

  const saveOrder = () => {
    if (!formData.customerName || !formData.product) {
      alert("يرجى إدخال اسم العميل واختيار المنتج");
      return;
    }

    const orders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    let orderCounter = Number(
      localStorage.getItem("orderCounter") || "1"
    );

    const selectedProduct = products.find(
      (p) => p.name === formData.product
    );

    const order = {
      id: Date.now(),

      orderNumber: orderCounter,

      customerName: formData.customerName,

      phone: formData.phone,

      email: formData.email,

      product: formData.product,

      paymentMethod: formData.paymentMethod,

      price: Number(selectedProduct?.sellPrice || 0),

      profit: Number(selectedProduct?.profit || 0),

      status: "قيد التنفيذ",

      duration: selectedProduct?.permanent
        ? "دائمة"
        : selectedProduct?.duration || 0,

      createdAt: new Date().toISOString(),

      notes: formData.notes,
    };

    orders.push(order);

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    localStorage.setItem(
      "orderCounter",
      String(orderCounter + 1)
    );

    navigate("/orders");
  };

  return (
    <div className="p-8 text-white max-w-5xl mx-auto">

      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 bg-zinc-900 px-5 py-3 rounded-2xl border border-zinc-800"
      >
        <ArrowRight size={20} />
        رجوع
      </button>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <h1 className="text-4xl font-bold mb-8">
          إضافة طلب
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            placeholder="اسم العميل *"
            className="bg-black border border-zinc-800 rounded-2xl p-4"
            value={formData.customerName}
            onChange={(e) =>
              setFormData({
                ...formData,
                customerName: e.target.value,
              })
            }
          />

          <input
            placeholder="رقم الهاتف (اختياري)"
            className="bg-black border border-zinc-800 rounded-2xl p-4"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
          />

          <input
            placeholder="البريد الإلكتروني (اختياري)"
            className="bg-black border border-zinc-800 rounded-2xl p-4"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <select
            className="bg-black border border-zinc-800 rounded-2xl p-4"
            value={formData.product}
            onChange={(e) =>
              setFormData({
                ...formData,
                product: e.target.value,
              })
            }
          >
            <option value="">
              اختر المنتج
            </option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.name}
              >
                {product.name}
              </option>
            ))}
          </select>

          <select
            className="bg-black border border-zinc-800 rounded-2xl p-4"
            value={formData.paymentMethod}
            onChange={(e) =>
              setFormData({
                ...formData,
                paymentMethod: e.target.value,
              })
            }
          >
            <option>كاش</option>
            <option>تحويل مصرفي</option>
            <option>رصيد</option>
          </select>

          <textarea
            rows={5}
            placeholder="ملاحظات"
            className="bg-black border border-zinc-800 rounded-2xl p-4 md:col-span-2"
            value={formData.notes}
            onChange={(e) =>
              setFormData({
                ...formData,
                notes: e.target.value,
              })
            }
          />

        </div>

        <button
          onClick={saveOrder}
          className="mt-8 bg-white text-black px-8 py-4 rounded-2xl font-bold"
        >
          حفظ الطلب
        </button>

      </div>

    </div>
  );
}