export interface FundraiseType {

    // project
    project_name : string
    project_description : string
    project_location : string
    project_image : any
    tags : string[]

    // fundraiser profile
    first_name : string,
    last_name : string,
    phone_number : string,
    address : string,
    zip_code : string,

    // fund target
    target_amount : number,
    target_currency : "ICP" | "ckBTC" | "ckETH",
    start_date : string,
    end_date : string,
}

export interface FundraiseSubpage {   
    changeTitle : (title : JSX.Element, subtitle : string) => void,
    changeData : (key: string, value: any) => void,
    data : FundraiseType,
    changeStep : (step : number) => void
    submitForm? : () => void
}