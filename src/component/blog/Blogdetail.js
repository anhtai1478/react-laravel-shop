import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cmt from "../config/Cmt";
import Rate from "../config/Rate";
import Listcmt from "../config/Listcmt";

function BlogDetail() {
    const { id } = useParams();

    const [blogDetail, setBlogDetail] = useState(null);

    //  trữ danh sách bình luận 
    const [listComment, setlistComment] = useState([]);
    const [idparent, setIdparent] = useState(0);
    // tự động cuộn xuống khoản trống
    const commentFormRef = useRef(null);

    const [comment, setComment] = useState("");
    const [checkLogin, setCheckLogin] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost/laravel8/laravel8/laravel8/public/api/blog/detail/${id}`)
            .then(response => {
                console.log('Dữ liệu thực tế từ API:', response.data);

                if (response.data && response.data.data) {
                    setBlogDetail(response.data.data);

                    if (response.data.data.comment) {
                        setlistComment(response.data.data.comment);

                    }
                }
            })
            .catch((err) => {
                console.log("lỗi Api", err);
            });
    }, [id]);

    function handleReply(replyId) {

        setIdparent(replyId);
        if (commentFormRef.current) {
            commentFormRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }

    }


    function getComment(newCmt) {

        setlistComment([...listComment, newCmt])
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    if (!blogDetail) {
        return <div className="container" style={{ padding: "50px 0", textAlign: "center" }}>Đợi xíu đang loading...</div>;
    }

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 padding-right" style={{ paddingLeft: "200px ", textAlign: "center" }}>
                        <h2 className="title text-center">Latest From our Blog</h2>
                        <div className="single-blog-post">
                            <h3>{blogDetail.title || "Untitled"}</h3>
                            <div className="post-meta">
                                <a href="">
                                    <img style={{ width: "100%", height: "auto" }}
                                        src={blogDetail.image ? `http://localhost/laravel8/laravel8/laravel8/public/upload/Blog/image/${blogDetail.image}` : "/images/blog/blog-one.jpg"}
                                        alt={blogDetail.title || "Blog image"}
                                    />
                                </a>
                                <ul>
                                    <li><i className="fa fa-user"></i> {blogDetail.author || "Admin"}</li>
                                    <li><i className="fa fa-clock-o"></i> {blogDetail.time || "1:33 pm"}</li>
                                    <li><i className="fa fa-calendar"></i> {blogDetail.date || "DEC 5, 2013"}</li>
                                </ul>
                            </div>
                            <p style={{ whiteSpace: "pre-line", marginTop: "20px" }}>{blogDetail.content}</p>
                        </div>

                        {/* Phần đánh giá */}
                        <Rate blogid={id} />

                        {/* Phần danh sách bình luận */}
                        <Listcmt listCmt={listComment} handleReply={handleReply} />

                        {/* Phần nhập bình luận */}
                        <div ref={commentFormRef} >
                            <Cmt blogId={id} getComment={getComment} idparent={idparent} setIdparent={setIdparent} />
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogDetail;