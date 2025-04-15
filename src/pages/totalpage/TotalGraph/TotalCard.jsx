import './totalcard.css';
import {ArrowRight} from 'lucide-react';

export default function TotalCard() {

    return (
        <div className="total-card">
            <div className="card-header">
                <span className="title">행글라이더</span>
                <ArrowRight className="arrow-icon"  />
            </div>
            <div className="card-content">
                <div className="chart-grid">

                    <div className="grid-x">
                        <span>0</span>
                        <span>25</span>
                        <span>50</span>
                        <span>75</span>
                        <span>100</span>
                    </div>
                    <div className="grid-box">

                        <div className="bar bar-main" style={{ width: '75%', top: 'calc(50% - 40px)' }}></div>
                        <div className="bar bar-sub" style={{ width: '22%', top: 'calc(50% + 10px)' }}></div>

                        <div className="line-horizontal" style={{ top: '5%' }}></div>
                        <div className="line-horizontal" style={{ top: '35%' }}></div>
                        <div className="line-horizontal" style={{ top: '65%' }}></div>
                        <div className="line-horizontal" style={{ top: '95%' }}></div>

                        <div className="line-vertical" style={{ left: '25%' }}></div>
                        <div className="line-vertical" style={{ left: '50%' }}></div>
                        <div className="line-vertical" style={{ left: '75%' }}></div>
                        <div className="line-vertical" style={{ left: '100%' }}></div>
                    </div>

                </div>

                <div className="score-display">
                    <span className="main-score">75</span>
                    <span className="sub-score">/22</span>
                </div>
            </div>
        </div>
    );
}