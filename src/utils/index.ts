import moment from "moment";

export const formatCurrency = (money: number) => {
  return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " ₫";
};

export const converDate = (created_at: Date) => {
  return moment(new Date(created_at)).format("YYYY-MM-DD");
};

export const converDate_DDMMYYY = (created_at: Date) => {
  return moment(new Date(created_at)).format("DD/MM/YYYY");
};
