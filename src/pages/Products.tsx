import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const savedProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    setProducts(savedProducts);
  }, []);

  const deleteProduct = (id: number) => {
    const confirmDelete = window.confirm(
      "هل أنت متأكد من حذف المنتج؟"
    );

    if (!confirmDelete) return;

    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );
  };

  return (
    <div className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-5xl font-bold">
          المنتجات
        </h1>

        <button
          onClick={() => navigate("/products/add")}
          className="bg-white text-black px-5 py-3 rounded-2xl flex items-center gap-2 font-bold"
        >
          <Plus size={20} />
          إضافة منتج
        </button>

      </div>

      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">

        <table className="w-full text-center">

          <thead className="bg-zinc-800">
            <tr>
              <th className="p-4">الصورة</th>
              <th className="p-4">المنتج</th>
              <th className="p-4">الشراء</th>
              <th className="p-4">البيع</th>
              <th className="p-4">الربح</th>
              <th className="p-4">المدة</th>
              <th className="p-4">الحالة</th>
              <th className="p-4">الإجراءات</th>
            </tr>
          </thead>

          <tbody>

            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="p-10 text-zinc-500"
                >
                  لا توجد منتجات
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-4">
                    {product.image && (
                      <img
                        src={product.image}
                        alt=""
                        className="w-14 h-14 rounded-xl object-cover mx-auto"
                      />
                    )}
                  </td>

                  <td className="p-4">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {product.buyPrice} LYD
                  </td>

                  <td className="p-4">
                    {product.sellPrice} LYD
                  </td>

                  <td className="p-4 text-green-400">
                    {product.profit} LYD
                  </td>

                  <td className="p-4">
                    {product.permanent
                      ? "دائمة"
                      : `${product.duration} يوم`}
                  </td>

                  <td className="p-4">
                    {product.status}
                  </td>

                  <td className="p-4">

  <div className="flex justify-center gap-4">

    <button
      onClick={() =>
        navigate(`/products/edit/${product.id}`)
      }
      className="text-blue-400"
    >
      <Pencil size={18} />
    </button>

    <button
      onClick={() =>
        deleteProduct(product.id)
      }
      className="text-red-400"
    >
      <Trash2 size={18} />
    </button>

  </div>

</td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}