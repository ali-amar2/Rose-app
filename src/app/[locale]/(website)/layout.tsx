import Footer from "./(homepage)/_components/footer";
import Header from "./(homepage)/_components/header";
import HeaderSession from "./(homepage)/_components/header/header-session";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderSession />
      {children}
      <Footer />
    </>
  );
}
