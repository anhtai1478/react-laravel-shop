import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Edit.css";

function Edit() {
    const { id } = useParams();

    const [input, setInput] = useState({
        category: "",
        brand: "",
        name: "",
        price: "",
        status: "1",
        sale: "0",
        company: "",
        detail: ""
    });

    const [array, setArray] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [avatar, setAvatar] = useState([]);
    const [avatarCheckBox, setAvatarCheckBox] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [product, setProduct] = useState({});

    useEffect(() => {
        let token = localStorage.getItem("token");
        let config = {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json"
            }
        };

        axios.get(`http://localhost/laravel8/laravel8/laravel8/public/api/user/product/${id}`, config)
            .then((res) => {
                let data = res.data.data;
                setProduct(data);
                setInput({
                    category: data.id_category,
                    brand: data.id_brand,
                    name: data.name,
                    price: data.price,
                    status: data.status,
                    sale: data.sale,
                    company: data.company_profile,
                    detail: data.detail
                });
                setArray(oldArray => [...oldArray, data.name]);
            })
            .catch((err) => {
                console.log("Error:", err.response);
                console.log("Data:", err.response?.data);
            });

        axios.get("http://localhost/laravel8/laravel8/laravel8/public/api/category-brand")
            .then((res) => {
                setCategories(res.data.category);
                setBrands(res.data.brand);
            })
            .catch((err) => console.log(err));
    }, [id]);

    function handleInput(e) {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    }

    function handleFile(e) {
        const files = Array.from(e.target.files);

        if (files.length > 3) {
            alert("Không được quá 3 ảnh!");
            e.target.value = "";
            setAvatar([]);
            setPreviewImages([]);
            return;
        }

        setAvatar(files);

        const previews = files.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }));

        setPreviewImages(previews);
    }




    // function handleCheckBox(e) {
    //     // lay value ra bo check 
    //     const img = e.target.value;

    //     //kiểm tra
    //     if (e.target.checked) {
    //         // Nếu checkbox chuyển sang trạng thái được chọn thì true
    //         setAvatarCheckBox(prev => [...prev, img]);
    //     } else {
    //         console.log(avatarCheckBox);
    //         // kiem value co trong mang vua lay ra k 
    //         // if (avatarCheckBox.includes(img)) {
    //         //     console.log(" Đã có và đã được lấy ra")
    //         // }

            
    //         // tạo 1 mảng mới ch => dung fillter lọc bo de lay 2 cai con lai
    //         const newAvatarCheckBox = avatarCheckBox.filter(item => item !== img);

    //         setAvatarCheckBox(newAvatarCheckBox);
            
    //         // setAvatarCheckBox(prev => prev.filter(item => item !== img));

    //         // log ra xem con 2 cai con lai chua 
            
    //         // console.log(newAvatarCheckBox);
    //         //Nếu ô checkbox bị bỏ chọn (fales)
    //     }
    // }


    function handleCheckBox(e){
        const img = e.target.value;

        if(e.target.checked){
            setAvatarCheckBox(prev => [...prev, img]);
        }else{
            const newAvatarCheckBox =avatarCheckBox.filter(item => item !== img);
            setAvatarCheckBox(newAvatarCheckBox);
            console.log(newAvatarCheckBox);
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        let token = localStorage.getItem("token");
        let config = {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };

        let formData = new FormData();
        formData.append("category", input.category);
        formData.append("brand", input.brand);
        formData.append("name", input.name);
        formData.append("price", input.price);
        formData.append("status", input.status);
        formData.append("sale", input.sale);
        formData.append("company", input.company);
        formData.append("detail", input.detail);

        avatar.forEach((file) => formData.append("file[]", file));

        // avatarCheckBox.forEach((img) => formData.append("avatarCheckBox[]", img));

        axios.post(`http://localhost/laravel8/laravel8/laravel8/public/api/user/product/update/${id}`, formData, config)
            .then((res) => {
                console.log("Response từ API:", res.data);
                alert("Cập nhật thành công");
                setArray(oldArray => [input.name, ...oldArray]);
            })
            .catch((err) => {
                console.error("Lỗi API:", err);
                if (err.response) {
                    console.log("Chi tiết lỗi từ Backend:", err.response.data);
                }
            });
    }

    let imgArr = [];
    if (product.image) {
        imgArr = Array.isArray(product.image)
            ? product.image
            : JSON.parse(product.image);
    }

    return (
        <div className="Container">
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

            <div className="col-sm-9 edit-product-container">
                <h2 className="edit-product-title">Edit Product</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={handleInput}
                        placeholder="Name"
                        className="edit-product-input"
                    />

                    <input
                        type="number"
                        name="price"
                        value={input.price}
                        onChange={handleInput}
                        placeholder="Price"
                        className="edit-product-input"
                    />

                    <select
                        name="category"
                        value={input.category}
                        onChange={handleInput}
                        className="edit-product-input"
                    >
                        <option value="">Please choose category</option>
                        {categories.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.category}
                            </option>
                        ))}
                    </select>

                    <select
                        name="brand"
                        value={input.brand}
                        onChange={handleInput}
                        className="edit-product-input"
                    >
                        <option value="">Please choose brand</option>
                        {brands.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.brand}
                            </option>
                        ))}
                    </select>

                    <select
                        name="status"
                        value={input.status}
                        onChange={handleInput}
                        className="edit-product-input"
                    >
                        <option value="1">New</option>
                        <option value="0">Sale</option>
                    </select>

                    {input.status === "0" && (
                        <input
                            type="number"
                            name="sale"
                            value={input.sale}
                            onChange={handleInput}
                            className="edit-product-input"
                        />
                    )}

                    <div className="file-upload-wrapper">
                        <input
                            type="file"
                            multiple
                            onChange={handleFile}
                        />
                    </div>

                    <ul className="image-list">
                        {imgArr.map((img, index) => (
                            <li key={index} className="image-item">
                                <img
                                    src={`http://localhost/laravel8/laravel8/laravel8/public/upload/product/${product.id_user}/${img}`}
                                    className="product-image"
                                    alt=""
                                />

                                <input
                                    type="checkbox"
                                    value={img}
                                    onChange={handleCheckBox}
                                />
                            </li>
                        ))}
                    </ul>

                    <textarea
                        name="detail"
                        value={input.detail}
                        onChange={handleInput}
                        placeholder="Detail"
                        className="edit-product-input"
                    />

                    <button type="submit" className="btn-submit-update">
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Edit;