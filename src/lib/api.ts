// lib/api.ts
export async function fetchCachedOrders(key: string) {
    const response = await fetch(`/api/get-cached-orders?key=${key}`);
  
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
  
    return response.json();
  }
  