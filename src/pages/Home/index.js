import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "src/redux/actions/auth";
import Header from "src/components/Header";
import img from "src/assets/home.svg";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  const hanldeLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="home">
      <Header userInfo={userInfo} onLogout={hanldeLogout} />
      <div className="home-content">
        <div className="content-box">
          <h5>Welcome to Demo App</h5>
          <div className="image">
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
