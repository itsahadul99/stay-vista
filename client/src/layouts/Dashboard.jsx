import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;