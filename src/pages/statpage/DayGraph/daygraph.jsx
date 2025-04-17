import React, { useState } from "react";
import "./daygraph.css";
import LineGraph from "./LineGraph";
import ScoreSummary from "./ScoreSummary";

const DayGraph = ({ sectionTitle, contents, graphData }) => {
  const [selectedContent, setSelectedContent] = useState(contents[0]);


  return (
    <div className="daygraph-container">
      <div className="left-section">
        <p className="section-title">{sectionTitle}</p>
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

        <div className="graph-block">
                  <p className="graph-title">일별 분석 그래프</p>
          <LineGraph data={graphData[selectedContent]} />
        </div>
      </div>
      <div className="score-summary">
        <ScoreSummary />
      </div>
    </div>
  );
};

export default DayGraph;
