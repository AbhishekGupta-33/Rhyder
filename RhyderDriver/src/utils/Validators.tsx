import { Platform } from "react-native";

export const hasValidateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Function to validate Phone Number format
export const hasValidPhoneNumber = (phone: string) => {
  const phoneRegex = /^[0-9]{10}$/; // 10-digit number
  return phoneRegex.test(phone);
};

export const hasValidEmailOrPhoneNumber = (input: string) => {
  const regex = /^(?:\d{10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  return regex.test(input);
};

export const hasNoSpaces = (str: string) => {
  return /^\S*$/.test(str);
};

export const hasData = (str: string) => {
  return str.length > 0;
};

export const removeSpaces = (input: string) => input.replace(/\s/g, '');