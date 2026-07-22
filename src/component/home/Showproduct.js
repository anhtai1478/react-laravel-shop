import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function Showproduct() {
    const [product, setProduct] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        let token = localStorage.getItem('token');

        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json'
            }
        };

        axios.get("http://localhost/laravel8/laravel8/laravel8/public/api/product", config)
            .then((res) => {
                console.log(res.data.data);
                setProduct(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    function addToCart(e, id) {
        e.preventDefault();

        let cart = JSON.parse(localStorage.getItem("cart")) || {};

        if (cart[id]) {
            // Nếu ĐÃ CÓ: tăng số lượng lên 1
            cart[id] = Number(cart[id]) + 1;
        } else {
            // Nếu CHƯA CÓ: đặt mặc định số lượng ban đầu là 1
            cart[id] = 1;
        }

        // 3. Lưu ngược lại vào localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        let total = 0;

        for (const itemId in cart) {
            total += cart[itemId];
        }

        // Cập nhật Redux
        dispatch({
            type: "UPDATE_CART",
            payload: total,
        });

        console.log("Giỏ hàng hiện tại :", cart);
    }

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 padding-right">
                        <div className="features_items">
                            <h2 className="title text-center">Features Items</h2>

                            {product && product.length > 0 ? (
                                product.map((item, index) => {
                                    let imageUrl = "";
                                    try {
                                        const images = JSON.parse(item.image || "[]");
                                        if (Array.isArray(images) && images.length > 0) {
                                            imageUrl = `http://localhost/laravel8/laravel8/laravel8/public/upload/product/${item.id_user}/${images[0]}`;
                                        }
                                    } catch (error) {
                                        imageUrl = "";
                                    }

                                    return (
                                        <div className="col-sm-4" key={item.id || index}>
                                            <div className="product-image-wrapper">
                                                <div className="single-products">

                                                    <div className="productinfo text-center">
                                                        <img src={imageUrl} alt={item.name} />
                                                        <h2>${item.price}</h2>
                                                        <p>{item.name}</p>
                                                        <a
                                                            href="#"
                                                            className="btn btn-default add-to-cart"
                                                            onClick={(e) => addToCart(e, item.id)}
                                                        >
                                                            <i className="fa fa-shopping-cart"></i>
                                                            Add to cart
                                                        </a>
                                                    </div>

                                                    <div className="product-overlay">
                                                        <div className="overlay-content">
                                                            <h2>${item.price}</h2>
                                                            <p>{item.name}</p>
                                                            <a
                                                                href="#"
                                                                className="btn btn-default add-to-cart"
                                                                onClick={(e) => addToCart(e, item.id)}
                                                            >
                                                                <i className="fa fa-shopping-cart"></i>
                                                                Add to cart
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="choose">
                                                    <ul className="nav nav-pills nav-justified">
                                                        <li>
                                                            <a href="#">
                                                                <i className="fa fa-plus-square"></i>
                                                                Add to wishlist
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <Link to={`/productdetail/${item.id}`}>
                                                                <i className="fa fa-plus-square"></i>
                                                                Product Detail
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-center">
                                    Không có sản phẩm nào hoặc chưa tải xong dữ liệu...
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Showproduct;