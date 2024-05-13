import xLogo from "@assets/logo/x.png"

type props = {
    username: string;
    tweet: string;
    image: any;
    className?: string;
}

const TwitterCard = ({username, tweet, image, className = ""} : props) => {
    return (
        <div className="w-full bg-white rounded-lg p-6 font-">
            <div className="w-full flex justify-between">
                <p className="font-medium">{username}</p>
                <img src={xLogo} className="w-5 object-contain"/>
            </div>
            <p className="mt-4">
                {tweet}
            </p>
        </div>
    )
}

export default TwitterCard