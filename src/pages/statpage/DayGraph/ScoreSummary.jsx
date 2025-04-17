import React from "react";
import "./ScoreSummary.css";

const ScoreSummary = () => {
  return (
    <div className="score-summary-wrapper">

      <div className="score-card">
        <div className="score-label">
          <div className="label-title">최고점수</div>
          <div className="label-sub">
            <span className="label-number">8</span>
            <span className="label-unit">월</span>
          </div>
        </div>
        <div className="score-divider" />
        <div className="score-value">75<span className="unit">점</span></div>
      </div>

      <div className="score-card">
        <div className="score-label">
          <div className="label-title">비슷한 나이대의<br />평균 점수</div>
        </div>
        <div className="score-divider" />
        <div className="score-value">75<span className="unit">점</span></div>
      </div>

      <div className="score-card">
        <div className="score-label">
          <div className="label-title">나의 평균 점수</div>
          <div className="label-subtitle">최근 1개월 간</div>
        </div>
        <div className="score-divider" />
        <div className="score-value">75<span className="unit">점</span></div>
      </div>
    </div>
  );
};

export default ScoreSummary;
