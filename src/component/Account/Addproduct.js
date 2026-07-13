import axios from "axios";
import { useEffect, useState } from "react";

function Addproduct() {
    const [input, setInput] = useState({
        category: "",
        brand: "",
        name: "",
        price: "",
        status: "1",
        sale: "0",
        detail: "",
        company: "",
    });

    const [avatar, setAvatar] = useState([]);
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem("token");

        let config = {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
            },
        };

        axios.get(
            "http://localhost/laravel8/laravel8/laravel8/public/api/category-brand", config)
            .then((res) => {
                console.log(res.data);

                setCategories(res.data.category || []);
                setBrands(res.data.brand || []);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleInput(e) {
        const { name, value } = e.target;

        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleFile(e) {
        let files = Array.from(e.target.files);

        let err = {};

        if (files.length > 3) {
            err.image = "Chỉ được upload tối đa 3 ảnh";
            setErrors(err);
            return;
        }

        const validTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
        ];

        files.forEach((file) => {
            if (!validTypes.includes(file.type)) {
                err.image =
                    "File upload phải là jpg, jpeg, png hoặc gif";
            }

            if (file.size > 1024 * 1024) {
                err.image = "Dung lượng ảnh phải nhỏ hơn 1MB";
            }
        });

        if (Object.keys(err).length > 0) {
            setErrors(err);
        } else {
            setErrors({});
            setAvatar(files);
        }
    }

    function validate() {
        let errorSubmit = {};

        if (!input.category) {
            errorSubmit.category = "Vui lòng chọn category";
        }

        if (!input.brand) {
            errorSubmit.brand = "Vui lòng chọn brand";
        }

        if (!input.name) {
            errorSubmit.name = "Vui lòng nhập tên sản phẩm";
        }

        if (!input.price) {
            errorSubmit.price = "Vui lòng nhập giá";
        }

        if (!input.detail) {
            errorSubmit.detail = "Vui lòng nhập detail";
        }

        if (!input.company) {
            errorSubmit.company = "Vui lòng nhập company";
        }

        if (avatar.length === 0) {
            errorSubmit.image = "Vui lòng chọn ảnh";
        }

        setErrors(errorSubmit);

        return Object.keys(errorSubmit).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        let token = localStorage.getItem("token");

        let config = {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
        };

        let formData = new FormData();

        formData.append("category", input.category);
        formData.append("brand", input.brand);
        formData.append("name", input.name);
        formData.append("price", input.price);
        formData.append("status", input.status);
        formData.append("sale", input.sale);
        formData.append("detail", input.detail);
        formData.append("company", input.company);

        avatar.forEach((file) => {
            formData.append("file[]", file);
        });

        axios
            .post(
                "http://localhost/laravel8/laravel8/laravel8/public/api/user/product/add",
                formData,
                config
            )
            .then((res) => {
                console.log(res.data);
                alert("Thêm sản phẩm thành công");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="container">
            <div className="row">
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
                    <div className="signup-form">
                        <h2>Add Product</h2>
                        <form onSubmit={handleSubmit}>
                            <select
                                name="category"
                                value={input.category}
                                onChange={handleInput}
                            >
                                <option value="">Chọn category</option>
                                {categories.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.category}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <p>{errors.category}</p>}

                            <select
                                name="brand"
                                value={input.brand}
                                onChange={handleInput}
                            >
                                <option value="">Chọn brand</option>
                                {brands.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.brand}
                                    </option>
                                ))}
                            </select>
                            {errors.brand && <p>{errors.brand}</p>}

                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={input.name}
                                onChange={handleInput}
                            />
                            {errors.name && <p>{errors.name}</p>}

                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={input.price}
                                onChange={handleInput}
                            />
                            {errors.price && <p>{errors.price}</p>}

                            <select
                                name="status"
                                value={input.status}
                                onChange={handleInput}
                            >
                                <option value="1">New</option>
                                <option value="0">Sale</option>
                            </select>

                            {input.status === "0" && (
                                <div className="sale-input-container">
                                    <input
                                        type="number"
                                        name="sale"
                                        placeholder="0"
                                        value={input.sale}
                                        onChange={handleInput}
                                    />
                                    <span>%</span>
                                </div>
                            )}

                            <textarea
                                name="detail"
                                placeholder="Detail"
                                value={input.detail}
                                onChange={handleInput}
                            />
                            {errors.detail && <p>{errors.detail}</p>}

                            <input
                                type="text"
                                name="company"
                                placeholder="Company profile"
                                value={input.company}
                                onChange={handleInput}
                            />
                            {errors.company && <p>{errors.company}</p>}

                            <input
                                type="file"
                                multiple
                                onChange={handleFile}
                            />
                            {errors.image && <p>{errors.image}</p>}

                            <button type="submit">
                                Add Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addproduct;