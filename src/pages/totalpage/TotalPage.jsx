import './totalpage.css';
import TotalCard from './TotalGraph/TotalCard';

export default function TotalPage(){

    return (
        <div className="total-page">
            <div className="total-title">
                전체
            </div>
            <div className="page-explain">
                <div className="legend-wrapper">
                    <div className="legend-item">
                        <div className="dot my"></div>
                        <span className="label my-label">나의 평균</span>
                    </div>
                    <div className="legend-item">
                        <div className="dot peer"></div>
                        <span className="label peer-label">비슷한 나이대의 평균</span>
                    </div>
                </div>
            </div>
            <div className="total-page-grid">
                <TotalCard />
                <TotalCard />
                <TotalCard />
                <TotalCard />
                <TotalCard />
                <TotalCard />
                <TotalCard />
                <TotalCard />
            </div>
        </div>
    );
}