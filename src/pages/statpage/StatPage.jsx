import React from "react";
import { useParams } from "react-router-dom";
import DayGraph from "./DayGraph/daygraph";
import statData from "./StatData";
import Sidebar from '../sidebar/Sidebar';


const StatPage = () => {
  const { section } = useParams();
  const sectionData = statData[section];

  if (!sectionData) {
    return <div>해당 섹션의 데이터를 찾을 수 없습니다 😥</div>;
  }

  return (
    <div className="App">
    <div className="container">
      <Sidebar />
      <div className="others">
        <DayGraph
          sectionTitle={section}
          contents={sectionData.contents}
          graphData={sectionData.graphData}
        />
      </div>
    </div>
  </div>
  );
};

export default StatPage;
