import React, { useState } from 'react';
import RankingCard from './RankingCard';
import './ranking.css';

const sectionList = ['대근육', '소근육', '유연성'];
const contentBySection = {
  대근육: ['과일터뜨리기', '물고기잡기', '자동차핸들링'],
  소근육: ['컬링', '상자맞추기','암벽점프'],
  유연성: ['보물찾기','패러글라이딩'],
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
