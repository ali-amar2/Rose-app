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
      <main className="flex-1">{children}</main>
    </div>
  );
}
