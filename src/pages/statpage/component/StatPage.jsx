import React from "react";
import {useLocation, useParams} from "react-router-dom";
import DayGraph from "../component/daygraph";
import statData from "../StatData";


const StatPage = () => {
  const { category } = useParams();
  const location = useLocation(); //location 추가

  //Param을 받아와서 selected된 값을 DayGraph에 보내줌
  const sectionData = statData[category];
  const queryParams = new URLSearchParams(location.search);
  const selected = queryParams.get("selected"); //ex. 암벽 점푸

  if (!sectionData) {
    return <div>해당 섹션의 데이터를 찾을 수 없습니다 </div>;
  }

  return (
    <div className="container">
      <div className="others">
        <DayGraph
          sectionTitle={sectionData.title}
          contents={sectionData.contents}
          initSelectedContent = {selected}
        />
      </div>
    </div>
  );
};

export default StatPage;
