import React, { useState } from 'react';
import RankingCard from './RankingCard';
import '../styles/ranking.css';

const sectionList = ['대근육', '소근육', '유연성'];
const contentBySection = {
  대근육: ['과일 터뜨리기', '물고기 잡기', '자동차 핸들링'],
  소근육: ['풋 컬링', '슈팅 박스','암벽 점프'],
  유연성: ['보물 찾기','행글라이딩'],
};

const RankingPage = () => {
  const [activeSection, setActiveSection] = useState('대근육');

  return (
    <div className="ranking-wrapper">
      <div className="section-tabs">
        {sectionList.map((section, index) => (
          <div
            key={index}
            className={`section-tab ${activeSection === section ? 'active' : ''}`}
            onClick={() => setActiveSection(section)}
        >
            {section}
            </div>
        ))}
      </div>

      <div
        className={`ranking-columns ${
          activeSection === '유연성' ? 'gap-wide' : ''
          }`}
>
      {contentBySection[activeSection].map((content, index) => (
          <div key={index} className="ranking-container">
          <RankingCard section={activeSection} contentName={content} />
        </div>
        ))}
      </div>
    </div>
  );
};

export default RankingPage;
