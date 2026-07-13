import axios from "axios";
import { useEffect, useState } from "react";

function Blog() {
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/laravel8/laravel8/laravel8/public/api/blog')
            .then(res => {
                console.log("Dữ liệu nhận được từ API:", res);

                if (res.data.blog || res.data.blog.data) {
                    setBlogList(res.data.blog.data);
                }
            })
            .catch(error => console.log(error));
    }, []);

    function renderBlogList() {
        if (blogList.length > 0) {
            return blogList.map((blog, index) => {
                return (
                    <div key={index || blog.id} className="single-blog-post">
                        <h3>{blog.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user"></i> {blog.author}/</li>
                                <li><i className="fa fa-clock-o"></i> {blog.created_at ? new Date(blog.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "1:33 pm"}</li>
                                <li><i className="fa fa-calendar"></i> {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : "DEC 5, 2013"}</li>
                            </ul>
                            <span>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-half-o"></i>
                            </span>
                        </div>
                        <a href={`/blogdetail/${blog.id}`}>
                            <img
                                src={blog.image ? `http://localhost/laravel8/laravel8/laravel8/public/upload/Blog/image/${blog.image}` : "images/blog/blog-one.jpg"}
                                alt={blog.title || "Blog image"}
                            />
                        </a>
                        <p>{blog.description || blog.content}</p>
                        <a className="btn btn-primary" href={`/blogdetail/${blog.id}`}>Read More</a>
                    </div>

                );
            });
        } else {
            return <p>Đang tải blog...</p>;
        }
    }





    return (
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-sm-9">
                        <div class="blog-post-area">
                            <h2 class="title text-center">Latest From our Blog</h2>

                            {renderBlogList()}



                            <div class="pagination-area">
                                <ul class="pagination">
                                    <li><a href="" class="active">1</a></li>
                                    <li><a href="">2</a></li>
                                    <li><a href="">3</a></li>
                                    <li><a href=""><i class="fa fa-angle-double-right"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Blog;



{/* - hien thi ra goc trang chu cua blog, co the la 1 list cac bai viet, moi bai viet co tieu de va mot doan tom tat ngan gon. Khi nguoi dung click vao tieu de bai viet, se duoc chuyen den trang chi tiet cua bai viet do.
 - goi api ve, cai axios de lay du lieu tu server, sau do hien thi du lieu len giao dien. Du lieu co the la mot mang cac bai viet, moi bai viet co id, tieu de, va tom tat ngan gon.
 - api/ */}