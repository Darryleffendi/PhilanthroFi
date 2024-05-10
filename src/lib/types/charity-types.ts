import { CharityEvent as BackendCharityEvent } from "src/declarations/charity/charity.did";

export interface CharityEvent {
  id: string;
  title: string;
  current_donation: number;
  target_donation: number;
  charity_owner_id: string;
  image_urls: string[];
  description: string;
  start_date: Date;
  end_date: Date;
  tags: string[];
  location: string;
  donations: Donation[];
  target_currency: string;
}

export interface Donation {
  from: string;
  to: string;
  amount: number;
  time: Date;
  notes: string;
  id: string;
}

export const dummyCharity: BackendCharityEvent = {
  id: 'ce1',
  title: 'Tolongin DuckCing nyuri sampah di sungai',
  current_donation: BigInt(1200),
  target_donation: BigInt(5000),
  charity_owner_id: 'owner123',
  image_urls: ['https://dummyimage.com/600x400/000/fff'],
  description: 'A community effort to clean up the River City waterfront.',
  start_date: BigInt(new Date('2024-06-01').getTime()),
  end_date: BigInt(new Date('2024-06-15').getTime()),
  tags: ['environment', 'community', 'river'],
  location: 'River City',
  donations: [
    {
      from: 'donor1',
      to: 'ce1',
      amount: BigInt(100),
      time: BigInt(new Date('2024-06-01T12:00:00').getTime()),
      notes: 'Keep up the great work!',
      id: 'd1',
    },
    {
      from: 'donor2',
      to: 'ce1',
      amount: BigInt(100),
      time: BigInt(new Date('2024-06-01T12:00:00').getTime()),
      notes: 'Happy to support this cause!',
      id: 'd2',
    },
  ],
  target_currency: 'USD',
};
