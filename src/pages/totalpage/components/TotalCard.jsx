import '../styles/totalcard.css';
import {ArrowRight} from 'lucide-react';
import useAllStatisticResult from "../hooks/useAllStatisticResult";
import {useEffect, useState} from "react";
import useNavigateGraph from "../hooks/useNavigateGraph";

const maxScoreMap = {
    "8c1f02b9-4d90-4aa8-981d-2f02f7a9e2f3": 400, // 행글라이딩
    "a699ac38-9f5e-4e0e-9022-76e9ec0d961e": 200, // 슈팅 박스
    "d1229423-a29f-45c2-86c0-b1475630316e": 300, // 자동차 핸들링
    "9348059e-38ea-4500-b0dd-f2163f8903c5": 700, // 암벽 점프
    "9be7ef45-0021-4880-ac5e-dcf8fca5b3d3": 100, // 과일 부수기
    "f43cb81c-5124-4270-a9da-cc8e086676df": 200, // 풋 컬링
    "fa918d6a-cf6f-4d84-86b6-7761060e658d": 200, // 물고기 낚시
    "68bd94d0-d999-4fe9-86f0-34a09fbd3879": 600, // 보물 다이빙
};

export default function TotalCard({ userId , gameId, gameName }) {
    const { statisticList, loading } = useAllStatisticResult(userId); //loading 빼도 되면 빼버리기
    const [animate, setAnimate] = useState(false);
    const handleNavigate = useNavigateGraph(gameName);

    const stat = statisticList.find(item => item.gameId === gameId); //게임 id 확인
    const userScore = stat?.userAvgScore ?? 0;
    const peerScore = stat?.ageGroupAvgScore ?? 0;

    const maxScore = maxScoreMap[gameId] ?? 100; // 기본값 100
    const graphUserScore = Math.min(100, (userScore / maxScore) * 100);
    const graphPeerScore = Math.min(100, (peerScore / maxScore) * 100);

    //페이지 이동 시 애니메이션 재 실행
    useEffect(() => {
        if (stat) {
            setAnimate(false);
            requestAnimationFrame(() => setAnimate(true));
        }
    }, [stat?.userAvgScore, stat?.ageGroupAvgScore]);

    return (
        <div className="total-card">
            <div className="card-header">
                <span className="title">{gameName}</span>
                <ArrowRight className="arrow-icon" onClick={handleNavigate} />
            </div>
            <div className="card-content">
                <div className="chart-grid">

                    <div className="grid-x">
                        <span>0</span>
                        <span>25</span>
                        <span>50</span>
                        <span>75</span>
                        <span>100</span>
                    </div>
                    <div className="grid-box">
                        <div
                            className={`bar bar-main ${animate ? 'bar-animate' : ''}`}
                            style={{ width: `${graphUserScore}%`, top: 'calc(50% - 40px)' }}
                        />
                        <div
                            className={`bar bar-sub ${animate ? 'bar-animate' : ''}`}
                            style={{ width: `${graphPeerScore}%`, top: 'calc(50% + 10px)' }}
                        />
                        <div className="line-horizontal" style={{ top: '5%' }}></div>
                        <div className="line-horizontal" style={{ top: '35%' }}></div>
                        <div className="line-horizontal" style={{ top: '65%' }}></div>
                        <div className="line-horizontal" style={{ top: '95%' }}></div>

                        <div className="line-vertical" style={{ left: '25%' }}></div>
                        <div className="line-vertical" style={{ left: '50%' }}></div>
                        <div className="line-vertical" style={{ left: '75%' }}></div>
                        <div className="line-vertical" style={{ left: '100%' }}></div>
                    </div>

                </div>

                <div className="score-display">
                    <span className="main-score">{userScore}</span>
                    <span className="sub-score">/{peerScore}</span>
                </div>
            </div>
        </div>
    );
}