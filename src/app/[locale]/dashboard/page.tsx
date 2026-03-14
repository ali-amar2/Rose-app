import OrdersStatus from "./_components/orders-status";
import Revenue from "./_components/revenue";
import DashboardStats from "./_components/statistics";

export default function page() {
  return (
    <div className="flex flex-col items-center p-2">
        <DashboardStats/>
      {/* Dashboard Overview Second Section */}
      <div className="flex w-full">
        <OrdersStatus />
        <Revenue />
      </div>
    </div>
  );
}
