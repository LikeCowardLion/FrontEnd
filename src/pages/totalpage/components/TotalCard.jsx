import '../styles/totalcard.css';
import {ArrowRight} from 'lucide-react';
import useAllStatisticResult from "../hooks/useAllStatisticResult";
import {useEffect, useState} from "react";
import useNavigateGraph from "../hooks/useNavigateGraph";

const maxScoreMap = {
    "509fa6ba-00d5-4580-a750-2de60301f701": 400, // 행글라이딩
    "5d1b7663-cbee-4433-b827-6859b744400e": 200, // 슈팅 박스
    "7adf10a4-9eee-417b-b299-25c72b2509ba": 300, // 자동차 핸들링
    "8cd313e4-508e-4bb1-83b1-58d3561ca39b": 700, // 암벽 점프
    "e7eb3f67-e527-41a1-9171-f7f4cb7a970d": 100, // 과일 부수기
    "c3dd5fdc-f110-442b-9bb5-be03963124dd": 200, // 사커킥
    "1fc1fcca-2750-4f98-96ee-c0f9805a5ba4": 200, // 물고기 낚시
    "a483a18c-406f-4e9c-aa58-451c08ec003b": 600, // 보물 다이빙
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