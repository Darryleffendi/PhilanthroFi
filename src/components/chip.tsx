
type props = {
    className?: string;
    text : string;
    onClick? : () => any;
}

export default function Chip({className = "border-primary bg-primary bg-opacity-60 text-blue-400", text, onClick} : props) {
    
    return (
        <div className={`rounded-xl px-4 h-6 ${className} border-2 flex items-center justify-center text-sm cursor-pointer transition-all duration-200`} onClick={onClick}>
            {text}
        </div>
    )
}