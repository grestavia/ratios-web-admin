import SideNav from "./side-nav";

export default function MainLayout({ children }) {
  return (
    <>
      <main className="flex bg-[#F5FFFB]">
        <SideNav />
        {children}
      </main>
    </>
  );
}
