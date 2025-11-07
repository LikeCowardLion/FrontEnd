import './styles/totalpage.css';
import TotalCard from './components/TotalCard';
import useAuth from "../login/hooks/useAuth";

export default function TotalPage(){

    const {userId} = useAuth();

    const gameInfoMap = {
        "509fa6ba-00d5-4580-a750-2de60301f701": "행글라이딩",
        "5d1b7663-cbee-4433-b827-6859b744400e": "슈팅 박스",
        "7adf10a4-9eee-417b-b299-25c72b2509ba" : "자동차 핸들링",
        "8cd313e4-508e-4bb1-83b1-58d3561ca39b": "암벽 점프",
        "e7eb3f67-e527-41a1-9171-f7f4cb7a970d": "과일 부수기",
        "c3dd5fdc-f110-442b-9bb5-be03963124dd": "사커킥",
        "1fc1fcca-2750-4f98-96ee-c0f9805a5ba4": "물고기 낚시",
        "a483a18c-406f-4e9c-aa58-451c08ec003b": "보물 다이빙"
    };

    return (
        <div className="total-page">
            <div className="total-title">전체</div>
            <div className="page-explain">
                <div className="legend-wrapper">
                    <div className="legend-item">
                        <div className="dot my"></div>
                        <span className="label my-label">나의 평균</span>
                    </div>
                    <div className="legend-item">
                        <div className="dot peer"></div>
                        <span className="label peer-label">비슷한 나이대의 평균</span>
                    </div>
                </div>
            </div>
            <div className="total-page-grid">
                {Object.entries(gameInfoMap).map(([gameId, gameName]) => (
                    <TotalCard
                        key={`${userId}-${gameId}`}
                        userId={userId}
                        gameId={gameId}
                        gameName={gameName}
                    />
                ))}
            </div>
        </div>
    );
}