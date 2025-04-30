import './homepage.css';
import HomeCalendar from './Calendar/components/HomeCalendar';
import GradeCard from './MyGrade/components/GradeCard';
import ProfileCard from './MyProfile/ProfileCard';

export default function Homepage(){

    return (
        <div className="homepage-container">
            <div className="calendar-section">
                <HomeCalendar />
            </div>
            <div className="info-section">
                <ProfileCard />
                <GradeCard />
            </div>
        </div>
    );

}