
export interface Charity {
    id: string;
    title: string;
    target_donation: number;
    charity_owner_id: string;
    image_urls: string[];
    description: string;
    timestamp: Date;
}