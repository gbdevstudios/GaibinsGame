import { Inter } from "next/font/google";

interface LayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }: LayoutProps) => {
  return (
    <main
      className={`${inter.className} flex flex-col items-center h-screen bg-stone-300 w-screen py-3 px-12` }
      style={{backgroundImage: 'linear-gradient(red, purple)'}}
    >
      <section className="border border-black rounded p-5 shadow bg-stone-100 w-full md:max-w-7xl py-"
      >
        {children}
      </section>
    </main>
  );
};

export default Layout;
