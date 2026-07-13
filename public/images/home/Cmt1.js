import React, { useState, useRef } from 'react';

function Cmt() {
    // 1. Giả lập trạng thái login
    const [isLoggedIn, setIsLoggedIn] = useState(true); 

    // 2. State quản lý nội dung text, danh sách comment và id comment cha 
    const [message, setMessage] = useState('');
    const [comments, setComments] = useState([]);
    const [idParent, setIdParent] = useState(null);

    // 3. Dùng useRef để nhảy xuống form khi click reply
    const formRef = useRef(null);

    const handlePostComment = (e) => {
        e.preventDefault(); 

        if (!isLoggedIn) {
            alert("Vui lòng login");
            return;
        }

        if (message.trim() === '') {
            alert("Nhập bình luận");
            return;
        }

        const newComment = {
            id: Date.now(),
            content: message,
            id_comment: idParent 
        };

        setComments([...comments, newComment]);
        
        setMessage(''); 
        setIdParent(null); 
    };

    const handleReply = (parentId) => {
        setIdParent(parentId); 
        
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
            formRef.current.focus();
        }
    };

    return (
        <div className="replay-box">
            {/* Phân vùng hiển thị bình luận */}
            <div className="comments-display">
                {comments.filter(c => c.id_comment === null).map(parentCmt => (
                    <div key={parentCmt.id}>
                        <p>{parentCmt.content}</p>
                        <button onClick={() => handleReply(parentCmt.id)}>Reply</button>

                        {/* Hiển thị bình luận con */}
                        <div>
                            {comments.filter(c => c.id_comment === parentCmt.id).map(childCmt => (
                                <div key={childCmt.id}>
                                    <p>↳ {childCmt.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <h2>Leave a replay</h2>

                    <div className="text-area">
                        <div className="blank-arrow">
                            <label>Your Name</label>
                        </div>
                        <span>*</span>
                        <textarea 
                            ref={formRef} 
                            name="message" 
                            rows="11"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <a className="btn btn-primary" href="#!" onClick={handlePostComment}>
                            post comment
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cmt;