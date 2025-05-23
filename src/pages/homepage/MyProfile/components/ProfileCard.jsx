import '../styles/profilecard.css';
import useAuth from "../../../login/hooks/useAuth";

export default function ProfileCard() {
    const publicUrl = process.env.PUBLIC_URL;
    const {user} = useAuth(); //user정보 가져오기

    if (!user) return null;

    return (
        <div className="profileCard">
            <span className="profileTitle">나의 프로필</span>
            <img className="editIcon" src={`${publicUrl}/images/icons/edit_icon.png`} alt="편집" />

            <div className="profileLeft">
                <img
                    src={user?.image?.trim() ? user.image : `${publicUrl}/images/image/profile.png`}
                    className="profileImage"
                    alt="프로필 사진"
                />
                <span className="profileName">{user.nickname} 님</span>
            </div>

            <div className="profileDivider" />

            <div className="profileRight">
                <div className="profileItem"><span>성별</span><span>{user.gender === "FEMALE" ? "여" : user.gender === "MALE" ? "남" : "-"}</span></div>
                <div className="profileItem"><span>나이</span><span>{user.age}세</span></div>
                <div className="profileItem"><span>키</span><span>{user.tall}cm</span></div>
                <div className="profileItem"><span>몸무게</span><span>{user.weight}kg</span></div>
            </div>
        </div>

    );
}