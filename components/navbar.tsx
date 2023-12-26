import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
    return (
        <div className="flex items-center justify-between h-16 border-b-[1px] border-primary/10 sm:p-4 p-2 fixed w-full bg-secondary z-[50]">
            <div className="text-3xl hidden md:block font-bold text-primary cursor-pointer">
                <Link href="/">
               ai-companion
                </Link>
            </div>
              <MobileSidebar />
            <div className="flex space-x-2 sm:space-x-4 items-center"> 
                <UserButton afterSignOutUrl="/" />        
            </div>
        </div>
    )
}