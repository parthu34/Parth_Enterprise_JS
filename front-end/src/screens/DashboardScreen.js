import DashboardMenu from "../components/DashboardMenu";

const DashboardScreen = {
    after_render:()=>{},
    render:() => `
    <div class="dashboard">
        ${DashboardMenu.render({selected:'dashboard'})}
        <div class="dashboard-content">
            <h1>Dashboard</h1>
            <div>Indo and Charts will added here</div>
        </div>
    </div>
    `,
};

export default DashboardScreen