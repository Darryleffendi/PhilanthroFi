import { CharityEvent as BackendCharityEvent } from 'src/declarations/charity/charity.did';

export interface CharityEvent {
  id: string;
  title: string;
  current_donation: number;
  target_donation: number;
  charity_owner_id: string;
  image_urls: string;
  description: string;
  start_date: Date;
  end_date: Date;
  tags: string[];
  location: string;
  donations?: Transaction[];
  target_currency: string;
}

export interface Transaction {
  from: string;
  to: string;
  amount: number;
  time: Date;
  notes: string;
  id: string;
  type: string;
}
export interface TransactionRequest {
    charity_id: string;
    amount: bigint;
    notes: string;
    types: string;
};

export const categories = [
  'Animals',
  'Medical',
  'Education',
  'Sport',
  'Environment',
  'Family',
  'Funeral',
  'Business',
  'Emergency',
];

export const dummyCharity: BackendCharityEvent = {
  id: 'ce1',
  title: 'Tolongin DuckCing',
  current_donation: BigInt(1200),
  target_donation: BigInt(5000),
  charity_owner_id: 'owner123',
  image_urls: 'https://dummyimage.com/600x400/000/fff',
  description: 'A community effort to clean up the River City waterfront.',
  start_date: BigInt(new Date('2024-06-01').getTime()),
  end_date: BigInt(new Date('2024-06-15').getTime()),
  tags: ['Animals'],
  location: 'River City',
  transactions: [
    {
      from: 'donor1',
      to: 'ce1',
      amount: BigInt(100),
      time: BigInt(new Date('2024-06-01T12:00:00').getTime()),
      notes: 'Keep up the great work!',
      id: 'd1',
      types: 'donation',
    },
    {
      from: 'donor2',
      to: 'ce1',
      amount: BigInt(100),
      time: BigInt(new Date('2024-06-01T12:00:00').getTime()),
      notes: 'Happy to support this cause!',
      id: 'd2',
      types: 'donation',
    },
  ],
  target_currency: 'USD',
};
