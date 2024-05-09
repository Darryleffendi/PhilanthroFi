export interface FundraiseType {

    // project
    project_name : string
    project_description : string
    project_location : string

    // auth
    first_name : string
    last_name : string,
    phone_number : string,
    address : string,
    zip_code : string,
    target_amount : number,
    target_currency : "ICP" | "ckBTC" | "ckETH",
}

export interface FundraiseSubpage {   
    changeTitle : (title : JSX.Element, subtitle : string) => void,
    changeData : (key: string, value: string) => void,
    data : FundraiseType,
    changeStep : (step : number) => void
}