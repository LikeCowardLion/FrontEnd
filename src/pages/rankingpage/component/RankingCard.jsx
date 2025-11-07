import React, {useEffect, useState} from 'react';
import '../styles/ranking.css';
import { getRankResult } from '../service/RankResultAPI';
import useAuth from "../../login/hooks/useAuth";

const gameIdMap = {
  "암벽 점프": "8cd313e4-508e-4bb1-83b1-58d3561ca39b",
  "과일 부수기": "e7eb3f67-e527-41a1-9171-f7f4cb7a970d",
  "사커킥": "c3dd5fdc-f110-442b-9bb5-be03963124dd",
  "자동차 핸들링": "7adf10a4-9eee-417b-b299-25c72b2509ba",
  "물고기 낚시": "1fc1fcca-2750-4f98-96ee-c0f9805a5ba4",
  "슈팅 박스": "5d1b7663-cbee-4433-b827-6859b744400e",
  "보물 다이빙": "a483a18c-406f-4e9c-aa58-451c08ec003b",
  "행글라이딩": "509fa6ba-00d5-4580-a750-2de60301f701",
};

const RankingCard = ({ section, contentName }) => {
  const [rankList, setRankList] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const {userId} = useAuth();

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
