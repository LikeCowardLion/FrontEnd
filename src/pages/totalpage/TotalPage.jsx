import './styles/totalpage.css';
import TotalCard from './components/TotalCard';

export default function TotalPage(){

    const userId = "a6c92e61-2d4e-4d5f-8b11-77e6c4a9be89";

    const gameInfoMap = {
        "8c1f02b9-4d90-4aa8-981d-2f02f7a9e2f3": "행글라이더",
        "a699ac38-9f5e-4e0e-9022-76e9ec0d961e": "슈팅박스",
        "d1229423-a29f-45c2-86c0-b1475630316e" :  "자동차 핸들링",
        "9348059e-38ea-4500-b0dd-f2163f8903c5": "암벽 점프",
        "9be7ef45-0021-4880-ac5e-dcf8fca5b3d3": "과일 부수기",
        "f43cb81c-5124-4270-a9da-cc8e086676df": "풋 컬링",
        "fa918d6a-cf6f-4d84-86b6-7761060e658d": "물고기 낚시",
        "68bd94d0-d999-4fe9-86f0-34a09fbd3879": "보물 다이빙"
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
                        key={gameId}
                        userId={userId}
                        gameId={gameId}
                        gameName={gameName}
                    />
                ))}
            </div>
        </div>
    );
}