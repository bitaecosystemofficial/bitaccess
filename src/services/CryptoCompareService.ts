const API_KEY = '449dcf906924fd0c6765365a57fe5b873ab07226776a8b59ec0ee091edc4ae38';
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
}
