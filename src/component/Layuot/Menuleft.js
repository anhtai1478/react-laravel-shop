import React from 'react';
import { Link } from 'react-router-dom';

function MenuLeft() {
    return (
        <div className="col-sm-3">
            <div className="left-sidebar">

                <div className="panel-group category-products" id="account-menu">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <Link to="/account" style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                    Account
                                </Link>
                            </h4>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <Link to="/Myproduct" style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                    My Product
                                </Link>
                            </h4>
                        </div>
                    </div>
                </div>

                <h2>Category</h2>
                <div className="panel-group category-products" id="accordian">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                    Sportswear
                                </a>
                            </h4>
                        </div>
                        <div id="sportswear" className="panel-collapse collapse">
                            <div className="panel-body">
                                <ul>
                                    <li><a href="#nike">Nike </a></li>
                                    <li><a href="#under-armour">Under Armour </a></li>
                                    <li><a href="#adidas">Adidas </a></li>
                                    <li><a href="#puma">Puma</a></li>
                                    <li><a href="#asics">ASICS </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordian" href="#mens">
                                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                    Mens
                                </a>
                            </h4>
                        </div>
                        <div id="mens" className="panel-collapse collapse">
                            <div className="panel-body">
                                <ul>
                                    <li><a href="#fendi">Fendi</a></li>
                                    <li><a href="#guess">Guess</a></li>
                                    <li><a href="#valentino">Valentino</a></li>
                                    <li><a href="#dior">Dior</a></li>
                                    <li><a href="#versace">Versace</a></li>
                                    <li><a href="#arman">Armani</a></li>
                                    <li><a href="#prada">Prada</a></li>
                                    <li><a href="#dolce">Dolce and Gabbana</a></li>
                                    <li><a href="#chanel">Chanel</a></li>
                                    <li><a href="#gucci">Gucci</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordian" href="#womens">
                                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                    Womens
                                </a>
                            </h4>
                        </div>
                        <div id="womens" className="panel-collapse collapse">
                            <div className="panel-body">
                                <ul>
                                    <li><a href="#fendi-w">Fendi</a></li>
                                    <li><a href="#guess-w">Guess</a></li>
                                    <li><a href="#valentino-w">Valentino</a></li>
                                    <li><a href="#dior-w">Dior</a></li>
                                    <li><a href="#versace-w">Versace</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><a href="#kids">Kids</a></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><a href="#fashion">Fashion</a></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><a href="#households">Households</a></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><a href="#interiors">Interiors</a></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><a href="#clothing">Clothing</a></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><a href="#bags">Bags</a></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><a href="#shoes">Shoes</a></h4>
                        </div>
                    </div>
                </div>

                <div className="brands_products">
                    <h2>Brands</h2>
                    <div className="brands-name">
                        <ul className="nav nav-pills nav-stacked">
                            <li><a href="#acne"> <span className="pull-right">(50)</span>Acne</a></li>
                            <li><a href="#grune"> <span className="pull-right">(56)</span>Grüne Erde</a></li>
                            <li><a href="#albiro"> <span className="pull-right">(27)</span>Albiro</a></li>
                            <li><a href="#ronhill"> <span className="pull-right">(32)</span>Ronhill</a></li>
                            <li><a href="#oddmolly"> <span className="pull-right">(5)</span>Oddmolly</a></li>
                            <li><a href="#boudestijn"> <span className="pull-right">(9)</span>Boudestijn</a></li>
                            <li><a href="#rosch"> <span className="pull-right">(4)</span>Rösch creative culture</a></li>
                        </ul>
                    </div>
                </div>

                <div className="price-range">
                    <h2>Price Range</h2>
                    <div className="well">
                        <input
                            type="text"
                            className="span2"
                            defaultValue=""
                            data-slider-min="0"
                            data-slider-max="600"
                            data-slider-step="5"
                            data-slider-value="[250,450]"
                            id="sl2"
                        /><br />
                        <b>$ 0</b> <b className="pull-right">$ 600</b>
                    </div>
                </div>

                <div className="shipping text-center">
                    <img src="images/home/shipping.jpg" alt="Shipping Promotion" />
                </div>
            </div>
        </div>
    );
}

export default MenuLeft;