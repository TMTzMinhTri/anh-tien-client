import { Api } from "..";
import { IResponseListUser } from "../../modal/response/listUser";
import { IResponseAddress } from "../../modal/response/address";

export const getListBorrower = () => {
  const path = `/api/getAllBorrowInfo`;
  return Api.Get<IResponseListUser[]>(path);
};

export const getListDistrict = () => {
  const path = `/api/getListDistrict`;
  return Api.Get<IResponseAddress[]>(path);
};
export const getListWard = (district_id: number) => {
  const path = `/api/getListWard?district_id=${district_id}`;
  return Api.Get<IResponseAddress[]>(path);
};

export const createNewBorrower = (body: any) => {
  const path = `/api/createNewBorrower`;
  return Api.POST<any>(path, body);
};
export const getDetailBorrower = (user_id: string | undefined) => {
  const path = `/api/getDetail/${user_id}`;
  return Api.Get<IResponseListUser>(path);
};

export const payTheMoney = (
  user_id: number,
  body: { total: number; note: string; date: string }
) => {
  const path = `/api/pay-the-money/${user_id}`;
  return Api.POST<any>(path, body);
};

export const getListHistoryByDate = (from: string) => {
  const path = `/api/list-history-by-date?from=${from}`;
  return Api.Get<any>(path);
};

export const getBorrowerDeleted =() => {
  
}
export const updateBorrowerInfo = (user_id: string, body) => {
  const path = `/api/updateBorrowerInfo?user_id=${user_id}`;
  return Api.PUT<any>(path, body);
};

export const deleteBorrowerInfo = (user_id: string) => {
  const path = `/api/deleteBorrowerInfo?user_id=${user_id}`;
  return Api.DELETE<any>(path);
};
