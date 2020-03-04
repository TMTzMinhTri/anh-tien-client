export interface IResponseListUser {
  id: number;
  name: string;
  address: string;
  district: number;
  ward: number;
  phone_number: string;
  total: number;
  avata: string;
  created_at: Date;
  updated_at: Date;
  history?: Ihistory[];
  note: string;
}
interface Ihistory {
  status: boolean;
  note: string;
  total: number;
  created_at: Date;
  updated_at: Date;
}
