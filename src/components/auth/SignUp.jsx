// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch, } = useForm();
  const password = watch("password");

  
  const onSubmit = async (data) =>{
    const { username, email, password } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "users"),{
        email,
        createdAt: serverTimestamp(),
        displayName: username,
        uid: auth.currentUser.uid,
        role: "user",
      });
      Swal.fire({
        icon: "success",
        title: "Đăng ký thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/signin");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.message,
      });
    }
  };
  return (
    <div className="container SingUpname">
      <div className="row justify-content-center ">
        <div className="col-lg-7 SingUpFrom">
          <form onSubmit={handleSubmit(onSubmit)} className=" mt-5 border p-4 rounded shadow" style={{  background: "rgb(239, 236, 236)" }}>
            <h3 className="text-center mb-4"><b>ĐĂNG KÝ</b></h3>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Tên người dùng
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                id="username"
                {...register("username", {
                  required: "Tên người dùng không được để trống.",
                })}
              />
              {errors.username && (
                <div className="invalid-feedback">
                  {errors.username.message}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                {...register("email", {
                  required: "Email không được để trống.",
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                {...register("password", {
                  required: "Mật khẩu không được để trống.",
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Nhập lại mật khẩu không được để trống.",
                  validate: (value) =>
                    value === password ||
                    "Mật khẩu và Nhập lại mật khẩu không khớp.",
                })}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Đăng ký
              </button>
              <p className="mt-3">
                Nếu đã có tài khoản hãy đăng nhập ngay{" "}
                <a href="/signin">Đăng Nhập</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
