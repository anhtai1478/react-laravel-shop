import { useState, useRef, useEffect } from "react";
import axios from "axios";


function Cmt({ blogId, getComment, idparent, setIdparent }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState('');

    const formRef = useRef(null);
    const [userData, setUserData] = useState(null);
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        const authUser = localStorage.getItem("authUser");
        console.log(JSON.parse(localStorage.getItem("authUser")));

        if (token && authUser) {
            setIsLoggedIn(true);
            setAccessToken(token);
            setUserData(JSON.parse(authUser));
        }
    }, []);

    function handleComment(e) {
        e.preventDefault();
        console.log("đã bấm");

        if (!isLoggedIn || !userData) {
            alert("Vui lòng login để bình luận!");
            return;
        }

        if (message.trim() === '') {
            alert("Vui lòng nhập bình luận!");
            return;
        }

        console.log("blogId =", blogId);
        const config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        };

        const formData = new FormData();
        formData.append('id_blog', blogId);
        formData.append('id_user', userData.Auth.id);

        
        formData.append('id_comment', idparent ? idparent : 0);
        formData.append('comment', message);
        formData.append('image_user', userData.Auth.avatar);
        formData.append('name_user', userData.Auth.name);

        axios.post(`http://localhost/laravel8/laravel8/laravel8/public/api/blog/comment/${blogId}`, formData, config)
            .then(res => {
                console.log("Đã gửi bình luận!", res.data);

                if (getComment && res.data) {
                    const commentFromServer = res.data.data || res.data.comment;
                    console.log("commentFromServer =", commentFromServer);

                    if (commentFromServer) {
                       
                        const fullCommentData = {
                            ...commentFromServer,
                            name_user: userData.Auth.name,
                            image_user: userData.Auth.avatar,
                            time: "Vừa xong",
                            date: new Date().toLocaleDateString()
                        };

                        getComment(fullCommentData);
                    }
                }

                // Xóa trắng ô nhập bình luận
                setMessage('');

               
                if (setIdparent) {
                    setIdparent(0);
                }
            })
            .catch(err => {
                console.log("Lỗi:", err);
            });
    }

    return (
        <div className="replay-box">
            <div className="row">
                <div className="col-sm-12">
                    <h2>Leave a reply</h2>

                    
                    {idparent !== 0 && (
                        <button type="button" className="btn btn-warning btn-sm mb-2" onClick={() => setIdparent(0)}>
                            Hủy trả lời
                        </button>
                    )}

                    <form onSubmit={handleComment} className="text-area">
                        <div className="blank-arrow">
                            <label>Your Name</label>
                        </div>
                        <span>*</span>
                        <textarea
                            name="message"
                            rows="11"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            ref={formRef}
                            
                           placeholder={idparent === 0 ? "Nhập bình luận của bạn..." : "Nhập câu trả lời..."}
                        ></textarea>

                        <button type="submit" className="btn btn-primary">
                            Post comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Cmt;