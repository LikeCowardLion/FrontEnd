import React, { useState, useEffect } from "react";
import "../styles/daygraph.css";
import LineGraph from "./LineGraph";
import ScoreSummary from "./ScoreSummary";
import { getWeeklyResult } from "../service/WeeklyResultAPI";

const userId = "a6c92e61-2d4e-4d5f-8b11-77e6c4a9be89";
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

const DayGraph = ({ sectionTitle, contents=[] }) => {
  const [selectedContent, setSelectedContent] = useState(contents[0] || "");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

//부위 바뀌면 첫번째 콘텐츠로 초기화
  useEffect(() => {
    if (contents.length > 0) {
      setSelectedContent(contents[0]);
    }
  }, [contents]);

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
        console.log("API 응답:", response);

         if (response.success) {
          const formatted = response.resultList.map((item) => ({
            date: item.date,
            value: item.bestScore,
          }));
          setData(formatted);
        } else {
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
        <ScoreSummary />
      </div>
    </div>
    </>
  );
};

export default DayGraph;
