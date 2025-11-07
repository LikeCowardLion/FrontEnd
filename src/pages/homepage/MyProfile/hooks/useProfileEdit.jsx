import useAuth from "../../../login/hooks/useAuth";
import {useState} from "react";
import {getProfileEdit} from "../services/profileEditAPI";

export default function useProfileEdit(){
    const {user, setUser} = useAuth(); //user정보 가져오기

    const [userData, setUserData] = useState({
       userId: user.userId,
       nickname : user?.nickname || "",
       gender : user?.gender || "",
       age : user?.age || "",
       tall : user?.tall || "",
       weight : user?.weight || "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) =>{ //input 변경
        const {name, value} = e.target;
        setUserData(prev => ({...prev, [name]: value}));
    };

    const toggleEdit =()=> {
        setIsEditing(prev => !prev);
        setMessage(null);
    }

    const handleSubmit = async () =>{
        try {
            const response = await getProfileEdit(userData);
            const { success, message, userInfo } = response;

            setMessage(message);

            if (success) {

                //localStorage에 저장해서 이정보를 ㄱ바로 가져오기.
                localStorage.setItem("updateUserInfo", JSON.stringify(userData));
                setUser(userData);

                setIsEditing(false);
            }
        } catch (e) {
            setMessage("수정 중 오류 발생");
            console.log(e);
        }
    };

    return {
      userData,
      handleChange,
      isEditing,
      toggleEdit,
      handleSubmit,
      message,
    };
}