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

export const dummyCharity: CharityEvent = {
  id: 'ce1',
  title: 'Tolongin DuckCing nyuri sampah di sungai',
  current_donation: 1200,
  target_donation: 5000,
  charity_owner_id: 'owner123',
  image_urls: ['https://dummyimage.com/600x400/000/fff'],
  description: 'A community effort to clean up the River City waterfront.',
  start_date: new Date('2024-06-01'),
  end_date: new Date('2024-06-15'),
  tags: ['environment', 'community', 'river'],
  location: 'River City',
  donations: [
    {
      from: 'donor1',
      to: 'ce1',
      amount: 100,
      time: new Date('2024-06-01T12:00:00'),
      notes: 'Keep up the great work!',
      id: 'd1',
    },
    {
      from: 'donor2',
      to: 'ce1',
      amount: 1100,
      time: new Date('2024-06-02T15:30:00'),
      notes: 'Happy to support this cause!',
      id: 'd2',
    },
  ],
  target_currency: 'USD',
};
