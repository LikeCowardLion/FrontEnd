import React, { useState, useEffect } from "react";
import "../styles/daygraph.css";
import LineGraph from "./LineGraph";
import ScoreSummary from "./ScoreSummary";
import { getWeeklyResult } from "../service/WeeklyResultAPI";
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

const DayGraph = ({ sectionTitle, contents=[], initSelectedContent="" }) => {
  const {userId} = useAuth();
  const [selectedContent, setSelectedContent] = useState(contents[0] || "");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


  //부위 바뀌면 첫번째 콘텐츠로 초기화
  useEffect(() => {
    if (contents.length > 0) {
      // 쿼리로 넘어온 initSelectedContent가 contents에 포함되면 사용
      if (initSelectedContent && contents.includes(initSelectedContent)) {
        console.log('selectedContent:', selectedContent);
        setSelectedContent(initSelectedContent);
      } else {
        setSelectedContent(contents[0]);
      }
    }
  }, [contents, initSelectedContent]);

  //selectedContent가 바뀌면 API 호출
  useEffect(() => {
    if (!selectedContent) return;

    const fetchData = async () => {
      const gameId = gameIdMap[selectedContent];

    if (!gameId) {
      console.error("유효하지 않은 게임 이름 또는 gameId가 undefined:", selectedContent);
      return;
    }
      setLoading(true);
      try {
        const response = await getWeeklyResult(userId, gameId);
        console.log("[DayGraph]API 응답:", response);

         if (response.success) {
          console.log("결과 리스트:", response.resultList);
          const formatted = response.resultList.map((item) => ({
            date: item.date,
            value: item.bestScore,
          }));
          // 날짜 정렬
          formatted.sort((a, b) => new Date(a.date) - new Date(b.date));

          console.log("그래프용 데이터:", formatted);
          setData(formatted);
        } else {
          console.log("Api 성공 실패");
          setData([]);
        }
      } catch (e) {
        console.error("데이터 불러오기 실패:", e);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedContent]);

  return (
    <>
  <div className="section-header">
    <div className="section-title">{sectionTitle}</div>
        <div className="tabs">
          {contents.map((content) => (
            <span
              key={content}
              className={`tab ${selectedContent === content ? "active" : ""}`}
              onClick={() => setSelectedContent(content)}
            >
              {content}
            </span>
          ))}
        </div>
        </div>

    <div className="statpage-container">
      <div className="left-section">
        <div className="graph-block">
                  <p className="graph-title">일별 분석 그래프</p>
          {loading ? 
            <div>Loading...</div>:
            <LineGraph data={data} />}
        </div>
      </div>
      <div className="score-summary">
        <ScoreSummary 
          userId={userId}
          gameId={gameIdMap[selectedContent]} 
        />
      </div>
    </div>
    </>
  );
};

export default DayGraph;
