import './gradecard.css'

export default function GradeCard(){
    const publicUrl = process.env.PUBLIC_URL;

    return (
        <div className="gradeCard">
            <div className="gradeTitle">나의 등급 정보</div>

            <div className="gradeContent">
                <div className="gradeText">RED</div>
                <img className="gradeImage" src={`${publicUrl}/images/image/red_apple.png`} alt="등급 아이콘" />
            </div>

            <div className="gradeNotice">
                다음 등급인 <span>ORANGE</span>까지 3회 남았습니다.
            </div>

            <div className="gradeProgressBar">
                <div className="gradeProgressFill" style={{ width: '75%' }} />
            </div>
        </div>

    );
}