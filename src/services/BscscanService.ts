
import axios from 'axios';

const API_KEY = 'DKMYBYMX2GJNT2H8QR62JAP6212EMW97G9'; // BSCScan free API key
const BASE_URL = 'https://api.bscscan.com/api';
const TOKEN_ADDRESS = '0xd3bde17ebd27739cf5505cd58ecf31cb628e469c';

export interface TokenInfo {
  price?: number;
  marketCap?: number;
  totalSupply?: string;
  circulatingSupply?: string;
  holders?: number;
}

export interface TokenTransaction {
  hash: string;
  timeStamp: string;
  from: string;
  to: string;
  value: string;
  tokenSymbol: string;
}

export class BscscanService {
  async getTokenInfo(): Promise<TokenInfo> {
    try {
      // Get token supply
      const supplyResponse = await axios.get(BASE_URL, {
        params: {
          module: 'stats',
          action: 'tokensupply',
          contractaddress: TOKEN_ADDRESS,
          apikey: API_KEY
        }
      });
      
      // Since BSCScan API doesn't provide direct holder count, price, and market cap
      // in their free tier, we'll use a placeholder for now
      // In a real implementation, you might need to use CoinGecko, CoinMarketCap APIs
      // or parse the BSCScan HTML page to get this data
      
      return {
        totalSupply: supplyResponse.data.result,
        circulatingSupply: supplyResponse.data.result,
        price: 0.00000275, // Placeholder price
        marketCap: 2750000,  // Placeholder market cap
        holders: 4872 // Placeholder holders count
      };
    } catch (error) {
      console.error('Error fetching token info from BSCScan:', error);
      throw error;
    }
  }
  
  async getTokenTransactions(page: number = 1, offset: number = 10): Promise<TokenTransaction[]> {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          module: 'account',
          action: 'tokentx',
          contractaddress: TOKEN_ADDRESS,
          page,
          offset,
          sort: 'desc',
          apikey: API_KEY
        }
      });
      
      return response.data.result || [];
    } catch (error) {
      console.error('Error fetching token transactions from BSCScan:', error);
      return [];
    }
  }
  
  async getTokenHolders(): Promise<number> {
    try {
      // BSCScan API doesn't provide direct holder count in their free tier
      // This would typically require parsing the HTML page or using a premium API
      // Return placeholder value for now
      return 4872;
    } catch (error) {
      console.error('Error fetching token holders from BSCScan:', error);
      return 0;
    }
  }
}

export const bscscanService = new BscscanService();
