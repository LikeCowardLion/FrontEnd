import React, { useState } from "react";
import Calendar from 'react-calendar';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import 'react-calendar/dist/Calendar.css';
import '../styles/homeCalendar.css';
import useCalendarActive from "../hooks/useCalendarActive";
import useAuth from "../../../login/hooks/useAuth";

const categoryMap = {
    FLEXIBILITY: "유연성",
    GROSS_MOTOR : "대근육",
    FINE_MOTOR : "소근육",
};

export default function HomeCalendar() {
    const [value, setValue] = useState(new Date());
    const [activeStartDate, setActiveStartDate] = useState(new Date());

    const {userId} = useAuth();

    if (!userId) {
        console.log("LoacalStorage의 userInfo가 없음.");
    }

    const { activeDate, loading } = useCalendarActive(activeStartDate, userId);

    const formatDateKey = (date) => date.toISOString().slice(0, 10);
    const selectedDateKey = formatDateKey(value);
    const activityList = activeDate[selectedDateKey]?.activities || [];
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

    return (
        <div className="calendarWrapper">
            <Calendar
                onChange={setValue}
                value={value}
                calendarType="gregory"
                onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)} //월 변경 시 로직
                formatDay={(locale, date) => date.getDate().toString().padStart(2, '0')}
                locale="ko-KR"
                navigationLabel={({ date }) => {
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;
                    return (
                        <div className="custom-label">
                            <span className="month">{month}월</span>
                            <span className="year">{year}</span>
                        </div>
                    );
                }}
                prevLabel={<IoChevronBack className="navArrow" />}
                nextLabel={<IoChevronForward className="navArrow" />}
                tileClassName={({date, view, activeStartDate}) => {
                    const key = formatDateKey(date);
                    const count = activeDate[key]?.activities?.length || 0;
                    //이번 달이 아닌 날짜는 css 건너뛰기
                    const isMonth = date.getFullYear() === activeStartDate.getFullYear()
                        && date.getMonth() === activeStartDate.getMonth();
                    if(!isMonth) return null;

                    if(count >= 5) return 'activity-high';
                    if(count >= 3) return 'activity-medium';
                    if(count >= 1) return 'activity-low';
                    return null;
                }}
            />

            <div className="calendarDetail">
                <h3>
                    {value.getMonth() + 1}월 {value.getDate()}일 {dayNames[value.getDay()]}요일
                </h3>
                <div className="detailDivider" />
                <p className="detailTitle">플레이 내역</p>

                <div className="activityList">
                    {loading ? (
                        <p className="loading">로딩 중...</p>
                    ) : activityList.length === 0 ? (
                        <p className="noActivity">기록된 플레이 내역이 없습니다.</p>
                    ) : (
                        activityList.map((activity, i) => (
                            <div className="activityItem" key={i}>
                                <span className="calendar-dot" />
                                <span className="activityText">
                                    [{categoryMap[activity.type] || activity.type }] {activity.title}
                                </span>
                                <span className="activityTime">{activity.time}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
