import { useNavigate, useParams } from "react-router-dom";
import logoWhite from "@assets/logo/logo-white.png"
import { FaArrowLeft } from "react-icons/fa";
import { CharityEvent, Transaction, TransactionRequest } from "@lib/types/charity-types";
import { useEffect, useState } from "react";
import { useService } from "@lib/hooks/useService";
import { useMutation } from "react-query";
import btcIcon from "@assets/images/btc_transparent.png"
import icpIcon from "@assets/images/icp_transparent.png"
import ethIcon from "@assets/images/eth_transparent.webp"
import { Progress } from "@components/ui/progress";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import useMultipleBase64 from "@lib/hooks/useMultipleBase64";
import imgIcon from "@assets/images/image.png"
import { Button } from "@components/ui/button";
import { useWallet } from "@lib/hooks/useWallet";
import { cleanseCharity } from "@lib/utils/charity-utils";
import { useAuth } from "@lib/hooks/useAuth";
import Spinner from "@components/spinner";

const WithdrawPage = () => {   

    // id charity nanti diambil dari url
    const {id} = useParams<{id: string}>()

    const [data, setData] = useState<Transaction>({
        amount: 0,
        from : "",
        to: "",
        id: "",
        notes: "",
        time: new Date(),
        types: "withdraw",
        request_status: "",
    });

    const changeData = (key : string, value : any) => {
        setData({
            ...data,
            [key]: value
        })
    }

    const [charity, setCharity] = useState<CharityEvent | null>(null);
    const {getCharityService} = useService()
    const [progress, setProgress] = useState(15) // progress bar animation 
    const [files, setFiles] = useState<File[]>([]);
    const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

    const { base64List, processImagesToBase64, errors: base64Errors, reset:resetBase64 } = useMultipleBase64();
    const navigate = useNavigate();
    const {getPublicAddress} = useWallet();

    const { user, authState, isLoading } = useAuth();
    
    let transactionRequest : TransactionRequest = {
        amount: BigInt(data.amount),
        types: "withdraw",
        notes: data.notes,
        charity_id: charity ? charity.id : "",
        charity_wallet_id: charity ? charity.charity_owner_id : ""
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = event.target.files;
        if (newFiles) {
            const fileList = Array.from(newFiles);
            setFiles((prevFiles)=>[...prevFiles, ...fileList]);
        }
    };

    useEffect(() => {
        processImagesToBase64(files);

        const photos = files.map(file => URL.createObjectURL(file));
        setUploadedPhotos(photos);

        return () => photos.forEach(photos => URL.revokeObjectURL(photos));
    }, [files]);

    /* ======= FUNCTION UNTUK FETCH CHARITY DATA SESUAI ID ====== */
    const { mutate: fetchCharity, isLoading: createCharityLoading, error: createCharityError, isSuccess } = useMutation(
        async () => {
            const charityService = await getCharityService();
            const response = await charityService.getCharity(id ? id : "")

            return response
        }, {
        onSettled:()=>{
            console.log("fetch charity settled")
        },
        onError: (error: Error) => {
            console.error('Error during fetching charity:', error.message);
        },
        onSuccess: (data : any) => {

            // Nanti di uncomment pas udh bener
            setCharity(cleanseCharity(data.ok))

            console.log(data.ok)
            console.log(user?.identity.toString())
            // Nanti dicheck juga owner dari charity ini sama kek principle ato ga
            if(data.ok.charity_owner_id !== user?.identity.toString()){
                navigate("/home")
            }
        }
    });

    /* ======= FUNCTION UNTUK RECORD WITHDRAW DATA ====== */
    const { mutate: recordTransaction, isLoading: recordLoading, error: recordError, isSuccess: recordSuccess } = useMutation(
        async () => {
            const charityService = await getCharityService();

            transactionRequest.amount = BigInt(Number(transactionRequest.amount) * 100000000)
            // @ts-ignore
            const response = await charityService.addTransaction(transactionRequest)

            return response
        }, {
        onSettled:()=>{
            console.log("recording charity settled")
        },
        onError: (error: Error) => {
            console.error('Error during recording charity:', error.message);
        },
        onSuccess: (data : any) => {
            console.log('recording charity successfully:', data);
        }
    });

    useEffect(() => {
        
        if(isLoading) {
            return
        }

        if(user == null) {
            navigate("/auth")
            return
        }        
        fetchCharity()

    }, [user])

    useEffect(() => {
        if(charity == null) return;
        
        const timer = setTimeout(() => setProgress(charity.current_donation/charity.target_donation*100), 500)
        return () => clearTimeout(timer)
    }, [charity])

    const submitForm = async () => {
        
        await changeData("project_image", base64List);
        await submitToBackend();
        await resetBase64()
    }

    const submitToBackend = async () => {
        await recordTransaction()
    }

    const fetchPublicAddress = async () => {
        const address = await getPublicAddress();
        // @ts-ignore
        changeData("to", window.ic.plug.principalId)
    }

    return (
        <>
        {
            isLoading ? (
                <div className="w-screen fixed h-screen bg-slate-700 z-50 bg-opacity-70 flex justify-center items-center"><Spinner className="fill-primary"/></div>
            ) : <></>
        }
        <div className="bg-primary w-full min-h-screen bg-opacity-50 flex justify-between">
            <div className="p-20 flex  w-[50vw] fixed">
                <FaArrowLeft className="mt-1 mr-4 text-slate-800"/>
                <div className="flex flex-col z-10 w-full relative">
                    <div className="w-full h-14 absolute -ml-10 cursor-pointer" onClick={() => navigate("/profile")}></div>

                    <p className="text text-slate-800">Charity {charity?.id}</p>
                    <p className="text-sm text-slate-500">{charity?.title}</p>

                    <p className="mt-20 text-slate-500">Available Funds</p>
                    <div className="flex gap-4 items-center">
                        <img
                            className="h-12" 
                            src={charity?.target_currency === "ICP" ? icpIcon : charity?.target_currency === "ckBTC" ? btcIcon : ethIcon}
                        />
                        <p className="text-4xl font-bold text-slate-700">{charity?.current_donation} {charity?.target_currency}</p>
                    </div>
                    <div className="w-full h-1 rounded bg-slate-500 bg-opacity-20 shadow-md mt-2">
                        <Progress value={progress} className="h-1" />
                        {/* <div className="h-full rounded bg-primary" style={{width: charity.current_donation / charity.target_donation * 100 + "%"}}></div> */}
                    </div>
                </div>

                <img src={logoWhite} className="left-[-20vw] bottom-[-50vh] h-[140vh] fixed opacity-[13%] object-cover"/>
            </div>

            <div></div>
            <div className="w-[45vw] min-h-screen bg-slate-100 shadow-lg p-20 flex flex-col  gap-4">
                <p className="text-lg font-bold text-slate-600 mb-2">Withdraw</p>
                
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-600 font-light">Amount</p>
                    <div className="w-full flex justify-end items-center">
                        <Input 
                            className="border-slate-300 border rounded-lg" placeholder="0" type={"number"}
                            value={data?.amount} onChange={(e) => {
                                if(isNaN(parseFloat(e.target.value))) changeData("amount", 0)
                                else changeData("amount", e.target.value)
                            }}
                        />
                        <p className="absolute font-bold text-slate-400 mr-4">{charity?.target_currency}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-600 font-light">Wallet Address</p>
                    <div className="flex gap-2 w-full">
                        <Input 
                            className="border-slate-300 border rounded-lg" placeholder="aaaa-bbbb-cccc-dddd-xxxx-yyyy-zzzz"
                            value={data?.to} onChange={(e) => changeData("to", e.target.value)}
                        />
                        <div>
                            <Button className="bg-primary text-white" onClick={fetchPublicAddress}>Connect</Button>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-600 font-light">Description</p>
                    <Textarea 
                        placeholder="Describe the purpose of your withdrawal" className="max-h-32" 
                        value={data?.notes} onChange={(e) => changeData("note", e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-600 font-light">Invoice / Receipt</p>
                    <div className="w-full h-48 relative border rounded-lg border-dashed border-slate-400 flex flex-col justify-center items-center cursor-pointer">
                        <input type="file" accept="image/*" className="absolute w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange}/>
                        <div className="w-full items-center justify-center flex flex-wrap">
                            {
                            uploadedPhotos.length === 0 ? (
                                <img src={imgIcon} className="h-6 object-cover opacity-40"/>
                            ) : (
                                uploadedPhotos.map((photo, i)=>{
                                    return(
                                        <img key={i} src={photo} className="w-28 opacity-40 object-cover"/>
                                    )
                                })
                            )}
                        </div>
                        <div className="text-sm mt-2 opacity-60">Click to upload Image</div>
                    </div>
                </div>

                <Button className="text-white mt-2" onClick={submitForm}>Submit</Button> 
            </div>
        </div>
        </>
    )
}

export default WithdrawPage;