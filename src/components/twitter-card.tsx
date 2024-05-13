import xLogo from "@assets/logo/x.png"

type props = {
    username: string;
    tweet: string;
    className?: string;
}

const TwitterCard = ({username, tweet, className = ""} : props) => {
    return (
        <div className="w-full bg-white rounded-lg p-6 font-">
            <div className="w-full flex justify-between">
                <div className="flex gap-4 items-center">
                    <p className="font-medium">{username}</p>

                </div>
                <img src={xLogo} className="w-5 object-contain"/>
            </div>
            <p className="mt-4">
                {tweet}
            </p>
        </div>
    )
}

export default TwitterCard