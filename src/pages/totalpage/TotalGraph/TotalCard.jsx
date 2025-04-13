import './totalcard.css';
import {BarChart, Bar, XAxis, YAxis, CartesianAxis} from "recharts";
import {ArrowRight} from 'lucide-react';

const data = [
    { name: 'Glider', main: 75, sub: 22 }
];

export default function TotalCard(){


    return (
        <div className="total-card">
            <div className="card-beader">
                <span className="title">행글라이더</span>
                <ArrowRight size={16} />
            </div>
            <div className="card-content">
                <BarChart width={180} height={100} data={data} layout="vertical">
                    <CartesianAxis strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" />

                    <Bar dataKey="main" barSize={20} radius={5} fill="#5DB075" />
                    <Bar dataKey="sub" barSize={20} radius={5} fill="#D9D9D9" />
                </BarChart>
                <div className="score-display">
                    <span className="main-score">75</span>
                    <span className="sub-score">/22</span>
                </div>
            </div>
        </div>
    );
}

