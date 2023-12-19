import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <Navbar />
            <div className="hidden md:flex mt-16 h-full w-20 fixed bg-secondary">
                <Sidebar />
            </div>
            <main className="h-full md:ml-20 p-4">
                {children}
            </main>
        </div>
    )
}

export default MainLayout;