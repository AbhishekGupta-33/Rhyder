export const log = (...args: any[]) => {
    if (__DEV__) {
      console.log(...args);
    }
  };
  
  export const errorLog = (...args: any[]) => {
    if (__DEV__) {
      console.error(...args);
    }
  };
  