import React, {useEffect, useState} from 'react';
import '../styles/ranking.css';
import { getRankResult } from '../service/RankResultAPI';

const gameIdMap = {
  "암벽 점프": "9348059e-38ea-4500-b0dd-f2163f8903c5",
  "과일 부수기": "9be7ef45-0021-4880-ac5e-dcf8fca5b3d3",
  "풋 컬링": "f43cb81c-5124-4270-a9da-cc8e086676df",
  "자동차 핸들링": "d1229423-a29f-45c2-86c0-b1475630316e",
  "물고기 낚시": "fa918d6a-cf6f-4d84-86b6-7761060e658d",
  "슈팅 박스": "a699ac38-9f5e-4e0e-9022-76e9ec0d961e",
  "보물 다이빙": "68bd94d0-d999-4fe9-86f0-34a09fbd3879",
  "행글라이딩": "8c1f02b9-4d90-4aa8-981d-2f02f7a9e2f3",
};

const RankingCard = ({ section, contentName }) => {
  const [rankList, setRankList] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const userId = 'a6c92e61-2d4e-4d5f-8b11-77e6c4a9be89';

  useEffect(()=> {
    const fetchRanking = async() => {
      const gameId = gameIdMap[contentName];
      if(!gameId) return;
      try {
        const response = await getRankResult(userId, gameId);
        if (response.success){
          setRankList(response.rankInfo.resultList || []);
          setMyRank(response.rankInfo.userResultInfo || null);
        }
      } catch (e){
        console.error("랭킹 조회 실패:", e);
      }
    };

    fetchRanking();
  },[contentName]);

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
        {myRank && (
          <div className="ranking-my-score">
            <div>{myRank.rank}</div>
            <div>{myRank.nickname}</div>
            <div>{myRank.age}</div>
            <div>{myRank.date}</div>
            <div>{myRank.score}</div>
          </div>
        )}
        <div className="ranking-box">
        <div className="ranking-list">
          {rankList.map((user, index) => (
            <div className="ranking-item" key={index}>
                <div>{user.rank}</div>
                <div>{user.nickname}</div>
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
