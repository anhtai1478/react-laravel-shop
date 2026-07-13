import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

function Rate({ blogid }) {
    const [rating, setRating] = useState(0);
    const [vote, setVote] = useState(0);

    const navigate = useNavigate();

    // kiểm tra thông tin
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [accessToken, setAccessToken] = useState('');

    // Lấy thông tin login 
    useEffect(() => {
        const token = localStorage.getItem("token");
        const authUser = localStorage.getItem("authUser");

        if (token && authUser) {
            setIsLoggedIn(true);
            setAccessToken(token);
            setUserData(JSON.parse(authUser));
        }
    }, []);

    // hàm reload + tính tổng trung bình cộng
    useEffect(() => {
        if (blogid) {
            axios.get(`http://localhost/laravel8/laravel8/laravel8/public/api/blog/rate/${blogid}`)
                .then((res) => {
                    console.log('Danh sách dữ liệu đánh giá: ', res.data);
                    
                    const ratesArray = res.data.data || res.data;

                    if (ratesArray && Array.isArray(ratesArray) && ratesArray.length > 0) {
                        setVote(ratesArray.length);
                        
                        let total = 0;
                        ratesArray.forEach(item => {
                            total += parseFloat(item.rate); 
                        });
                        
                        setRating(total / ratesArray.length);
                    }
                    else {
                        setVote(0);
                        setRating(0);
                    }
                })
                .catch((err) => {
                    console.log('lỗi tính:', err);
                });
        }
    }, [blogid]);

    function handleRating(rate) {
        // Kiểm tra 
        if (!isLoggedIn || !userData) {
            alert('Vui lòng đăng nhập để đánh giá!');
            navigate('/login');
            return;
        }

        setRating(rate);
        console.log('Số sao vừa chọn:', rate);

        const config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        };

        const formData = new FormData();
        formData.append('user_id', userData.Auth.id);
        formData.append('blog_id', blogid);
        formData.append('rate', rate);

        axios.post(`http://localhost/laravel8/laravel8/laravel8/public/api/blog/rate/${blogid}`, formData, config)
            .then((res) => {
                console.log('Kết quả trả về từ API rate:', res.data);
                alert('Đánh giá thành công!');
                setVote(prev => prev + 1);
            })
            .catch((err) => {
                console.log('Lỗi API rate:', err);
                alert('Đánh giá thất bại, vui lòng kiểm tra lại!');
            });
    }

    return (
        <div className="rating-area">
            <ul className="ratings">
                <li className="rate-this">Rate this item:</li>

                <li>
                    <Rating
                        onClick={handleRating}
                        initialValue={rating}      
                        
                        key={rating} 
                        allowFraction={true}        
                        size={20}
                        fillColor="#ff9100"
                        emptyColor="#ffffff"
                    />
                </li>

                <li className="color">({vote} votes)</li>
            </ul>
            <ul className="tag">
                <li>TAG:</li>
                <li><a className="color" href="#!">Pink <span>/</span></a></li>
                <li><a className="color" href="#!">T-Shirt <span>/</span></a></li>
                <li><a className="color" href="#!">Girls</a></li>
            </ul>
        </div>
    );
}

export default Rate;