import DashboardBreadcrumb from "./_components/bread-crumb";
import DashboardSidebar from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64">
        <DashboardSidebar />
      </aside>
      <main className="flex flex-col flex-1">
        <div>
          <DashboardBreadcrumb />
        </div>
        <main className="bg-zinc-50 p-3 ">
          <div className="bg-white p-3 rounded-xl">{children}</div>
        </main>
      </main>
    </div>
  );
}
