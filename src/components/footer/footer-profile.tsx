import { FaGithub, FaInstagram } from "react-icons/fa";

type props = {
    name :string
    github : string
}

const FooterProfile = ({name, github} : props) => {
    return (
        <div className='opacity-70 hover:opacity-100 transition-all duration-200'>
            <p className='text-sm font-medium text-slate-900'>{name}</p>
            <div className='flex gap-2 items-center text-slate-500 text-sm'><FaGithub /> {github}</div>
            {/* <div className='flex gap-2 items-center text-slate-500 text-sm'><FaInstagram /> {instagram}</div> */}
        </div>
    );
}

export default FooterProfile;