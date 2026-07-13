import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Productdetail() {
    const { id } = useParams();

    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState("");

    // State quản lý Bootstrap
    const [showZoom, setShowZoom] = useState(false);

    console.log("ID:", id);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1
        }
    };

    useEffect(() => {
        
        let token = localStorage.getItem("token");

        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        };


        axios.get(`http://localhost/laravel8/laravel8/laravel8/public/api/product/detail/${id}`,config)

            .then((res) => {
                console.log("API:", res.data);
                const data = res.data.data;
                setProduct(data);

                if (data && data.image) {
                    try {
                        const img = JSON.parse(data.image);
                        const arr = Array.isArray(img) ? img : Object.values(img);
                        setImages(arr);
                        if (arr.length > 0) {
                            setMainImage(arr[0]);
                        }
                    } catch (e) {
                        console.log("Hình Ảnh Lỗi", e);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return (
        <section>
            <div className="container">
                <div className="row">


                    {/* CỘT NỘI DUNG CHÍNH BÊN PHẢI */}
                    <div className="col-sm-9 padding-right">

                        {/* PRODUCT DETAILS */}
                        <div className="product-details">
                            <div className="col-sm-5">
                                {mainImage && (
                                    <div className="view-product" style={{ position: "relative" }}>
                                        <img
                                            src={`http://localhost/laravel8/laravel8/laravel8/public/upload/product/${product.id_user}/${mainImage}`}
                                            alt=""
                                            style={{
                                                width: "100%",
                                                height: "350px",
                                                objectFit: "cover",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => setShowZoom(true)}
                                        />
                                        <a href="#!" onClick={(e) => { e.preventDefault(); setShowZoom(true); }}>
                                            <h3>ZOOM</h3>
                                        </a>
                                    </div>
                                )}

                                <br />

                                {images.length > 0 && (
                                    <Carousel
                                        responsive={responsive}
                                        arrows={true}
                                        infinite={true}
                                        autoPlay={false}
                                        showDots={false}
                                        containerClass="carousel-container"
                                        itemClass="carousel-item-padding-40-px"
                                    >
                                        {images.map((img, index) => (
                                            <div
                                                key={index}
                                                onClick={() => setMainImage(img)}
                                                style={{ cursor: "pointer", padding: "0 5px" }}
                                            >
                                                <img
                                                    src={`http://localhost/laravel8/laravel8/laravel8/public/upload/product/${product.id_user}/${img}`}
                                                    alt=""
                                                    style={{
                                                        width: "100%",
                                                        height: "100px",
                                                        objectFit: "cover",
                                                        border: mainImage === img ? "2px solid #FE980F" : "1px solid #F7F7F0"
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                )}
                            </div>

                            <div className="col-sm-7">
                                <div className="product-information">
                                    <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                                    <h2>{product.name}</h2>
                                    <p>Web ID: {product.id}</p>
                                    <img src="images/product-details/rating.png" alt="" />
                                    <span>
                                        <span>US ${product.price}</span>
                                        <label>Quantity:</label>
                                        <input type="text" defaultValue="3" />
                                        <button type="button" className="btn btn-fefault cart">
                                            <i className="fa fa-shopping-cart"></i>
                                            Add to cart
                                        </button>
                                    </span>
                                    <p><b>Availability:</b> In Stock</p>
                                    <p><b>Condition:</b> {product.status === 1 ? "New" : "Sale"}</p>
                                    <p><b>Brand:</b> {product.brand}</p>
                                    <p><b>Category:</b> {product.category}</p>
                                    <p><b>Detail:</b> {product.detail}</p>
                                    <a href=""><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                                </div>
                            </div>
                        </div>

                        {/* CATEGORY TABS */}
                        <div className="category-tab shop-details-tab">
                            <div className="col-sm-12">
                                <ul className="nav nav-tabs">
                                    <li><a href="#details" data-toggle="tab">Details</a></li>
                                    <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                                    <li><a href="#tag" data-toggle="tab">Tag</a></li>
                                    <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                                </ul>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane fade" id="details" >
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery1.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery2.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery3.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery4.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="companyprofile" >
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery1.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery3.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery2.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery4.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="tag" >
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery1.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery2.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery3.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src="images/home/gallery4.jpg" alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade active in" id="reviews" >
                                    <div className="col-sm-12">
                                        <ul>
                                            <li><a href=""><i className="fa fa-user"></i>EUGEN</a></li>
                                            <li><a href=""><i className="fa fa-clock-o"></i>12:41 PM</a></li>
                                            <li><a href=""><i className="fa fa-calendar-o"></i>31 DEC 2014</a></li>
                                        </ul>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                        <p><b>Write Your Review</b></p>

                                        <form action="#">
                                            <span>
                                                <input type="text" placeholder="Your Name" />
                                                <input type="email" placeholder="Email Address" />
                                            </span>
                                            <textarea name=""></textarea>
                                            <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                            <button type="button" className="btn btn-default pull-right">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RECOMMENDED ITEMS */}
                        <div className="recommended_items">
                            <h2 className="title text-center">recommended items</h2>
                            <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/recommend1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/recommend2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/recommend3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/recommend1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/recommend2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/recommend3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                                    <i className="fa fa-angle-left"></i>
                                </a>
                                <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                                    <i className="fa fa-angle-right"></i>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {showZoom && (
                <>
                    {/* Lớp nền mờ đen */}
                    <div className="modal-backdrop fade in" style={{ zIndex: 1040 }} onClick={() => setShowZoom(false)}></div>

                    {/* Khung Modal */}
                    <div className="modal fade in" style={{ display: "block", zIndex: 1050 }} onClick={() => setShowZoom(false)}>
                        <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()} style={{ marginTop: "60px", display: "table", margin: "60px auto" }}>
                            <div className="modal-content" style={{ borderRadius: "0", border: "none", background: "transparent", boxShadow: "none" }}>

                                <div className="modal-body text-center" style={{ padding: "0", position: "relative" }}>
                                    {mainImage && (
                                        <img
                                            src={`http://localhost/laravel8/laravel8/laravel8/public/upload/product/${product.id_user}/${mainImage}`}
                                            alt="Zoomed Product"
                                            style={{
                                                maxHeight: "80vh",
                                                maxWidth: "90vw",
                                                objectFit: "contain",
                                                border: "4px solid #fff",
                                                backgroundColor: "#fff",
                                                display: "block",
                                                margin: "0 auto"
                                            }}
                                        />
                                    )}

                                    {/* Nút đóng [X] Post nằm đè góc dưới bên trái ảnh chuẩn PrettyPhoto */}


                                </div>
                            </div>

                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

export default Productdetail;