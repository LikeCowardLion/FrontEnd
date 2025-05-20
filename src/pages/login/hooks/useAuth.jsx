import {useState} from "react";
import {useNavigate} from "react-router-dom";
import apiClient from "../../common/services/apiClient";

export default function useAuth(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    //LocalStorage에서 정보가져오기
    const getUser = () =>{
        const storedUser = localStorage.getItem("userInfo");
        return storedUser ? JSON.parse(storedUser) : null;
    };

    const [user, setUser] = useState(getUser());

    const login = async (email, password) =>{

        // 간단한 유효성 검사
        if (!email || !password) {
            alert("이메일과 비밀번호를 입력해주세요!");
            return;
        }

        try {
            setLoading(true);
            const response = await apiClient.post("/user/login", {
                emailId: email,
                password,
            });

            if (response.data.success) {
                alert("로그인 성공");
                const userInfo = response.data.userInfo;
                console.log("로그인 유저 정보:", userInfo);
                //local stroage에 저장
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                setUser(userInfo);
                navigate("/home"); //경로 이동
            } else {
                alert(response.data.message || "로그인 실패");
            }
        } catch (err) {
            console.error("로그인 오류", err);
            alert("서버 오류 발생");
        } finally {
            setLoading(false);
        }
    };

    const logout = () =>{
        localStorage.removeItem("userInfo");
        setUser(null);
        navigate("/login"); //로그인으로 이동
    }

    return {
        user,
        userId: user?.userId,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
    };
}