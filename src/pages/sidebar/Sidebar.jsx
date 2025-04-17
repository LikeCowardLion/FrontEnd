import React, { useState } from "react";
import { FaCaretUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
    const publicUrl = process.env.PUBLIC_URL;
    const [activeIndex, setActiveIndex] = useState(null);
    const [isDropdown, setIsDropdown] = useState(false);
    const [selectedDropdown, setSelectedDropdown] = useState(null);

    const navigate = useNavigate();

    const menuItems = [
        { name: "홈", defaultIcon: "home_icon.png", activeIcon: "home_color_icon.png" },
        { name: "통계", defaultIcon: "graph_icon.png", activeIcon: "graph_color_icon.png", hasDropdown: true },
        { name: "랭킹", defaultIcon: "ranking_icon.png", activeIcon: "ranking_color_icon.png" },
    ];

    const dropdownItems = ["전체", "대근육", "소근육", "유연성"];

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <h1 className="sidebarTitle">MYMEDI</h1>

                <img src={`${publicUrl}/images/image/profile.png`} alt="Profile" className="SideImage"/>
                <h3 className="sidebarName">아무개 님</h3>

                <ul className="sidebarList">
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <li
                                className={`sidebarListItem ${activeIndex === index ? "active" : ""}`}
                                onClick={() => {
                                    setActiveIndex(index);
                                    if (item.hasDropdown) {
                                        setIsDropdown(!isDropdown);
                                    } else {
                                        setIsDropdown(false);
                                        if (item.name === "홈") navigate("/main");
                                    }
                                }}
                            >
                                <img
                                    src={`${publicUrl}/images/icons/${activeIndex === index ? item.activeIcon : item.defaultIcon}`}
                                    alt={item.name}
                                    className="sidebarIcon"
                                />
                                <span>{item.name}</span>
                                {item.hasDropdown && (
                                    <FaCaretUp className={`dropdownArrow ${isDropdown ? "open" : ""}`} />
                                )}
                            </li>

                            {item.hasDropdown && isDropdown && activeIndex === index && (
                                <ul className="dropdownMenu">

                                    {dropdownItems.map((subItem, subIndex) => (
                                        <li
                                            key={subIndex}
                                            className={`dropdownItem ${selectedDropdown === subIndex ? "active" : ""}`}
                                            onClick={() => {
                                                setSelectedDropdown(subIndex);
                                                if (subItem !== "전체") {
                                                    navigate(`/stats/${subItem}`);
                                                }
                                            }}
                                        >
                                            {subItem}
                                        </li>
                                    ))}
                                    
                                </ul>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
                <button className="logoutButton">
                    <img
                        src={`${publicUrl}/images/icons/logout_icon.png`}
                        alt="로그아웃"
                        className="logoutIcon"
                    />
                    로그아웃
                </button>
            </div>
        </div>
    );
}
