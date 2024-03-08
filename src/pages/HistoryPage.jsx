import { useState, useEffect } from "react";
import { supabase } from "../createClient";
import { useAuth } from "../auth/AuthProvider";

const HistoryPage = () => {
  const [checkoutData, setCheckoutData] = useState([]);
  const { user, role } = useAuth();

  async function fetchCheckoutData() {
    try {
      let { data, error } = [];
      if (user.role === "admin") {
        ({ data, error } = await supabase.from("checkout").select("*"));
      } else {
        ({ data, error } = await supabase
          .from("checkout")
          .select("*")
          .eq("user_id", user.id));
      }
      if (error) {
        throw error;
      }
      const formattedData = data.map((item) => {
        return {
          ...item,
          created_at: new Date(item.created_at).toLocaleString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
        };
      });
      setCheckoutData(formattedData);
    } catch (error) {
      console.error("Error fetching checkout data:", error.message);
    }
  }

  const deleteCheckout = async (id) => {
    try {
      const { error } = await supabase.from("checkout").delete().eq("id", id);
      if (error) {
        throw error;
      }
      // Refetch checkout data after deletion
      fetchCheckoutData();
    } catch (error) {
      console.error("Error deleting checkout:", error.message);
    }
  };

  const toRupiah = (price, options = {}) => {
    const dot = options.dot || ".";
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(price).replace(",", dot);
  };

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  return (
    <>
      <section>
        <h2 className="py-8 font-bold text-3xl text-center text-black italic underline">
          transaction history
        </h2>
        <div className="px-5">
          <div className="overflow-x-auto">
            <table className="table table-zebra text-center">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product Name</th>
                  <th>Total Price</th>
                  <th>Checkout At</th>
                  { role === "admin" && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {checkoutData.map((i, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{i.product_name}</td>
                    <td>{toRupiah(i.price_total)}</td>
                    <td>{i.created_at}</td>
                    { role === "admin" && (
                      <td>
                        <button
                          onClick={() => deleteCheckout(i.id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default HistoryPage;
