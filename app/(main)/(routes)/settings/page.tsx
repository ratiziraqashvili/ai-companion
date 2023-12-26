"use client"

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";


const SettingsPage = () => {
    const { signOut } = useClerk();

    return (
        <div className="p-4 flex">
            <div>
            <Button onClick={() => signOut()} variant="premium">
                Sign Out
            </Button>       
            </div>
        </div>
    )
}

export default SettingsPage;