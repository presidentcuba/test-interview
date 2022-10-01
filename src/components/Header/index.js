import React, { useState } from "react";
import avatar from "src/assets/avatar.png";
export default function Header({ userInfo, onLogout }) {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const handleShowMenu = () => {
    setIsShowMenu(!isShowMenu);
  };
  return (
    <div className="header">
      <div className="avatar" onClick={handleShowMenu}>
        <div className="info">
          <span>
            {userInfo ? userInfo?.firstName + userInfo?.lastName : ""}
          </span>
          <span>Available</span>
        </div>
        <div className="image">
          <img src={avatar} alt="" />
        </div>
        <div className="active"></div>
      </div>
      {isShowMenu && (
        <div className="menu ">
          <ul>
            <li onClick={() => onLogout()}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}
