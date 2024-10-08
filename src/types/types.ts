export type IAttachment = {
  name: string;
  type: string;
  category: string;
  size: number;
  url: string;
  path?: string;
};

export type IQuestionCreation = {
  id?: string;
  name: string;
  description: string;
}

export type IQuestion = {
  id?: string;
  name: string;
  description: string;
  date?: string;
  status?: boolean | string | number;
  observations?: string;
  attachments?: IAttachment[];
  videos?: IAttachment[];
  photos?: IAttachment[];
  fiscal?: IAttachment[];
};

export interface IMaintenance {
  id?: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  is_completed?: boolean;
  is_approved?: boolean;
  business: string;
  building_name?: string;
  building: string; // Add the 'building' property
  user?: string;
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

export type IBuilding = {
  name: string,
  owner: string,
  phone: string,
  email: string,
  manager_name: string,
  site: string,
  address: string,
  zip: string,
  city: string,
  state: string,
  construction_date: string,
  delivered_date: string,
  warranty_date: string,
  status: boolean,
};

export type IUserData = {
  data: {
    id: string;
    business: {
      id: string;
      name: string;
    },
    fullname: string;
    email: string;
    phone: string;
    role: {
      id: string;
      name: string;
      permissions: {
        [key: string]: {
          create: boolean;
          read: boolean;
          update: boolean;
          delete: boolean;
        };
      };
    }
  };
  message: string;
};

export type IMaintenanceData = {
  id: string,
  name: string,
  description: string,
  start_date: string,
  end_date: string,
  is_completed?: string,
  is_approved?: string,
  building: string,
  user?: string,
  business: string,
  created_at?: string,
  updated_at?: string,
};

export type IQuestionData = {
  id: string,
  name: string,
  description: string,
  date: string,
  status: string,
  observations?: string,
  maintenance: string,
  business: string,
  created_at: string,
  updated_at: string,
  attachments?: IAttachment[],
};