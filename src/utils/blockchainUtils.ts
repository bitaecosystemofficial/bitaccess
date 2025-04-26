
// Mock delay to simulate blockchain transaction
export const mockTransaction = async (): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return '0x' + Array(64).fill(0).map(() => 
    Math.floor(Math.random() * 16).toString(16)).join('');
};
