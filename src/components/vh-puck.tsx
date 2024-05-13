import { capitalizeFirstLetter } from '@lib/utils/utils'
import { cn } from '@lib/utils/utils'

interface VhPuckInterface {
    tag:string
    className?:string;
    onClick?:any
}

export default function VhPuck({tag, className, onClick}:VhPuckInterface) {
  return (
    <div onClick={onClick} className={cn(`${className} rounded-xl text-blue-800 border border-blue-800 bg-blue-200 text-xs inline-block font-medium px-4 py-1`)}>
        {capitalizeFirstLetter(tag)}
    </div>
  )
}
