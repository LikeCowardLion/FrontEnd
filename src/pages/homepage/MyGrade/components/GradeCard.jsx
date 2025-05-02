import '../styles/gradecard.css'
import useResultCount from "../hooks/useResultCount";

export default function GradeCard(){
    const userId = "a6c92e61-2d4e-4d5f-8b11-77e6c4a9be89";
    const {count, loading } = useResultCount(userId);

    //나중에 등급별 기준표에 따라서 수정되어야함.
    // 따로 로직으로 구분 시켜주기
    const maxCount = 30;
    const remain = Math.max(0, maxCount - count);
    const percent = Math.min(100, (count/maxCount) * 100);

    const publicUrl = process.env.PUBLIC_URL;

    return (
        <div className="gradeCard">
            <div className="gradeTitle">나의 등급 정보</div>

            <div className="gradeContent">
                <div className="gradeText">RED</div>
                <img className="gradeImage" src={`${publicUrl}/images/image/apple.png`} alt="등급 아이콘" />
            </div>

            <div className="gradeNotice">
                {loading ? (
                    "불러오는 중 ..."
                    ) :(
                        <>
                            다음 등급인 <span>ORANGE</span>까지 {remain}회 남았습니다.
                        </>
                )}
            </div>

            <div className="gradeProgressBar">
                <div className="gradeProgressFill" style={{ width: `${percent}%` }} />
            </div>
        </div>

    );
}