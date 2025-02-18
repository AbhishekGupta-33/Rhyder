// Validate file size
export const isFileSizeValid = (
  size: number,
  minSizeKB: number = 400,
  maxSizeKB: number = 800,
) => {
  const sizeKB = size / 1024; // Convert bytes to KB
  return sizeKB >= minSizeKB && sizeKB <= maxSizeKB;
};
