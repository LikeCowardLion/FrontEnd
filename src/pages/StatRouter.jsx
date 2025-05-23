import React from "react";
import { useParams } from "react-router-dom";
import TotalPage from "./totalpage/TotalPage";
import StatPage from "./statpage/component/StatPage";

export default function StatRouter() {
    const { category } = useParams();

    if (category === "total") {
        return <TotalPage />;
    } else if (["upper", "lower", "flexibility"].includes(category)) {
        return <StatPage />;
    } else {
        return <div>해당 카테고리는 존재하지 않습니다</div>;
    }
}
