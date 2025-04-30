import './styles/totalpage.css';
import TotalCard from './components/TotalCard';

export default function TotalPage(){

    const userId = "a6c92e61-2d4e-4d5f-8b11-77e6c4a9be89";

    const gameInfoMap = {
        "8c1f02b9-4d90-4aa8-981d-2f02f7a9e2f3": "행글라이더",
        "68bd94d0-d999-4fe9-86f0-34a09fbd3879": "슈팅박스",
        "a699ac38-9f5e-4e0e-9022-76e9ec0d961e" :  "자동차 핸들링",
        "gameId4": "게임 1",
        "gameId5": "게임 2",
        "gameId6": "게임 3",
        "gameId7": "게임 4",
        "gameId8": "게임 5"
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