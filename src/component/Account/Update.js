import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Update() {
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState('');
  const [getFile, setGetFile] = useState(null);

  const [user, setUser] = useState({
    id: '',
    username: '',
    email: '',
    address: '',
    phone: '',
    pass: '',
    lever: 0,
  });

  useEffect(() => {
    let authUserStr = localStorage.getItem("authUser");

    if (authUserStr) {
      let parsedData = JSON.parse(authUserStr);

      let userData = parsedData.Auth || {};

      setUser({
        id: userData.id || '',
        username: userData.name || '', 
        email: userData.email || '',
        address: userData.address || '',
        phone: userData.phone || '',
        pass: '',
        avatar: userData.avatar || '',
        lever: userData.level || 0,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleFileChange = (e) => {
    const file = e.target.files;
    if (file && file[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
        setGetFile(file[0]);
      };
      reader.readAsDataURL(file[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;

    if (user.username === '') {
      errorSubmit.name = 'Vui lòng nhập name';
      flag = false;
    }
    if (user.email === '') {
      errorSubmit.email = 'Vui lòng nhập email';
      flag = false;
    } else if (!validateEmail(user.email)) {
      errorSubmit.email = 'Email không hợp lệ';
      flag = false;
    }
    if (user.phone === '') {
      errorSubmit.phone = 'Vui lòng nhập phone';
      flag = false;
    }
    if (user.address === '') {
      errorSubmit.address = 'Vui lòng nhập address';
      flag = false;
    }

    if (getFile) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(getFile.type)) {
        errorSubmit.avatar = 'File upload lên phải là hình ảnh (jpg, jpeg, png, gif)';
        flag = false;
      }
      const maxSize = 1024 * 1024; // 1MB
      if (getFile.size > maxSize) {
        errorSubmit.avatar = 'Dung lượng ảnh phải dưới 1MB';
        flag = false;
      }
    }

    if (!flag) {
      setErrors(errorSubmit);
    } else {
      setErrors({});
      console.log("Dữ liệu Validate hợp lệ, tiến hành gọi API...");

      let userId = user.id;
      let token = localStorage.getItem("token") || '';

      if (!userId) {
        alert("Lỗi: Không lấy được ID người dùng. Vui lòng thử đăng xuất và đăng nhập lại.");
        return;
      }

      const formData = new FormData();
      formData.append('id', userId);
      formData.append('name', user.username);
      formData.append('email', user.email);
      formData.append('password', user.pass);
      formData.append('phone', user.phone);
      formData.append('address', user.address);
      formData.append('level', user.lever);

      if (getFile) {
        formData.append('avatar', getFile);
      }

      const config = {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      };

      axios.post(`http://localhost/laravel8/laravel8/laravel8/public/api/user/update/${userId}`, formData, config)
        .then((response) => {
          console.log("Phản hồi từ API máy chủ:", response.data);

          if (response.data.response === "success" || !response.data.errors) {
            alert("Cập nhật thông tin tài khoản thành công!");

            // Cập nhật lại thông tin mới vào Local Storage nếu API trả về data mới
            let currentAuthStr = localStorage.getItem("authUser");

            if (currentAuthStr && response.data.Auth) { 
              

                // set parsedData chuyển từ chuỗi JSON thành obj
              let parsedData = JSON.parse(currentAuthStr);

                // cập nhật thằng parsedData.Auth vào api
              parsedData.Auth = response.data.Auth;
              localStorage.setItem("authUser", JSON.stringify(parsedData));
            }
          } else {
            alert("Cập nhật thất bại!");
          }
        })
        .catch((error) => {
          console.log("Lỗi phản hồi từ API:", error.response);
          alert(" API từ chối cập nhật!");
        });
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>

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

        <div className="col-sm-9 user-signup-container">
          <div className="signup-form">
            <h2>User Update!</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <input type="text" placeholder="Name" name="username" value={user.username} onChange={handleInputChange} />
              {errors.name && <span className="error-text" style={{ color: 'red', fontSize: '13px' }}>{errors.name}</span>}

              <input type="email" placeholder="Email (Không muốn sửa thì Không cần nhập)" name="email" value={user.email} onChange={handleInputChange} />
              {errors.email && <span className="error-text" style={{ color: 'red', fontSize: '13px' }}>{errors.email}</span>}

              <input type="password" placeholder="Password (Không muốn sửa thì Không cần nhập)" name="pass" value={user.pass} onChange={handleInputChange} />
              {errors.password && <span className="error-text" style={{ color: 'red', fontSize: '13px' }}>{errors.password}</span>}

              <input type="text" placeholder="Phone Number" name="phone" value={user.phone} onChange={handleInputChange} />
              {errors.phone && <span className="error-text" style={{ color: 'red', fontSize: '13px' }}>{errors.phone}</span>}

              <input type="text" placeholder="Address" name="address" value={user.address} onChange={handleInputChange} />
              {errors.address && <span className="error-text" style={{ color: 'red', fontSize: '13px' }}>{errors.address}</span>}

              <div className="avatar-upload-group">
                <label>Avatar:</label>
                <input type="file" name="avatar" onChange={handleFileChange} />
              </div>
              {errors.avatar && <span className="error-text" style={{ color: 'red', fontSize: '13px' }}>{errors.avatar}</span>}

              <button type="submit" className="btn btn-default">
                Update
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Update;