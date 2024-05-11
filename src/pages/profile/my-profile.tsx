import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Toggle } from '@components/ui/toggle'
import { useAuth } from '@lib/hooks/useAuth'
import { useService } from '@lib/hooks/useService'
import { useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { UserRequest } from 'src/declarations/backend/backend.did'
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogFooter
} from '@components/ui/alert-dialog'; 

export default function MyProfile() {
    const {user, isLoading} = useAuth()
    const {getBackendService} = useService()
    const [hideIdentity, setHideIdentity] = useState(true);
    //formnya entar aja gapenting lah? tunggu bikin backend
    const [dialogOpen, setDialogOpen] = useState(false);

    const [data, setData] = useState<UserRequest>({
        first_name: '',
        last_name: '',
        email: '',
        birth_date: ''
    });

    const changeData = (key : string, value : string) => {
        setData({
            ...data,
            [key]: value
        })
    }
    const hasChanges = useMemo(() => {
        //@ts-ignore
        if(data && user) return Object.keys(data).some(key => data[key] !== user[key]);
    }, [data, user]);

    useEffect(() => {
        setData({
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            email: user?.email || '',
            birth_date: user?.birth_date || ''
        });
    }, [user, isLoading]);

    const { mutate: updateProfile, isLoading: updateProfileLoading, error: updateProfileError, isSuccess } = useMutation(
        async () => {
            if(data.first_name === "" || data.last_name === "" || data.birth_date === "" || data.email === ""){
                throw new Error("Please fill all fields")
            }
            if(!data.email.includes("@")){
                throw new Error("Invalid email")
            }
            const backendService = await getBackendService()
            const response = await backendService.updateUser(
                {
                    birth_date:data.birth_date,
                    email:data.email,
                    first_name:data.first_name,
                    last_name:data.last_name,
                }
            )

            return response
            // console.log(data);
        }, {
        onSettled:()=>{
            setDialogOpen(true); 
        },
        onError: (error: Error) => {
            console.error('Error during creating charity:', error.message);
        },
        onSuccess: (data) => {
            console.log('Created charity successfully:', data);
        }
    });

    if (isLoading) {
        return <>Loading...</>;
    }

    return (
        <>
        <div className='w-full h-fit flex flex-col gap-12'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2  text-center '>
                    <Toggle  onClick={()=>{setHideIdentity(!hideIdentity)}} variant={'outline'}>{`${hideIdentity ? "*****-*****-*****-*****-*****-*****-*****-*****-*****-*****-***" : user!.identity}`}</Toggle>
                </div>
                    <h1 className='text-sm text-gray-400 w-[50%] text-wrap'>Your account identity</h1>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='w-full h-fit flex gap-8'>
                    <div className='w-1/2 flex flex-col gap-2'>
                        <p className='font-medium'>First Name</p>
                        <Input className='bg-transparent' placeholder="John"  value={data.first_name} onChange={(e) => changeData("first_name", e.target.value)}/>
                    </div>
                    <div className='w-1/2 flex flex-col gap-2'>
                        <p className='font-medium'>Last Name</p>
                        <Input className='bg-transparent' placeholder="John" value={data.last_name} onChange={(e) => changeData("last_name", e.target.value)}/>
                    </div>
                </div>
                <h1 className='text-sm text-gray-400 w-[50%] text-wrap'>This is your public display name, others will be able to view it. You can only change this once every 30 days.</h1>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='w-full h-fit flex gap-8'>
                    <div className='w-1/2 flex flex-col gap-2'>
                        <p className='font-medium'>Email</p>
                        <Input className='bg-transparent' placeholder="John" value={data.email} onChange={(e) => changeData("email", e.target.value)}/>
                    </div>
                </div>
                <h1 className='text-sm text-gray-400 w-[50%] text-wrap'>This is your associated email, others wont be able to view this.</h1>
            </div>

            <div className='flex flex-col gap-2'>
                <Button onClick={()=>updateProfile()} disabled={!hasChanges || isLoading || updateProfileLoading} className='w-fit'>{updateProfileLoading ? "Loading" :"Update Profile"}</Button>
            </div>

            <div className='flex flex-col gap-1'>
                <h1 className='text-sm text-gray-400 w-[50%] text-wrap'>Created at: 08-04-2024</h1>
                <h1 className='text-sm text-gray-400 w-[50%] text-wrap'>@PhilantroFi</h1>
            </div>
        </div>

        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
            <button style={{ display: "none" }}></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogTitle>
                {isSuccess ? 
                "Success": "Something Went Wrong"}
                </AlertDialogTitle>
            <AlertDialogDescription>
                {isSuccess ?
                `Your Profile has been successfully updated` : `${updateProfileError?.message}`}
            </AlertDialogDescription>
            <AlertDialogFooter>
                <AlertDialogAction onClick={() => { setDialogOpen(false);window.location.reload()}}>
                Continue
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    )
}
