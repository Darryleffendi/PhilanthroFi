import { useService } from "@lib/hooks/useService";
import { useEffect } from "react";
import { useMutation } from "react-query";

export default function SeedCharity() {
    
    const {getCharityService} = useService();

    const { mutate: seed, isLoading: seedLoading, error: seedError, isSuccess: seedSuccess } = useMutation(
        async () => {
            const charityService = await getCharityService()
            const response = await charityService.seedCharity()

            return response
        }, {
        onSettled:()=>{
            console.log('Seed charity completed')
        },
        onError: (error: Error) => {
            console.error('Error during creating charity:', error.message);
        },
        onSuccess: (data) => {
            console.log('Created charity successfully:', data);
        }
    });

    useEffect(() => {
        seed()
    }, [])

    return (<></>)
}