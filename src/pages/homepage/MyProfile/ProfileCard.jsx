import './profilecard.css';

export default function ProfileCard() {
    const publicUrl = process.env.PUBLIC_URL;

    return (
        <div className="profileCard">
            <span className="profileTitle">나의 프로필</span>
            <img className="editIcon" src={`${publicUrl}/images/icons/edit_icon.png`} alt="편집" />

            <div className="profileLeft">
                <img src={`${publicUrl}/images/image/profile.png`} className="profileImage" alt="프로필 사진" />
                <span className="profileName">아무개 님</span>
            </div>

            <div className="profileDivider" />

            <div className="profileRight">
                <div className="profileItem"><span>성별</span><span>남</span></div>
                <div className="profileItem"><span>나이</span><span>62세</span></div>
                <div className="profileItem"><span>키</span><span>172cm</span></div>
                <div className="profileItem"><span>몸무게</span><span>64kg</span></div>
            </div>
        </div>

    );
}