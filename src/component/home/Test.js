import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Showproduct() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        axios.get(
            "http://localhost/laravel8/laravel8/laravel8/public/api/product"
        )
            .then((res) => {

                console.log(res.data);

                setProducts(res.data.data);

            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    function handleAddCart(product) {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Đã thêm vào giỏ hàng");

    }

    return (
        <div className="features_items">

            <h2 className="title text-center">
                Features Items
            </h2>

            {products.map((item) => {

                    let imgArr = [];

                    try {
                        imgArr = JSON.parse(item.image);
                    } catch (e) {
                        imgArr = [];
                    }

                    let imageUrl = "";

                    if (imgArr.length > 0) {
                        imageUrl =
                            `http://localhost/laravel8/laravel8/laravel8/public/upload/product/${item.id_user}/${imgArr[0]}`;
                    }

                    return (
                        <div
                            className="col-sm-4"
                            key={item.id}
                        >
                            <div className="product-image-wrapper">

                                <div className="single-products">

                                    <div className="productinfo text-center">

                                        <img
                                            src={imageUrl}
                                            alt={item.name}
                                        />

                                        <h2>
                                            ${item.price}
                                        </h2>

                                        <p>
                                            {item.name}
                                        </p>

                                        <button
                                            className="btn btn-default add-to-cart"
                                            onClick={() => handleAddCart(item)}
                                        >
                                            Add To Cart
                                        </button>

                                        <br />
                                        <br />

                                        <button
                                            className="btn btn-primary"
                                            onClick={() =>
                                                navigate(`/product-detail/${item.id}`)
                                            }
                                        >
                                            View More
                                        </button>

                                    </div>

                                </div>

                            </div>
                        </div>
                    );

                })
            }

        </div>
    );
}

export default Showproduct;