const API_KEY = '8e83aeadd7ed04e3612d9946fd76eb6447ef98c037e3939cf7b76067504a11d6';
const BASE_URL = 'https://min-api.cryptocompare.com/data';

export class CryptoCompareService {
  static async getBNBPrice(): Promise<number> {
    try {
      const response = await fetch(
        `${BASE_URL}/price?fsym=BNB&tsyms=USD&api_key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch BNB price');
      }
      
      const data = await response.json();
      return data.USD || 0;
    } catch (error) {
      console.error('Error fetching BNB price:', error);
      return 600; // Fallback price
    }
  }

  static async getUSDTPrice(): Promise<number> {
    try {
      const response = await fetch(
        `${BASE_URL}/price?fsym=USDT&tsyms=USD&api_key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch USDT price');
      }
      
      const data = await response.json();
      return data.USD || 1;
    } catch (error) {
      console.error('Error fetching USDT price:', error);
      return 1; // Fallback price
    }
  }

  static async getUSDCPrice(): Promise<number> {
    try {
      const response = await fetch(
        `${BASE_URL}/price?fsym=USDC&tsyms=USD&api_key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch USDC price');
      }
      
      const data = await response.json();
      return data.USD || 1;
    } catch (error) {
      console.error('Error fetching USDC price:', error);
      return 1; // Fallback price
    }
  }

  static async getBTCBPrice(): Promise<number> {
    try {
      const response = await fetch(
        `${BASE_URL}/price?fsym=BTC&tsyms=USD&api_key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch BTCB price');
      }
      
      const data = await response.json();
      return data.USD || 0;
    } catch (error) {
      console.error('Error fetching BTCB price:', error);
      return 95000; // Fallback price
    }
  }

  static getBITPrice(): number {
    return 0.000108; // Fixed BIT price
  }

  static async getAllPrices(): Promise<{
    BNB: number;
    USDT: number;
    USDC: number;
    BTCB: number;
    BIT: number;
  }> {
    try {
      const [bnb, usdt, usdc, btcb] = await Promise.all([
        this.getBNBPrice(),
        this.getUSDTPrice(),
        this.getUSDCPrice(),
        this.getBTCBPrice(),
      ]);

      return {
        BNB: bnb,
        USDT: usdt,
        USDC: usdc,
        BTCB: btcb,
        BIT: this.getBITPrice(),
      };
    } catch (error) {
      console.error('Error fetching all prices:', error);
      return {
        BNB: 600,
        USDT: 1,
        USDC: 1,
        BTCB: 95000,
        BIT: 0.000108,
      };
    }
  }
}
