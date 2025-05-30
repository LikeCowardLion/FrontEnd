import {useNavigate} from "react-router-dom";
import gameCategoryMap from "../../common/constants/gameCategoryMap";


export default function useNavigateGraph(gameName){
    const navigate = useNavigate();

    return () => {
        const category = gameCategoryMap[gameName];
        if (!category) {
            console.error("게임 이름에 해당하는 카테고리를 찾을 수 없습니다:", gameName);
            return;
        }

        const query = new URLSearchParams({selected: gameName}).toString();
        navigate(`/statistics/${category}?${query}`);
    };
}