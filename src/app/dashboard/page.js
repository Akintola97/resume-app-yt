import Dashboard from "@/components/Dashboard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function DashboardPage(){
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return <div className="pt-16 p-6">Not Signed In</div>
    }
    return <Dashboard user = {user} />;
}