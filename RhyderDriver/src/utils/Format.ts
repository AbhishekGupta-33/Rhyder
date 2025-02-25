import moment from "moment";

export const formatDate = (date: string, format: string = "DD MMM YYYY") => {
  return moment(date).format(format);
};

export const formatCurrency = (amount: number) => {
  return `$${amount.toFixed(2)}`;
};
