import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AdminRoute({ children, ...props }) {
  const { userInfo } = useSelector((state) => state.auth);

  // Chưa đăng nhập
  if (!userInfo) {
    return <Navigate to={`/login?redirectTo=${props.path}`} />;
  }

  if (userInfo.maLoaiNguoiDung !== "GV") {
    return <Navigate to="/" />;
  }
  return <Route {...props}>{children}</Route>;
}
