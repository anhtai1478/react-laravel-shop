import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    level: 0
  });

 
  const [avatar, setAvatar] = useState(''); 
  const [getFile, setGetFile] = useState(null);
  const [errors, setErrors] = useState({});

  const validataEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((state) => ({ ...state, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files;
    if (file && file[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result); // mã hoá ra chuỗi để gửi qua API
        setGetFile(file[0]); 
      };
      reader.readAsDataURL(file[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;

    if (inputs.name === '') {
      errorSubmit.name = 'Vui lòng nhập name';
      flag = false;
    }
    if (inputs.email === '') {
      errorSubmit.email = 'Vui lòng nhập email';
      flag = false;
    } else if (!validataEmail(inputs.email)) {
      errorSubmit.email = 'Email không hợp lệ';
      flag = false;
    }
    if (inputs.password === '') {
      errorSubmit.password = 'Vui lòng nhập password';
      flag = false;
    }
    if (inputs.phone === '') {
      errorSubmit.phone = 'Vui lòng nhập phone';
      flag = false;
    }
    if (inputs.address === '') {
      errorSubmit.address = 'Vui lòng nhập address';
      flag = false;
    }

    if (!getFile) {
      errorSubmit['avatar'] = 'Vui lòng chọn ảnh đại diện';
      flag = false;
    } else {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(getFile.type)) {
        errorSubmit['avatar'] = 'File upload lên phải là hình ảnh (jpg, jpeg, png, gif)';
        flag = false;
      }
      const maxSize = 1024 * 1024; // 1MB
      if (getFile.size > maxSize) {
        errorSubmit['avatar'] = 'Dung lượng ảnh phải dưới 1MB';
        flag = false;
      }
    }

    if (!flag) {
      setErrors(errorSubmit);
    } else {
      setErrors({});

      const formData = new FormData();
      formData.append('name', inputs.name);
      formData.append('email', inputs.email);
      formData.append('password', inputs.password);
      formData.append('phone', inputs.phone);
      formData.append('address', inputs.address);
      
      
      formData.append('avatar', avatar); 
      formData.append('level', inputs.level);

      console.log('Data gửi qua API (FormData):', inputs);

      axios.post('http://localhost/laravel8/laravel8/laravel8/public/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          console.log('Kết quả API trả về:', response.data);
          if (response.data.errors) {
            alert("Đăng ký thất bại! Kiểm tra lại thông tin hệ thống trả về.");
          } else {
            alert('Đăng ký thành công!');
            navigate('/login');
          }
        })
        .catch((error) => {
          console.error('Lỗi kết nối API:', error.response ? error.response.data : error.message);
          alert('Đăng ký thất bại! Kiểm tra lại thông tin hệ thống trả về.');
        });
    }
  };

  const renderError = (field) => {
    return errors[field] && (
      <p>
        {errors[field]}
      </p>
    );
  };

  return (
    <div className="col-sm-9" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '40px' }}>
      
      <div className="signup-form" style={{ width: '100%', maxWidth: '400px' }}>
        <h2>New User Signup!</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">

          <input type="text" placeholder="Name" name="name" value={inputs.name} onChange={handleInput} />
          {renderError('name')}

          <input type="email" placeholder="Email Address" name="email" value={inputs.email} onChange={handleInput} />
          {renderError('email')}

          <input type="password" placeholder="Password" name="password" value={inputs.password} onChange={handleInput} />
          {renderError('password')}

          <input type="text" placeholder="Phone Number" name="phone" value={inputs.phone} onChange={handleInput} />
          {renderError('phone')}

          <input type="text" placeholder="Address" name="address" value={inputs.address} onChange={handleInput} />
          {renderError('address')}

          <div style={{ margin: '15px 0', textAlign: 'left' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Avatar:</label>
            <input type="file" name="avatar" onChange={handleFileChange} style={{ border: 'none', padding: '0', background: 'none', color: '#f30000' }} />
          </div>
          {renderError('avatar')}

          <button type="submit" className="btn btn-default" style={{ background: '#FE980F', color: '#fff', borderRadius: '0', marginTop: '10px' }}>
            Sign up
          </button>
        </form>
      </div>

    </div>
  );
}

export default Register;