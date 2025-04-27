import React, { useState } from "react";
import Calendar from 'react-calendar';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import 'react-calendar/dist/Calendar.css';
import '../styles/homeCalendar.css';
import useCalendarActive from "../hooks/useCalendarActive";


export default function HomeCalendar() {
    const [value, setValue] = useState<Date>(new Date());
    const userId = "a6c92e61-2d4e-4d5f-8b11-77e6c4a9be89"; //되는 지 확인
    const { activeDate, loading } = useCalendarActive(value, userId);

    const formatDateKey = (date) => date.toISOString().slice(0, 10);
    const selectedDateKey = formatDateKey(value);
    const activityList = activeDate[selectedDateKey]?.activities || []; // 날짜별 actives 활동 내역
    const activityCount = activeDate[selectedDateKey]?.count || 0; // count 개수
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

    return (
        <div className="calendarWrapper">
            <Calendar
                onChange={setValue}
                value={value}
                calendarType="gregory"
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
            />

            <div className="calendarDetail">
                <h3>
                    {value.getMonth() + 1}월 {value.getDate()}일 {dayNames[value.getDay()]}요일
                </h3>
                <div className="detailDivider" />
                <p className="detailTitle">플레이 내역</p>

                <div className="activityList">
                    {loading ? (
                        <p className="loading"> 로딩 중...</p>
                    ) : activityList.length === 0 ? (
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
