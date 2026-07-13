
const Home = () => {



	function addToCart(id) {
		// Lấy giỏ hàng hiện tại
		let cart = JSON.parse(localStorage.getItem("cart")) || [];

		// Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
		const check = cart.findIndex(item => item.id === id);

		if (check !== -1) {
			// Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
			cart[check].qty += 1;
		} else {
			// Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới
			cart.push({ id, qty: 1 });
		}


		localStorage.setItem("cart", JSON.stringify(cart));
		console.log(cart);
		
	}




	return (
		<section>
			<div class="container">
				<div class="row">


					<div class="col-sm-9 padding-right">
						<div class="features_items">
							<h2 class="title text-center">Features Items</h2>
							<div class="col-sm-4">
								<div class="product-image-wrapper">
									<div class="single-products">
										<div class="productinfo text-center">
											<img src="images/home/product1.jpg" alt="" />
											<h2>$56</h2>
											<p>Easy Polo Black Edition</p>
											<button
												className="btn btn-default add-to-cart"
												onClick={() => addToCart(1)}
											>
												<i className="fa fa-shopping-cart"></i>
												Add to cart
											</button>
										</div>
										<div class="product-overlay">
											<div class="overlay-content">
												<h2>$56</h2>
												<p>Easy Polo Black Edition</p>
												<button
													className="btn btn-default add-to-cart"
													onClick={() => addToCart(2)}
												>
													<i className="fa fa-shopping-cart"></i>
													Add to cart
												</button>
											</div>
										</div>
									</div>
									<div class="choose">
										<ul class="nav nav-pills nav-justified">
											<li><a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
											<li><a href="#"><i class="fa fa-plus-square"></i>Add to compare</a></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="product-image-wrapper">
									<div class="single-products">
										<div class="productinfo text-center">
											<img src="images/home/product2.jpg" alt="" />
											<h2>$56</h2>
											<p>Easy Polo Black Edition</p>
											<button
												className="btn btn-default add-to-cart"
												onClick={() => addToCart(3)}
											>
												<i className="fa fa-shopping-cart"></i>
												Add to cart
											</button>
										</div>
										<div class="product-overlay">
											<div class="overlay-content">
												<h2>$56</h2>
												<p>Easy Polo Black Edition</p>
												<button
													className="btn btn-default add-to-cart"
													onClick={() => addToCart(4)}
												>
													<i className="fa fa-shopping-cart"></i>
													Add to cart
												</button>
											</div>
										</div>
									</div>
									<div class="choose">
										<ul class="nav nav-pills nav-justified">
											<li><a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
											<li><a href="#"><i class="fa fa-plus-square"></i>Add to compare</a></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="product-image-wrapper">
									<div class="single-products">
										<div class="productinfo text-center">
											<img src="images/home/product3.jpg" alt="" />
											<h2>$56</h2>
											<p>Easy Polo Black Edition</p>
											<button
												className="btn btn-default add-to-cart"
												onClick={() => addToCart(5)}
											>
												<i className="fa fa-shopping-cart"></i>
												Add to cart
											</button>
										</div>
										<div class="product-overlay">
											<div class="overlay-content">
												<h2>$56</h2>
												<p>Easy Polo Black Edition</p>
												<button
													className="btn btn-default add-to-cart"
													onClick={() => addToCart(6)}
												>
													<i className="fa fa-shopping-cart"></i>
													Add to cart
												</button>
											</div>
										</div>
									</div>
									<div class="choose">
										<ul class="nav nav-pills nav-justified">
											<li><a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
											<li><a href="#"><i class="fa fa-plus-square"></i>Add to compare</a></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="product-image-wrapper">
									<div class="single-products">
										<div class="productinfo text-center">
											<img src="images/home/product4.jpg" alt="" />
											<h2>$56</h2>
											<p>Easy Polo Black Edition</p>
											<button
												className="btn btn-default add-to-cart"
												onClick={() => addToCart(7)}
											>
												<i className="fa fa-shopping-cart"></i>
												Add to cart
											</button>
										</div>
										<div class="product-overlay">
											<div class="overlay-content">
												<h2>$56</h2>
												<p>Easy Polo Black Edition</p>
												<button
													className="btn btn-default add-to-cart"
													onClick={() => addToCart(8)}
												>
													<i className="fa fa-shopping-cart"></i>
													Add to cart
												</button>
											</div>
										</div>
										<img src="images/home/new.png" class="new" alt="" />
									</div>
									<div class="choose">
										<ul class="nav nav-pills nav-justified">
											<li><a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
											<li><a href="#"><i class="fa fa-plus-square"></i>Add to compare</a></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="product-image-wrapper">
									<div class="single-products">
										<div class="productinfo text-center">
											<img src="images/home/product5.jpg" alt="" />
											<h2>$56</h2>
											<p>Easy Polo Black Edition</p>
											<button
												className="btn btn-default add-to-cart"
												onClick={() => addToCart(9)}
											>
												<i className="fa fa-shopping-cart"></i>
												Add to cart
											</button>
										</div>
										<div class="product-overlay">
											<div class="overlay-content">
												<h2>$56</h2>
												<p>Easy Polo Black Edition</p>
												<button
													className="btn btn-default add-to-cart"
													onClick={() => addToCart(10)}
												>
													<i className="fa fa-shopping-cart"></i>
													Add to cart
												</button>
											</div>
										</div>
										<img src="images/home/sale.png" class="new" alt="" />
									</div>
									<div class="choose">
										<ul class="nav nav-pills nav-justified">
											<li><a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
											<li><a href="#"><i class="fa fa-plus-square"></i>Add to compare</a></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="product-image-wrapper">
									<div class="single-products">
										<div class="productinfo text-center">
											<img src="images/home/product6.jpg" alt="" />
											<h2>$56</h2>
											<p>Easy Polo Black Edition</p>
											<button
												className="btn btn-default add-to-cart"
												onClick={() => addToCart(11)}
											>
												<i className="fa fa-shopping-cart"></i>
												Add to cart
											</button>
										</div>
										<div class="product-overlay">
											<div class="overlay-content">
												<h2>$56</h2>
												<p>Easy Polo Black Edition</p>
												<button
													className="btn btn-default add-to-cart"
													onClick={() => addToCart(12)}
												>
													<i className="fa fa-shopping-cart"></i>
													Add to cart
												</button>
											</div>
										</div>
									</div>
									<div class="choose">
										<ul class="nav nav-pills nav-justified">
											<li><a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
											<li><a href="#"><i class="fa fa-plus-square"></i>Add to compare</a></li>
										</ul>
									</div>
								</div>
							</div>

						</div>

						<div class="category-tab">
							<div class="col-sm-12">
								<ul class="nav nav-tabs">
									<li class="active"><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
									<li><a href="#blazers" data-toggle="tab">Blazers</a></li>
									<li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
									<li><a href="#kids" data-toggle="tab">Kids</a></li>
									<li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
								</ul>
							</div>
							<div class="tab-content">
								<div class="tab-pane fade active in" id="tshirt">
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery1.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(13)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery2.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(14)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery3.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(15)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery4.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(16)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
								</div>

								<div class="tab-pane fade" id="blazers">
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery4.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(17)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery3.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(18)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery2.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(19)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery1.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(20)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
								</div>

								<div class="tab-pane fade" id="sunglass">
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery3.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(21)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery4.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(22)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery1.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(23)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery2.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(24)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
								</div>

								<div class="tab-pane fade" id="kids">
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery1.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(25)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery2.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(26)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery3.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(27)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery4.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(28)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
								</div>

								<div class="tab-pane fade" id="poloshirt">
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery2.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(29)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery4.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(30)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery3.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(31)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="product-image-wrapper">
											<div class="single-products">
												<div class="productinfo text-center">
													<img src="images/home/gallery1.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<button
														className="btn btn-default add-to-cart"
														onClick={() => addToCart(32)}
													>
														<i className="fa fa-shopping-cart"></i>
														Add to cart
													</button>
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="recommended_items">
							<h2 class="title text-center">recommended items</h2>

							<div id="recommended-item-carousel" class="carousel slide" data-ride="carousel">
								<div class="carousel-inner">
									<div class="item active">
										<div class="col-sm-4">
											<div class="product-image-wrapper">
												<div class="single-products">
													<div class="productinfo text-center">
														<img src="images/home/recommend1.jpg" alt="" />
														<h2>$56</h2>
														<p>Easy Polo Black Edition</p>
														<button
															className="btn btn-default add-to-cart"
															onClick={() => addToCart(33)}
														>
															<i className="fa fa-shopping-cart"></i>
															Add to cart
														</button>
													</div>

												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="product-image-wrapper">
												<div class="single-products" id="p1">
													<div class="productinfo text-center">
														<img src="images/home/recommend2.jpg" alt="" />
														<h2>$56</h2>
														<p>Easy Polo Black Edition</p>
														<button
															className="btn btn-default add-to-cart"
															onClick={() => addToCart(34)}
														>
															<i className="fa fa-shopping-cart"></i>
															Add to cart
														</button>
													</div>

												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="product-image-wrapper">
												<div class="single-products" id="p2">
													<div class="productinfo text-center">
														<img src="images/home/recommend3.jpg" alt="" />
														<h2>$56</h2>
														<p>Easy Polo Black Edition</p>
														<button
															className="btn btn-default add-to-cart"
															onClick={() => addToCart(35)}
														>
															<i className="fa fa-shopping-cart"></i>
															Add to cart
														</button>
													</div>

												</div>
											</div>
										</div>
									</div>
									<div class="item">
										<div class="col-sm-4">
											<div class="product-image-wrapper">
												<div class="single-products" id="p3">
													<div class="productinfo text-center">
														<img src="images/home/recommend1.jpg" alt="" />
														<h2>$56</h2>
														<p>Easy Polo Black Edition</p>
														<button
															className="btn btn-default add-to-cart"
															onClick={() => addToCart(36)}
														>
															<i className="fa fa-shopping-cart"></i>
															Add to cart
														</button>
													</div>

												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="product-image-wrapper" id="p4">
												<div class="single-products">
													<div class="productinfo text-center">
														<img src="images/home/recommend2.jpg" alt="" />
														<h2>$56</h2>
														<p>Easy Polo Black Edition</p>
														<button
															className="btn btn-default add-to-cart"
															onClick={() => addToCart(37)}
														>
															<i className="fa fa-shopping-cart"></i>
															Add to cart
														</button>
													</div>

												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="product-image-wrapper" id="p5">
												<div class="single-products">
													<div class="productinfo text-center">
														<img src="images/home/recommend3.jpg" alt="" />
														<h2>$56</h2>
														<p>Easy Polo Black Edition</p>
														<button
															className="btn btn-default add-to-cart"
															onClick={() => addToCart(38)}
														>
															<i className="fa fa-shopping-cart"></i>
															Add to cart
														</button>
													</div>

												</div>
											</div>
										</div>
									</div>
								</div>
								<a class="left recommended-item-control" href="#recommended-item-carousel"
									data-slide="prev">
									<i class="fa fa-angle-left"></i>
								</a>
								<a class="right recommended-item-control" href="#recommended-item-carousel"
									data-slide="next">
									<i class="fa fa-angle-right"></i>
								</a>
							</div>
						</div>

					</div>
				</div>
			</div>
		</section>

	);
}
export default Home;