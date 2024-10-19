"use client";

import React, { useState, useEffect } from 'react';

interface Product {
    id: string;
    orderId: string;
    risk: string;
    buyerIntent: string;
    customer: string;
    items: string;
    orderDate: string;
}

const staticProducts: Product[] = [
    { id: '1', orderId: '#O100', risk: 'Low', buyerIntent: 'High', customer: 'John Doe', items: 'Item 1, Item 2', orderDate: '2024-10-10' },
    { id: '2', orderId: '#O200', risk: 'Medium', buyerIntent: 'Moderate', customer: 'Jane Smith', items: 'Item 3, Item 4', orderDate: '2024-10-11' },
    { id: '3', orderId: '#O300', risk: 'High', buyerIntent: 'Low', customer: 'Mike Ross', items: 'Item 5', orderDate: '2024-10-12' },
    { id: '4', orderId: '#O400', risk: 'Low', buyerIntent: 'High', customer: 'Rachel Zane', items: 'Item 6', orderDate: '2024-10-13' },
    { id: '5', orderId: '#O500', risk: 'Medium', buyerIntent: 'Moderate', customer: 'Harvey Specter', items: 'Item 7, Item 8', orderDate: '2024-10-14' },
    { id: '6', orderId: '#O600', risk: 'High', buyerIntent: 'Low', customer: 'Louis Litt', items: 'Item 9', orderDate: '2024-10-15' },
    { id: '7', orderId: '#O700', risk: 'Low', buyerIntent: 'High', customer: 'Jessica Pearson', items: 'Item 10', orderDate: '2024-10-16' },
    { id: '1', orderId: '#O100', risk: 'Low', buyerIntent: 'High', customer: 'John Doe', items: 'Item 1, Item 2', orderDate: '2024-10-10' },
    { id: '2', orderId: '#O200', risk: 'Medium', buyerIntent: 'Moderate', customer: 'Jane Smith', items: 'Item 3, Item 4', orderDate: '2024-10-11' },
    { id: '3', orderId: '#O300', risk: 'High', buyerIntent: 'Low', customer: 'Mike Ross', items: 'Item 5', orderDate: '2024-10-12' },
    { id: '4', orderId: '#O400', risk: 'Low', buyerIntent: 'High', customer: 'Rachel Zane', items: 'Item 6', orderDate: '2024-10-13' },
    { id: '5', orderId: '#O500', risk: 'Medium', buyerIntent: 'Moderate', customer: 'Harvey Specter', items: 'Item 7, Item 8', orderDate: '2024-10-14' },
    { id: '6', orderId: '#O600', risk: 'High', buyerIntent: 'Low', customer: 'Louis Litt', items: 'Item 9', orderDate: '2024-10-15' },
    { id: '7', orderId: '#O700', risk: 'Low', buyerIntent: 'High', customer: 'Jessica Pearson', items: 'Item 10', orderDate: '2024-10-16' },
    { id: '1', orderId: '#O100', risk: 'Low', buyerIntent: 'High', customer: 'John Doe', items: 'Item 1, Item 2', orderDate: '2024-10-10' },
    { id: '2', orderId: '#O200', risk: 'Medium', buyerIntent: 'Moderate', customer: 'Jane Smith', items: 'Item 3, Item 4', orderDate: '2024-10-11' },
    { id: '3', orderId: '#O300', risk: 'High', buyerIntent: 'Low', customer: 'Mike Ross', items: 'Item 5', orderDate: '2024-10-12' },
    { id: '4', orderId: '#O400', risk: 'Low', buyerIntent: 'High', customer: 'Rachel Zane', items: 'Item 6', orderDate: '2024-10-13' },
    { id: '5', orderId: '#O500', risk: 'Medium', buyerIntent: 'Moderate', customer: 'Harvey Specter', items: 'Item 7, Item 8', orderDate: '2024-10-14' },
    { id: '6', orderId: '#O600', risk: 'High', buyerIntent: 'Low', customer: 'Louis Litt', items: 'Item 9', orderDate: '2024-10-15' },
    { id: '7', orderId: '#O700', risk: 'Low', buyerIntent: 'High', customer: 'Jessica Pearson', items: 'Item 10', orderDate: '2024-10-16' },
    // Add more data to test the scrolling
];

export default function CustomStyledGridTable() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setProducts(staticProducts);
    }, []);

    return (
        <div className="card font-sans bg-[#1d1f27] rounded-lg p-4 mt-2">
            <div className="grid grid-cols-7 gap-4 text-left text-[#808080] bg-[#292b35] p-3 rounded-t-lg">
                <div>Order ID</div>
                <div>Risk</div>
                <div>Buyer Intent</div>
                <div>Customer</div>
                <div>Items</div>
                <div>Order Date</div>
                <div>Action</div>
            </div>
            <div className="grid grid-cols-7 gap-0 bg-[#282A2F] text-white overflow-auto scrollbar-none max-h-[750px]">
                {products.map((product) => (
                    <React.Fragment key={product.id}>
                        <div className="p-3">{product.orderId}</div>
                        <div className="p-3">{product.risk}</div>
                        <div className="p-3">{product.buyerIntent}</div>
                        <div className="p-3">{product.customer}</div>
                        <div className="p-3">{product.items}</div>
                        <div className="p-3">{product.orderDate}</div>
                        <div className="p-3">
                            <button className="bg-[#292b35] text-[#BE74BA] px-4 py-2 rounded-md">
                                Action
                            </button>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
