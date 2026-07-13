import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    level: 0 
  });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;

    if (inputs.email.trim() === "") {
      errorSubmit.email = "Vui lòng nhập email";
      flag = false;
    }
    if (inputs.password === "") {
      errorSubmit.password = "Vui lòng nhập mật khẩu";
      flag = false;
    }

    if (!flag) {
      setErrors(errorSubmit);
    } else {
      setErrors({});

      const dataSubmit = {
        email: inputs.email,
        password: inputs.password,
        level: inputs.level
      };

      axios.post('http://localhost/laravel8/laravel8/laravel8/public/api/login', dataSubmit)
        .then((res) => {
          console.log("Kết quả Login từ API:", res.data);
          
          if (res.data.token) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("token", res.data.token);
            
            
            const userInformation = res.data.auth || res.data.user || res.data;
            localStorage.setItem("authUser", JSON.stringify(userInformation));

            alert("Đăng nhập thành công!");
            
           
            window.location.href = '/'; 
          } else {
            alert("Đăng nhập thất bại! Kiểm tra lại tài khoản.");
          }
        })
        .catch((err) => {
          console.error("Lỗi API login:", err);
          alert("Sai email hoặc mật khẩu.");
        });
    }
  };

  return (
    <div className="col-sm-9" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <div className="login-form" style={{ width: '100%', maxWidth: '400px' }}>
        <h2>Login to your account</h2>
        <form onSubmit={handleSubmit}>
          
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={inputs.email} 
            onChange={handleInput} 
          />
          {errors.email && <p style={{ color: 'red', fontSize: '13px', margin: '5px 0' }}>{errors.email}</p>}

          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            value={inputs.password} 
            onChange={handleInput} 
            style={{ marginTop: '10px' }}
          />
          {errors.password && <p style={{ color: 'red', fontSize: '13px', margin: '5px 0' }}>{errors.password}</p>}
          
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px', marginBottom: '10px' }}>
            <input type="checkbox" className="checkbox" id="keepSignedIn" style={{ width: 'auto', margin: '0' }} /> 
            <label htmlFor="keepSignedIn" style={{ fontWeight: 'normal', cursor: 'pointer', margin: '0' }}>Keep me signed in</label>
          </span>
          
          <button type="submit" className="btn btn-default" style={{ background: '#FE980F', color: '#fff', borderRadius: '0' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;