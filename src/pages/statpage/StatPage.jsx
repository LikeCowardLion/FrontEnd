import React from "react";
import { useParams } from "react-router-dom";
import DayGraph from "./DayGraph/daygraph";
import statData from "./StatData";


const StatPage = () => {
  const { category } = useParams();
  const sectionData = statData[category];

  if (!sectionData) {
    return <div>해당 섹션의 데이터를 찾을 수 없습니다 </div>;
  }

  return (
    <div className="container">
      <div className="others">
        <DayGraph
          sectionTitle={sectionData.title}
          contents={sectionData.contents}
          graphData={sectionData.graphData}
        />
      </div>
    </div>
  );
};

export default StatPage;
