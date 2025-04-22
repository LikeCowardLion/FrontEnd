import { useLocation } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";

function Layout({ children }) {
    const location = useLocation();
    const hideSidebar = ["/login", "/signup"].includes(location.pathname);

    return (
        <div className="App">
            <div className="container">
                {!hideSidebar && <Sidebar />}
                <div className="others">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
