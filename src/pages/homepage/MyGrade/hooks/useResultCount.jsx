import { useState, useEffect, useCallback } from "react";
import {getResultCount} from "../services/gradeAPI";

export default function useResultCount(userId) {

    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchCount = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getResultCount(userId);

            if (response.success) {
                setCount(response.count);
            } else {
                console.warn("데이터가 없거나 요청 실패", response);
                setCount(0); //없을 시 0으로 설정
            }
        } catch (error) {
            console.warn("결과 카운트 조회 실패", error);
            setCount(0); //없을 시 0으로 설정
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchCount();
        }
    }, [userId, fetchCount]);

    return {count, loading};

}