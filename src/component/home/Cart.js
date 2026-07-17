import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./Cartcontext";

function Cart() {
    const [products, setProducts] = useState([]);
    const [cartState, setCartState] = useState(JSON.parse(localStorage.getItem("cart")) || {});
    const { updateCart } = useContext(CartContext);



    useEffect(() => {
        let token = localStorage.getItem("token");

        let config = {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
            },
        };

        // Lấy giỏ hàng tại thời điểm vào trang để gọi API
        let currentCart = JSON.parse(localStorage.getItem("cart")) || {};

        axios.post(
            "http://localhost/laravel8/laravel8/laravel8/public/api/product/cart",
            currentCart,
            config
        )
            .then((res) => {
                setProducts(res.data.data || []);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Hàm Tăng số lượng (+)
    function handleIncrement(id) {

        
        let newProducts = products.map((item) => {

            //  Kiểm tra id
            if (item.id === id) {

                return {...item, qty: item.qty + 1}; 
            }

            return item;
        });

        console.log("Danh sách sản phẩm: ", newProducts);

        setProducts(newProducts);

        //  Cập nhật localStorage
        let updatedCart = { ...cartState };

        if (updatedCart[id]) {
            updatedCart[id] += 1;
        } 

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        setCartState(updatedCart);
        updateCart();
    }

    // Hàm Giảm số lượng (-)
    function handleDecrement(id) {
        let updatedCart = { ...cartState };

        if (updatedCart[id] > 1) {
            updatedCart[id] -= 1;
        } else {
            // Nếu giảm xuống dưới 1, xóa hẳn khỏi local và danh sách hiển thị
            delete updatedCart[id];
            setProducts(products.filter(item => item.id !== id));
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartState(updatedCart);
        updateCart();
    }

    // Hàm Xóa sản phẩm (Delete)
    function handleDelete(id) {
        let updatedCart = { ...cartState };
        delete updatedCart[id];

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartState(updatedCart);
        setProducts(products.filter(item => item.id !== id));
        updateCart();
    }

    // Tính tổng tiền giỏ hàng realtime
    function calculateTotalCart() {
        return products.reduce((total, item) => {
            const qty = cartState[item.id] || 0;
            return total + (item.price * qty);
        }, 0);
    }

    return (
        <div className="container" style={{ marginTop: "30px", marginBottom: "50px" }}>
            <h2 className="text-center mb-4">Giỏ Hàng Của Bạn</h2>
            {products.length > 0 ? (
                <>
                    <table className="table table-bordered text-center">
                        <thead>
                            <tr className="table-light">
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => {
                                const qty = cartState[item.id] || 0;
                                return (
                                    <tr key={item.id}>
                                        <td >{item.name}</td>
                                        <td >{item.price}$</td>
                                        <td >
                                            <div className="d-flex justify-content-center align-items-center">
                                                <button
                                                    className="btn btn-sm btn-outline-secondary me-2"
                                                    onClick={() => handleDecrement(item.id)}
                                                >
                                                    -
                                                </button>
                                                <span className="fw-bold px-2">{qty}</span>
                                                <button
                                                    className="btn btn-sm btn-outline-secondary ms-2"
                                                    onClick={() => handleIncrement(item.id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="fw-bold text-danger">
                                            ${item.price * qty}
                                        </td>
                                        <td style={{ verticalAlign: "middle" }}>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-end mt-4">
                        <div className="card p-3" style={{ width: "300px" }}>
                            <h5>Tổng cộng: <span className="text-danger fw-bold">${calculateTotalCart()}</span></h5>
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-center mt-5">Giỏ hàng của bạn đang trống!</p>
            )}
        </div>
    );
}

export default Cart;