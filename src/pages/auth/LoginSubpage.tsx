import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

export default function LoginSubpage() {
    return (
        <>
        <div>
            <p className="font-bold text-2xl">Welcome Back</p>
            <p className="font-bold text">Welcome Back</p>
        </div>

        <div className="flex flex-col gap-5">
            <Input className="bg-transparent" placeholder="Email"/>
            <Input className="bg-transparent" placeholder="Password"/>
            <Button className="text-white font-bold">Login</Button>
        </div>
        <div></div>
        </>
    )
}