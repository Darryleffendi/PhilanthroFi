import CryptoButton from "@components/crypto-button"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { FundraiseSubpage } from "@lib/types/fundraise-subpage-types"
import { useEffect, useState } from "react"
import imgIcon from "@assets/images/image.png"
import useMultipleBase64 from "@lib/hooks/useMultipleBase64"

const FundraiseImageSubpage = ({changeTitle, changeData, data, submitForm = ()=>{}} : FundraiseSubpage) => {

    const [usdValue, setUsdValue] = useState(0);
    const [files, setFiles] = useState<File[]>([]);
    const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
    const { base64List, processImagesToBase64, errors: base64Errors, reset:resetBase64 } = useMultipleBase64();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = event.target.files;
        if (newFiles) {
            const fileList = Array.from(newFiles);
            setFiles((prevFiles)=>[...prevFiles, ...fileList]);
        }
    };

    const finalize = async () => {
        await changeData("project_image", base64List);
        submitForm();
        resetBase64()
    }

    useEffect(() => {
        processImagesToBase64(files);

        const photos = files.map(file => URL.createObjectURL(file));
        setUploadedPhotos(photos);

        return () => photos.forEach(photos => URL.revokeObjectURL(photos));
    }, [files]);


    useEffect(() => {
        changeTitle(
            <>
                <p>Provide Images of Your&nbsp;</p>
                <p className="bg-yellow-100">Target</p>
                <p>&nbsp;</p>
                <p className="bg-fuchsia-100 ">Charity</p>
            </>,
            "Visuals often provide better presentation than words."
        )
    }, [])

    useEffect(() => {
        (async function(){})()
    }, [data.target_currency, data.target_amount])

    //@ts-ignore
    return (
        <>
            <div className="w-full h-[70%] relative border rounded-lg border-dashed border-slate-400 flex flex-col justify-center items-center cursor-pointer">
                <input type="file" accept="image/*" multiple className="absolute w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange}/>
                <div className="w-full h-full flex flex-wrap">
                    {uploadedPhotos.map((photo, i)=>{
                        return(
                            <img key={i} src={photo} className="w-28 opacity-40 object-cover"/>
                        )
                    })}
                </div>
                <div className="text-sm mt-2 opacity-60">Click to upload Image</div>
            </div>

            <Button className="text-white" onClick={() => finalize()}>Create</Button> 
            {/* Goofy ass button */}
        </>
    )
}

export default FundraiseImageSubpage;