import '../styles/profilecard.css';
import useAuth from "../../../login/hooks/useAuth";
import useProfileEdit from "../hooks/useProfileEdit";

export default function ProfileCard() {
    const publicUrl = process.env.PUBLIC_URL;
    const {user} = useAuth(); //user정보 가져오기
    const {
        userData,
        handleChange,
        isEditing,
        toggleEdit,
        handleSubmit,
        message
    } = useProfileEdit();

    const localUser = JSON.parse(localStorage.getItem("updateUserInfo"));
    const disUser = localUser || user;

    if (!disUser) return null;

    return (
        <div className="profileCard">
            <span className="profileTitle">나의 프로필</span>
            <img className="editIcon"
                 src={`${publicUrl}/images/icons/edit_icon.png`}
                 alt="편집"
                 onClick={toggleEdit}
                 style={{cursor:'pointer'}}
            />

            <div className="profileLeft">
                <img
                    src={disUser?.image?.trim() ? disUser.image : `${publicUrl}/images/image/profile.png`}
                    className="profileImage"
                    alt="프로필 사진"
                />
                {
                    isEditing ?(
                        <input
                            type="text"
                            name="nickname"
                            value={userData.nickname}
                            onChange={handleChange}
                            className="profileNameInput"
                        />
                    ): (
                    <span className="profileName">{disUser.nickname} 님</span>
                    )
                }
            </div>

            <div className="profileDivider" />

            <div className="profileRight">
                <div className="profileItem">
                    <span>성별</span>
                    {isEditing ? (
                        <select name="gender" value={userData.gender} onChange={handleChange}>
                            <option value="">선택</option>
                            <option value="FEMALE">여</option>
                            <option value="MALE">남</option>
                        </select>
                    ) : (
                        <span>{disUser.gender === "FEMALE" ? "여" : disUser.gender === "MALE" ? "남" : "-"}</span>
                    )}
                </div>

                <div className="profileItem">
                    <span>나이</span>
                    {isEditing ? (
                        <input type="number" name="age" value={userData.age} onChange={handleChange} />
                    ) : (
                        <span>{disUser.age}세</span>
                    )}
                </div>

                <div className="profileItem">
                    <span>키</span>
                    {isEditing ? (
                        <input type="number" name="tall" value={userData.tall} onChange={handleChange} />
                    ) : (
                        <span>{disUser.tall}cm</span>
                    )}
                </div>

                <div className="profileItem">
                    <span>몸무게</span>
                    {isEditing ? (
                        <input type="number" name="weight" value={userData.weight} onChange={handleChange} />
                    ) : (
                        <span>{disUser.weight}kg</span>
                    )}
                </div>
            </div>

            {isEditing && (
                <div className="profileSaveButtonWrapper">
                    <button className="profileSaveButton" onClick={handleSubmit}>저장</button>
                    {message && <div className="profileMessage">{message}</div>}
                </div>
            )}
        </div>
    );
}