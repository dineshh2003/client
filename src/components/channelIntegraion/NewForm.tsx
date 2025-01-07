"use client"

import { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface AddNewFormProps {
  onClose: () => void;
}

const INTEGRATE_SHOP_MUTATION = gql`
  mutation IntegrateShop($shopName: String!) {
    integrateShop(shopName: $shopName)
  }
`;

export default function AddNewForm({ onClose }: AddNewFormProps) {
  const [shopName, setShopName] = useState('');
  const [code, setCode] = useState<string | null>(null);
  const [integrateShop, { loading, error }] = useMutation(INTEGRATE_SHOP_MUTATION);
  const searchParams = useSearchParams();
  const { theme } = useTheme();

  useEffect(() => {
    const extractedCode = searchParams.get("code");
    if (extractedCode) {
      setCode(extractedCode);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Form submitted with shopName: ${shopName}`);

    try {
      const { data } = await integrateShop({ variables: { shopName } });
      console.log('Response from integrateShop:', data);

      if (data?.integrateShop) {
        console.log(`Redirecting to: ${data.integrateShop}`);
        window.location.href = data.integrateShop;
      } else {
        console.error('No URL returned from the server.');
      }
    } catch (err: any) {
      console.error('GraphQL Error during integrateShop:', err);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Add New Shop</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input
                type="text"
                id="shopName"
                value={shopName}
                onChange={(e) => {
                  console.log(`Shop name input changed to: ${e.target.value}`);
                  setShopName(e.target.value);
                }}
                placeholder="Enter shop name"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">Error: {error.message}</p>}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Shop'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

