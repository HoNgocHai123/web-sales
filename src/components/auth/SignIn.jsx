// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import "./SingInUp.css"
import Swal from 'sweetalert2'
function SignIn() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Lưu thông tin người dùng vào local storage
            localStorage.setItem('user', JSON.stringify({ email }));
            const isAdmin = email === 'admin@gmail.com'; 
            if (isAdmin) {
                navigate("/");
            } else {
                navigate("/HomePages")
            }
            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: error.message,
            });
        }
    };

    return (
        <div className="container d-flex justify-content-center singinFrom">
            <form onSubmit={handleSubmit(onSubmit)} className="w-40 h-50 border p-4" style={{ marginTop: "200px", background: "rgb(239, 236, 236)" }}>
                <h2 className="text-center mb-4"><b>ĐĂNG NHẬP</b></h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        {...register('email', { required: 'Email không được để trống.' })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mật khẩu:</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        {...register('password', { required: 'Mật khẩu không được để trống.' })}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Đăng Nhập</button>
                    <p className='mt-3'>Nếu chưa có tài khoản hãy đăng kí ngay <a href='/signup'>Đăng Kí</a></p>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
