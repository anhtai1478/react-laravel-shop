import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './myproduct.css';

function Myproduct() {
    const [myproduct, setMyproduct] = useState([]);
    // usestase thay doi la html chay lai 
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");

        let config = {
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json",
            }
        };

        axios.get('http://localhost/laravel8/laravel8/laravel8/public/api/user/my-product', config)
            .then((res) => {
                console.log("Dữ liệu gốc từ API:", res.data);

                if (res.data && res.data.data) {
                    if (!Array.isArray(res.data.data)) {
                        setMyproduct(Object.values(res.data.data));
                    } else {
                        setMyproduct(res.data.data);
                    }
                } else {
                    if (res.data && !Array.isArray(res.data)) {
                        setMyproduct(Object.values(res.data));
                    } else {
                        setMyproduct(res.data || []);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function renderImage(item) {
        try {
            if (!item.image) return <span>No Image</span>;

            const imagesArray = JSON.parse(item.image);

            if (Array.isArray(imagesArray) && imagesArray.length > 0) {
                const firstImage = imagesArray[0];
                const imageUrl = `http://localhost/laravel8/laravel8/laravel8/public/upload/product/${item.id_user}/${firstImage}`;

                return <img src={imageUrl} alt={item.name} />;
            }
        } catch (error) {
            console.error("Lỗi khi parse JSON ảnh:", error);
        }
        return <span>No Image</span>;
    }

    function getMyProduct() {
        let token = localStorage.getItem("token");

        let config = {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json"
            }
        };

        axios.get("http://localhost/laravel8/laravel8/laravel8/public/api/user/my-product",config)
            .then((res) => {

                if (res.data && res.data.data) {
                    if (!Array.isArray(res.data.data)) {
                        setMyproduct(Object.values(res.data.data));
                    } else {
                        setMyproduct(res.data.data);
                    }
                } else {
                    setMyproduct([]);
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }



    function handleDelete(id) {
        if (!window.confirm("Bạn muốn xóa sản phẩm này?")) {
            return;
        }

        let token = localStorage.getItem("token");

        let config = {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json"
            }
        };

        axios.get(`http://localhost/laravel8/laravel8/laravel8/public/api/user/product/delete/${id}`, config)
            .then((res) => {
                console.log('Sản phẩm đã được xóa', res.data);

                // Tìm kiếm và kiểm tra trong từng mảng và xóa id được chọn ra khỏi product
                // Dùng filter để lọc!!

                // setMyproduct(prevProducts => prevProducts.filter(item => item.id !== id));

                // lay ve : va hien thi ra htnl (get)
                // gui qua, gui cai ben backend yeu qua cho no, va no tinh toan roi tra lai ket qua

                getMyProduct();

            })
            .catch((err) => {
                console.log(err);
                alert("Xóa thất bại!");
            });
    }

    function renderMyproduct() {
        if (myproduct.length === 0) {
            return (
                <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                        Không có sản phẩm nào.
                    </td>
                </tr>
            );
        }

        return myproduct.map((item) => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{renderImage(item)}</td>
                <td>${Number(item.price).toLocaleString()}</td>
                <td className="action-buttons">
                    <button className="edit-btn" onClick={() => navigate(`/edit-product/${item.id}`)}>
                        <i className="fa fa-edit"></i>
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                        ❌
                    </button>
                </td>
            </tr>
        ));
    }

    return (
        <div>
            <div className="col-sm-3">
                <div className="left-sidebar">
                    <h2>Category</h2>
                    <div className="panel-group category-products" id="accordian">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a href="/account">ACCOUNT</a></h4>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a href="/Myproduct">MY PRODUCT</a></h4>
                            </div>
                        </div>
                    </div>

                    <div className="price-range">
                        <h2>Price Range</h2>
                        <div className="well">
                            <input
                                type="range"
                                min="0"
                                max="600"
                                defaultValue="250"
                                className="slider-range"
                                style={{ width: '100%', accentColor: '#FE980F' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <b>$ 0</b>
                                <b className="pull-right">$ 600</b>
                            </div>
                        </div>
                    </div>

                    <div className="shipping text-center">
                        <img src="images/home/shipping.jpg" alt="" style={{ width: '100%' }} />
                    </div>
                </div>
            </div>

            <div className="col-sm-9">
                <div className="my-products-container">
                    <h2 className="title text-center">My Product</h2>

                    <div className="table-responsive">
                        <table className="table table-condensed product-table">
                            <thead>
                                <tr className="cart_menu">
                                    <th style={{ width: '10%' }}>Id</th>
                                    <th style={{ width: '40%' }}>Name</th>
                                    <th style={{ width: '20%' }}>Image</th>
                                    <th style={{ width: '15%' }}>Price</th>
                                    <th style={{ width: '15%' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderMyproduct()}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ textAlign: "right", marginTop: "15px" }}>
                        <button
                            className="btn btn-warning add-new-btn"
                            onClick={() => navigate("/addproduct")}
                        >
                            Add New
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Myproduct;