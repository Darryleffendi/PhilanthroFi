import AnimatedNumbers from 'react-animated-numbers'

interface NumberProps{
    title:string;
    number:number;
    numberStyle?: string;
    titleStyle?: string;
    prefix?:string;
}

export default function Numbers({title,number, numberStyle='font-8xl', titleStyle='font-xl', prefix}:NumberProps) {
  return (
    <div className={`w-full flex flex-col items-center ${numberStyle} gap-4`}>
        <div className={`${titleStyle} text-nowrap`}>
            {title}
        </div>
        <div className="flex">
            {prefix}
            <AnimatedNumbers 
                includeComma
                transitions={(index) => ({
                    type: "spring",
                    duration: index,
                })}
                animateToNumber={number}
                >
            </AnimatedNumbers>
        </div>
    </div>
  )
}
