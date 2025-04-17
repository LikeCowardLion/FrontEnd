import React from 'react';
import rankingData from './RankingData';
import './ranking.css';

const RankingCard = ({ section, contentName }) => {
  const data = rankingData[section]?.[contentName] || [];
  const currentUser = 'cuser';
  const sortedData = [...data].sort((a, b) => b.score - a.score);

  const myScore = sortedData.find((user) => user.name === currentUser);
  const myRank = sortedData.findIndex((user) => user.name === currentUser) + 1;

  return (
    <div className="ranking-container">
    <div className="ranking-title">{contentName}</div>

    <div className="ranking-card">
        <div className="ranking-invent">
            <div>등수</div>
            <div>닉네임</div>
            <div>나이대</div>
            <div>날짜</div>
            <div>점수</div>
        </div>
        {myScore && (
          <div className="ranking-my-score">
            <div>{myRank}</div>
            <div>{myScore.name}</div>
            <div>{myScore.age}</div>
            <div>{myScore.date}</div>
            <div>{myScore.score}</div>
          </div>
        )}
        <div className="ranking-box">
        <div className="ranking-list">
          {sortedData.map((user, index) => (
            <div
              key={index}
                className="ranking-item"
            >
                <div>{index + 1}</div>
                <div>{user.name}</div>
                <div>{user.age}</div>
                <div>{user.date}</div>
                <div>{user.score}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default RankingCard;
