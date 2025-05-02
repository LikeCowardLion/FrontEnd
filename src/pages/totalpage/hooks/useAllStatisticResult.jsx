import { useState, useEffect, useCallback } from "react";
import { getAllStatistic } from "../services/allStatisticAPI";

export default function useAllStatisticResult(userId){

    const [loading, setLoading] = useState(true);
    const [statisticList, setStatisticList ] = useState([]);

    const fetchAllStatistic = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getAllStatistic(userId);
            if(response.success && Array.isArray(response.statisticList)){
                setStatisticList(response.statisticList);
            }else{
                console.warn("데이터가 없거나 요청 실패", response);
            }
        }catch (error){
            console.warn("전체 통계 조회 실패", error);
        }finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if(userId){
            fetchAllStatistic();
        }
    }, [statisticList, loading]);

    return { statisticList, loading };
}