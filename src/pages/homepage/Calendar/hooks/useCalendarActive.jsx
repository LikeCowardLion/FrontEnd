import { useState, useEffect, useCallback } from "react";
import { getMonthResult } from "../services/calendarAPI";

export default function useCalendarActive(date, userId) {
    const [activeDate, setActiveDate] = useState({});
    const [loading, setLoading] = useState(false);

    const formatActive = (year, month, dayResultList = []) => {
        const result = {};

        if (!Array.isArray(dayResultList)) {
            console.warn("dayResultList 형식 오류(배열X)", dayResultList);
            return result;
        }

        dayResultList.forEach(day => {
            const dayStr = `${year}-${month.toString().padStart(2, '0')}-${day.date.toString().padStart(2, '0')}`;
            result[dayStr] = {
                count: day.dayResultCount,
                activities: (day.detailResultList || []).map(detail => ({
                    type: detail.category,
                    title: detail.title,
                    time: `${detail.startedAt} ~ ${detail.finishedAt}`,
                }))
            };
        });

        return result;
    };

    const fetchMonthResult = useCallback(async (year, month) => {
        try {
            setLoading(true);
            const response = await getMonthResult(userId, year, month);

            if (response && response.success && Array.isArray(response.dayResultList)) {
                const formatted = formatActive(year, month, response.dayResultList);
                setActiveDate(formatted);
            } else {
                console.warn("데이터가 없거나 요청 실패", response);
                setActiveDate({});
            }
        } catch (error) {
            console.error("월간 조회 실패", error);
            setActiveDate({});
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        fetchMonthResult(year, month);
    }, [date, fetchMonthResult]);

    return { activeDate, loading };
}
