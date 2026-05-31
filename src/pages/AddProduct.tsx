import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    buyPrice: "",
    sellPrice: "",
    duration: "",
    permanent: false,
    status: "متوفر",
    notes: "",
    image: "",
  });

  const saveProduct = () => {
    if (
      !formData.name ||
      !formData.buyPrice ||
      !formData.sellPrice
    ) {
      alert("يرجى تعبئة الحقول المطلوبة");
      return;
    }

    const product = {
      id: Date.now(),
      ...formData,
      profit:
        Number(formData.sellPrice) -
        Number(formData.buyPrice),
    };

    const savedProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    savedProducts.push(product);

    localStorage.setItem(
      "products",
      JSON.stringify(savedProducts)
    );

    navigate("/products");
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
          إضافة منتج
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            placeholder="اسم المنتج"
            className="bg-black border border-zinc-800 rounded-2xl p-4"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <input
         type="file"
         accept="image/*"
         className="bg-black border border-zinc-800 rounded-2xl p-4"
         onChange={(e) => {
         const file = e.target.files?.[0];

         if (!file) return;

         const reader = new FileReader();

         reader.onloadend = () => {
         setFormData({
         ...formData,
          image: reader.result as string,
      });
    };

    reader.readAsDataURL(file);
  }}
/>
{formData.image && (
  <img
    src={formData.image}
    alt="preview"
    className="w-32 h-32 rounded-2xl object-cover border border-zinc-800"
  />
)}

          <input
            type="number"
            step="0.01"
            placeholder="سعر الشراء"
            className="bg-black border border-zinc-800 rounded-2xl p-4"
            value={formData.buyPrice}
            onChange={(e) =>
              setFormData({
                ...formData,
                buyPrice: e.target.value,
              })
            }
          />

          <input
            type="number"
            step="0.01"
            placeholder="سعر البيع"
            className="bg-black border border-zinc-800 rounded-2xl p-4"
            value={formData.sellPrice}
            onChange={(e) =>
              setFormData({
                ...formData,
                sellPrice: e.target.value,
              })
            }
          />

          <select
            className="bg-black border border-zinc-800 rounded-2xl p-4"
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
          >
            <option>متوفر</option>
            <option>متوقف</option>
          </select>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.permanent}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  permanent: e.target.checked,
                })
              }
            />

            <span>خدمة دائمة</span>
          </div>

          {!formData.permanent && (
            <input
              type="number"
              placeholder="مدة الخدمة بالأيام"
              className="bg-black border border-zinc-800 rounded-2xl p-4"
              value={formData.duration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: e.target.value,
                })
              }
            />
          )}

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
          onClick={saveProduct}
          className="mt-8 bg-white text-black px-8 py-4 rounded-2xl font-bold"
        >
          حفظ المنتج
        </button>

      </div>

    </div>
  );
}