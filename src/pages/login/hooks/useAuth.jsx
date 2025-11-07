import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getAuth} from "../services/loginAPI";

export default function useAuth(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    //LocalStorage에서 정보가져오기
    const getUser = () =>{
        const storedUser = localStorage.getItem("userInfo");
        return storedUser ? JSON.parse(storedUser) : null;
    };

    const [user, setUser] = useState(getUser());
    const [loggedOut, setLoggedOut] = useState(false);

    const login = async (email, password) =>{

        // 간단한 유효성 검사
        if (!email || !password) {
            alert("이메일과 비밀번호를 입력해주세요!");
            return;
        }

        try {
            setLoading(true);
            const response = await getAuth(email, password,);

            if (response.success) {
                alert("로그인 성공");
                const userInfo = response.userInfo;
                console.log("로그인 유저 정보:", userInfo);
                //local stroage에 저장
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                localStorage.removeItem("updateUserInfo"); //이전 수정 정보 초기화
                setUser(userInfo);
                navigate("/home"); //경로 이동
            } else if(!response.success) {
                alert("로그인 실패");
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
        setLoggedOut(true);
    }

    useEffect(() => {
        if (loggedOut && user === null) {
            navigate("/login");
        }
    }, [loggedOut, user, navigate]);

    return {
        user,
        userId: user?.userId,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        setUser,
    };
}