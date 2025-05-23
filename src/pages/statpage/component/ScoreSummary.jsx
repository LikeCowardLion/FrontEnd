import React, { useEffect, useState } from "react";
import "../styles/ScoreSummary.css";
import { getStatisticResult } from "../service/StatisticResultAPI";

const ScoreSummary = ({userId, gameId}) => {
  const [stat, setStat] = useState({
    best:0,
    userAvg:0,
    ageAvg:0,
  });

useEffect(()=> {
  const fetchStats = async () => {
    if(!userId || !gameId) return;

    try {
      const res = await getStatisticResult(userId, gameId);
      if(res.success && res.statisticInfo){
        setStat({
          best:res.statisticInfo.userBestScore,
          userAvg: res.statisticInfo.userAvgScore,
          ageAvg: res.statisticInfo.ageGroupAvgScore,
        });
      } else{
        console.log("통계 데이터 없음")
      }
    } catch(e) {
      console.error("통계 데이터 불러오기 실패", e);
    }
  };

  fetchStats();
}, [userId, gameId]);

  return (
    <div className="score-summary-wrapper">

      <div className="score-card">
        <div className="score-label">
          <div className="label-title">최고점수</div>
          <div className="label-sub">
            <span className="label-number">{new Date().getMonth() + 1}</span>
            <span className="label-unit">월</span>
          </div>
        </div>
        <div className="score-divider" />
        <div className="score-value">{stat.best}<span className="unit">점</span></div>
      </div>

      <div className="score-card">
        <div className="score-label">
          <div className="label-title">비슷한 나이대의<br />평균 점수</div>
        </div>
        <div className="score-divider" />
        <div className="score-value">{stat.ageAvg}<span className="unit">점</span></div>
      </div>

      <div className="score-card">
        <div className="score-label">
          <div className="label-title">나의 평균 점수</div>
          <div className="label-subtitle">최근 1개월 간</div>
        </div>
        <div className="score-divider" />
        <div className="score-value">{stat.userAvg}<span className="unit">점</span></div>
      </div>
    </div>
  );
};

export default ScoreSummary;
