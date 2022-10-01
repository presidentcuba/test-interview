import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, FormGroup, Label, Alert } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "src/redux/actions/auth";
import { Navigate, Link } from "react-router-dom";
import { useLocation } from "react-router";
import imgLogin from "../../assets/Illustration.svg";
import fb from "../../assets/Facebook.png";
import tw from "../../assets/Twitter.png";
import git from "../../assets/Git.png";
import mail from "../../assets/Mail.png";
import qs from "qs";

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const dispatch = useDispatch();

  const { userInfo, isLoading, error } = useSelector((state) => state.auth);
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (values) => {
    dispatch(login(values));
  };

  if (userInfo) {
    const { redirectTo } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    if (redirectTo) {
      return <Navigate to={redirectTo} />;
    }
    return <Navigate to="/" />;
  }
  return (
    <div className="login">
      <div className="image">
        <img src={imgLogin} />
      </div>

      <form
        className="form-container  w-50"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h5>Welcome to Entrance Test Interview! 👋🏻</h5>
        <span>Please sign-in to your account and start the adventure</span>
        <div className="form-group">
          <label>
            <span>Email</span>
            <span>*</span>
          </label>
          <input type="text" className="form-control" {...register("email")} />
          {errors.email && (
            <div className="alert alert-danger">{errors.email.message}</div>
          )}
        </div>

        <FormGroup>
          <div className="title">
            <Label>
              <span>Password</span>
              <span>*</span>
            </Label>
            <Link to="/">Forgot Password?</Link>
          </div>

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "Mật khẩu không được để trống",
              },
            }}
            render={({ field }) => {
              return <Input type="password" {...field} />;
            }}
          />
          {errors.password && (
            <Alert color="danger">{errors.password.message}</Alert>
          )}
        </FormGroup>
        {error && <Alert color="danger">{error}</Alert>}
        <FormGroup className="form-checkbox">
          <Input type="checkbox" />
          <Label className="title-checkbox">Remember me</Label>
        </FormGroup>

        <button className="btn btn-success">Login</button>
        <div className="link-register">
          <span>New on our platform?</span>
          <Link to="/register">Create an account</Link>
        </div>
        <div className="bar-line"></div>
        <div className="list-icon">
          <img src={fb} />
          <img src={tw} />
          <img src={git} />
          <img src={mail} />
        </div>
      </form>
    </div>
  );
}
