import {useState, useEffect, useCallback, useRef} from "react";
import { getMonthResult } from "../services/calendarAPI";

export default function useCalendarActive(date, userId) {
    const [activeDate, setActiveDate] = useState({});
    const [loading, setLoading] = useState(false);

    const monthCache = useRef({}); //{'2024-05' :{...data} } 형식
    const prevKey = useRef(null); // 이전 요청(월)

    const formatActive = (year, month, dayResultList = []) => {
        const result = {};

        if (!Array.isArray(dayResultList)) return result;

        dayResultList.forEach(day => {
            const dateObj = new Date(year, month - 1, day.date); // 로컬 날짜 객체 생성
            const dayStr = dateObj.toISOString().slice(0, 10);
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
        const key = `${year}-${month.toString().padStart(2,'0')}`;

        //캐시 확인
        if(monthCache.current[key]){
            console.log(`캐시 호출: ${key}`, monthCache.current[key]);
            setActiveDate(monthCache.current[key]);
            return;
        }

        try {
            setLoading(true);
            const response = await getMonthResult(userId, year, month);

            if (response && response.success && Array.isArray(response.dayResultList)) {
                const formatted = formatActive(year, month, response.dayResultList);
                //캐시저장
                monthCache.current[key] = formatted;
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
        const key =  `${year}-${month.toString().padStart(2, '0')}`;

        // 달이 바뀌면 새로 불러오기
        if (prevKey.current !== key) {
            prevKey.current = key;
            fetchMonthResult(year, month);
        }
    }, [date, fetchMonthResult]);

    return { activeDate, loading };
}
