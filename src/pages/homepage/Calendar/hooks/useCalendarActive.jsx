import { useState, useEffect} from "react";
import {getMotnthResult} from "../services/calendarAPI";

export default function useCalendarActive(date, userId){
    const [activeDate, setActiveDate] = useState({});
    const [loading, setLoading] = useState(false);

    //dayResultCount도 나중에 사용해야함.

    const formatActive = (year, month, dayResultList)=> {
        const result = {};

        dayResultList.forEach(day => {
            const dayStr = `${year}-${month.toString().padStart(2, '0')}-${day.date.toString().padStart(2, '0')}`;
            result[dayStr] = {
                count: day.dayResultCount,
                activities: day.detailResultList.map(detail => ({
                    type : detail.category,
                    title : detail.title,
                    time : `${detail.startedAt} ~ ${detail.finishedAt}`,
                }))
            };
        });

        return result;
    };

    const fetchMonthResult = async (year, month) => {
        try{
            setLoading(true);
            const data = await getMotnthResult(userId, year, month);

            if(data.success){
                const formatted = formatActive(year, month, data.dayResultList);
                setActiveDate(formatted);
            }
        }catch (error){
            console.error("월간 조회 실패", error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        fetchMonthResult(year, month);
    }, [date.getFullYear(), date.getMonth()]);

    return {activeDate, loading};
}