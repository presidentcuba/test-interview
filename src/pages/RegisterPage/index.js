import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Input, FormGroup, Label, Alert } from "reactstrap";
import axios from "axios";
import { register } from "src/redux/actions/auth";
import { useLocation, Link } from "react-router-dom";
import imgLogin from "../../assets/Illustration.svg";
import fb from "../../assets/Facebook.png";
import tw from "../../assets/Twitter.png";
import git from "../../assets/Git.png";
import mail from "../../assets/Mail.png";
import { Button, Modal } from "reactstrap";

const schema = yup.object().shape({
  firstName: yup.string().required("lastName không được để trống"),
  lastName: yup.string().required("lastName không được để trống"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Tài khoản phải từ 6 đến 18 kí tự")
    .max(18, "Tài khoản phải từ 6 đến 18 kí tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,18})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),

  email: yup.string().required("Email không được để trống"),
});

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { listUser, isLoading } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    resetField,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggle = () => setIsSuccess(!isSuccess);

  const handleRegister = async (values) => {
    try {
      await axios({
        method: "POST",
        url: "http://streaming.nexlesoft.com:4000/api/auth/signup",
        data: values,
      }).then((resp) => {
        if (resp && resp.status === 200) {
          setIsSuccess(true);
        }
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setValue("firstName", " ");
    setValue("lastName", " ");
    setValue("password", " ");
    setValue("email", " ");
    setIsSuccess(false);
  };

  return (
    <>
      <div className="login">
        <div className="image">
          <img src={imgLogin} />
        </div>

        <form
          className="form-container w-50"
          onSubmit={handleSubmit(handleRegister)}
        >
          <h5>Adventure starts here</h5>
          <span>Make your app management easy and fun!</span>

          {/* FirstName */}
          <div className="form-group">
            <label>
              <span>FirstName</span>
              <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              {...register("firstName")}
            />
            {errors.firstName && (
              <div className="alert alert-danger">
                {errors.firstName.message}
              </div>
            )}
          </div>
          {/* Username */}
          <div className="form-group">
            <label>
              <span>LastName</span>
              <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              {...register("lastName")}
            />
            {errors.lastName && (
              <div className="alert alert-danger">
                {errors.lastName.message}
              </div>
            )}
          </div>
          {/* Email */}
          <div className="form-group">
            <label>
              <span>Email</span>
              <span>*</span>
            </label>
            <input
              type="email"
              className="form-control"
              {...register("email")}
            />
            {errors.email && (
              <div className="alert alert-danger">{errors.email.message}</div>
            )}
          </div>
          {/* Password */}
          <div className="form-group">
            <label>
              <span>Pasword</span>
              <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              {...register("password")}
            />
            {errors.password && (
              <div className="alert alert-danger">
                {errors.password.message}
              </div>
            )}
          </div>

          <FormGroup className="form-checkbox">
            <Input type="checkbox" />
            <Label className="title-checkbox">i agree to</Label>
          </FormGroup>
          {error && <span>{error}</span>}
          <button className="btn btn-success">Sign Up</button>

          <div className="link-register">
            <span>Already have an account?</span>
            <Link to="/login">Sign in instead</Link>
          </div>

          <div className="bar-line"></div>

          <div className="list-icon">
            <img src={fb} />
            <img src={tw} />
            <img src={git} />
            <img src={mail} />
          </div>
        </form>

        <Modal isOpen={isSuccess} toggle={toggle}>
          <div className="content" style={{ padding: "30px 0px" }}>
            <span
              style={{
                textAlign: "center",
                display: "block",
                color: "green",
                fontSize: "25px",
              }}
            >
              Create Account Successfull!
            </span>
            <div
              className="btn"
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Button color="success">
                <Link
                  to="/login"
                  style={{ color: "#fff", margin: "15px 10px" }}
                >
                  Sign in
                </Link>
              </Button>
              <Button
                color="danger"
                style={{ color: "#fff", margin: "15px 10px" }}
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
