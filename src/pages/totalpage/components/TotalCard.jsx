import '../styles/totalcard.css';
import {ArrowRight} from 'lucide-react';
import useAllStatisticResult from "../hooks/useAllStatisticResult";
import {useEffect, useState} from "react";

export default function TotalCard({ userId , gameId, gameName }) {
    const { statisticList, loading } = useAllStatisticResult(userId); //loading 빼도 되면 빼버리기
    const [animate, setAnimate] = useState(false);

    const stat = statisticList.find(item => item.gameId === gameId); //게임 id 확인
    const userScore = stat?.userAvgScore ?? 0;
    const peerScore = stat?.ageGroupAvgScore ?? 0;

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
                <ArrowRight className="arrow-icon"  />
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
                            style={{ width: `${userScore}%`, top: 'calc(50% - 40px)' }}
                        />
                        <div
                            className={`bar bar-sub ${animate ? 'bar-animate' : ''}`}
                            style={{ width: `${peerScore}%`, top: 'calc(50% + 10px)' }}
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