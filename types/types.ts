export interface UsersType {
  id: number;
  email: string;
  password: string;
}

export interface ProfilesType {
  id: number;
  first_name: string;
  last_name: string;
  profile_image: string;
  balance: number;
  UserId: number;
}

export interface TransactionsType {
  id: number;
  invoice_number: string;
  transaction_type: string;
  total_amount: number;
  ServicesId: number;
  ProfileId: number;
}

export interface ServicesType {
  id: number;
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export interface ServicesType {
  id: number;
  banner_name: string;
  banner_image: string;
  description: string;
}
