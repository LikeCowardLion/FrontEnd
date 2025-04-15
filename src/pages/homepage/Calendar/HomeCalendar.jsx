import React, { useState } from "react";
import Calendar from 'react-calendar';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import 'react-calendar/dist/Calendar.css';
import './homeCalendar.css';

const activitiesByDate = {
    "2025-03-26": [
        { type: "소근육", title: "자동차 핸들링", time: "09:00 ~ 12:30" },
        { type: "소근육", title: "블록쌓기", time: "14:00 ~ 15:00" },
    ],
    "2025-03-27": [
        { type: "대근육", title: "공놀이", time: "10:00 ~ 11:30" },
        { type: "소근육", title: "핸들링", time: "10:00 ~ 11:30" },
        { type: "대근육", title: "블록쌓기", time: "10:00 ~ 11:30" },
        { type: "소근육", title: "공놀이", time: "10:00 ~ 11:30" },
        { type: "대근육", title: "공놀이", time: "10:00 ~ 11:30" },
        { type: "소근육", title: "공놀이", time: "10:00 ~ 11:30" },
        { type: "대근육", title: "공핸들링놀이", time: "10:00 ~ 11:30" },
        { type: "소근육", title: "공놀핸들링이", time: "10:00 ~ 11:30" },
        { type: "대근육", title: "공 놀 이", time: "10:00 ~ 11:30" }, { type: "소근육", title: "공놀이", time: "10:00 ~ 11:30" },
        { type: "소근육", title: "공놀블록쌓기이", time: "10:00 ~ 11:30" }, { type: "대근육", title: "공놀이", time: "10:00 ~ 11:30" },
    ],
    "2025-03-30": [
        { type: "유연성", title: "스트레칭", time: "11:00 ~ 12:00" },
    ],
};

export default function HomeCalendar() {
    const [value, setValue] = useState(new Date());

    const formatDateKey = (date) => date.toISOString().slice(0, 10);
    const selectedDateKey = formatDateKey(value);
    const activityList = activitiesByDate[selectedDateKey] || [];

    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

    return (
        <div className="calendarWrapper">
            <Calendar
                onChange={setValue}
                value={value}
                calendarType="gregory"
                formatDay={(locale, date) => date.getDate().toString().padStart(2, '0')}
                locale="ko-KR"
                // custom navigation
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
            />

            <div className="calendarDetail">
                <h3>
                    {value.getMonth() + 1}월 {value.getDate()}일 {dayNames[value.getDay()]}요일
                </h3>
                <div className="detailDivider" />
                <p className="detailTitle">플레이 내역</p>

                <div className="activityList">
                    {activityList.length === 0 ? (
                        <p className="noActivity">기록된 플레이 내역이 없습니다.</p>
                    ) : (
                        activityList.map((activity, i) => (
                            <div className="activityItem" key={i}>
                                <span className="calendar-dot" />
                                <span className="activityText">[{activity.type}] {activity.title}</span>
                                <span className="activityTime">{activity.time}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
}
