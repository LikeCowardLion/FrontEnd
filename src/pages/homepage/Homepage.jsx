import './homepage.css';
import HomeCalendar from './Calendar/HomeCalendar';
import GradeCard from './MyGrade/GradeCard';
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