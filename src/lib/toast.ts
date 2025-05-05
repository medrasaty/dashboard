import { toast as toastify, ToastOptions } from "react-toastify";

const defaultToastOptions = {} satisfies ToastOptions;

export const toast = {
  success: (message: string) => {
    toastify.success(message, {
      ...defaultToastOptions,
    });
  },

  error: (message: string) => {
    toastify.error(message, {
      ...defaultToastOptions,
    });
  },
};
