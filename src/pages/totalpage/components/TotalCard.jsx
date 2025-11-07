import '../styles/totalcard.css';
import {ArrowRight} from 'lucide-react';
import useAllStatisticResult from "../hooks/useAllStatisticResult";
import {useEffect, useMemo, useState} from "react";
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


export default function TotalCard({ userId, gameId, gameName }) {
  const { statisticList } = useAllStatisticResult(userId);
  const [animate, setAnimate] = useState(false);
  const handleNavigate = useNavigateGraph(gameName);

  const stat = statisticList.find(item => item.gameId === gameId);
  const userScore = stat?.userAvgScore ?? 0;
  const peerScore = stat?.ageGroupAvgScore ?? 0;

  // 1) 스케일 최대값: 게임별 고정 점수 있으면 그걸 사용, 없으면 데이터 기반 '그대로'
  const scaleMax = useMemo(() => {
    const fixedMax = maxScoreMap[gameId];
    if (fixedMax) return fixedMax;
    return Math.max(userScore, peerScore, 1);
  }, [gameId, userScore, peerScore]);

  // 2) 눈금값(절대값): 0, 25%, 50%, 75%, 100%
  const ticks = useMemo(
    () => [0, 0.25, 0.5, 0.75, 1].map(r => Math.round(scaleMax * r)),
    [scaleMax]
  );

  // 3) 막대 너비: 동일 기준(scaleMax)으로 %
  const graphUserPct = Math.min(100, (userScore / scaleMax) * 100);
  const graphPeerPct = Math.min(100, (peerScore / scaleMax) * 100);

  useEffect(() => {
    if (stat) {
      setAnimate(false);
      requestAnimationFrame(() => setAnimate(true));
    }
  }, [stat?.userAvgScore, stat?.ageGroupAvgScore, scaleMax]);

  return (
    <div className="total-card">
      <div className="card-header">
        <span className="title">{gameName}</span>
        <ArrowRight className="arrow-icon" onClick={handleNavigate} />
      </div>

      <div className="card-content">
        {/* 그래프 영역(단일 좌표계) */}
        <div className="chart-grid">
          {/* 1) 그리드(선만) */}
          <div className="grid-box">
            
            <div className="line-vertical" style={{ left: '25%' }} />
            <div className="line-vertical" style={{ left: '50%' }} />
            <div className="line-vertical" style={{ left: '75%' }} />
            <div className="line-vertical" style={{ left: '100%' }} />

            <div className="line-horizontal" style={{ top: '5%' }}></div>
            <div className="line-horizontal" style={{ top: '35%' }}></div>
            <div className="line-horizontal" style={{ top: '65%' }}></div>
            <div className="line-horizontal" style={{ top: '95%' }}></div>
          </div>

          {/* 2) x축 눈금(숫자) */}
          <div className="x-ticks">
            {ticks.map((t, i) => (
              <span
                key={i}
                className={`tick tick-${i}`}
                style={{ left: `${i * 25}%` }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* 3) 막대 */}
          <div className="bars">
            <div
              className={`bar bar-main ${animate ? 'bar-animate' : ''}`}
              style={{ width: `${graphUserPct}%`, top: 'calc(50% - 40px)' }}
            />
            <div
              className={`bar bar-sub ${animate ? 'bar-animate' : ''}`}
              style={{ width: `${graphPeerPct}%`, top: 'calc(50% + 10px)' }}
            />
          </div>
        </div>

        {/* 점수 표기 */}
        <div className="score-display">
          <span className="main-score">{userScore}</span>
          <span className="sub-score">/{peerScore}</span>
        </div>
      </div>
    </div>
  );
}