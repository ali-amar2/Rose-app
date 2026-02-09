import ProductsSidebar from "./_components/sidebar";

export default function Page() {
  return (
    <div className="grid grid-cols-12 px-20 py-10">
      <div className="col-span-3">
        <ProductsSidebar />
      </div>

      <div className="col-span-9 p-4"> {/* Products Page Content */} </div>
    </div>
  );
}
