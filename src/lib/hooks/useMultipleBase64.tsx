import { useState } from 'react';

const useMultipleBase64 = () => {
    const [base64List, setBase64List] = useState<string[]>([]);
    const [errors, setErrors] = useState<Error[]>([]);

    const processImagesToBase64 = (images: File[]) => {
        reset()

        images.forEach(image => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                setBase64List((prev) => [...prev, base64String]);
            };
            reader.onerror = (error) => {
                setErrors((prev) => [...prev, new Error("Failed to convert image to Base64.")]);
                console.error("FileReader error:", error);
            };
            reader.readAsDataURL(image);
        });
    };

    const reset = () =>{
        setBase64List([])
        setErrors([])
    }

    return { base64List, errors, processImagesToBase64, reset };
};

export default useMultipleBase64;