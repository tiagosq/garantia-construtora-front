export type IAttachment = {
  name: string;
  type: string;
  size: number;
  url: string;
};

export type IQuestion = {
  id?: string;
  name: string;
  description: string;
  date: string;
  status: boolean;
  observations: string;
  photos: IAttachment[];
  docs: IAttachment[];
};

export interface IMaintenance {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  is_completed: boolean;
  business: string;
  building: string; // Add the 'building' property
  user: string;
}

export type IUser = {
  id?: string;
  fullname: string;
  email: string;
  password: string;
  password_confirmation?: string;
  business_id?: string;
  role: string;
  status: boolean;
  business?: string;
};