"use client";

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
    { id: '1', orderId: 'O100', risk: 'Low', buyerIntent: 'High', customer: 'John Doe', items: 'Item 1, Item 2', orderDate: '2024-10-10' },
    { id: '2', orderId: 'O200', risk: 'Medium', buyerIntent: 'Moderate', customer: 'Jane Smith', items: 'Item 3, Item 4', orderDate: '2024-10-11' },
    { id: '3', orderId: 'O300', risk: 'High', buyerIntent: 'Low', customer: 'Mike Ross', items: 'Item 5', orderDate: '2024-10-12' },
    { id: '4', orderId: 'O400', risk: 'Low', buyerIntent: 'High', customer: 'Rachel Zane', items: 'Item 6', orderDate: '2024-10-13' },
    // Add more data to test the scrolling
    { id: '5', orderId: 'O500', risk: 'Medium', buyerIntent: 'Moderate', customer: 'Harvey Specter', items: 'Item 7, Item 8', orderDate: '2024-10-14' },
    { id: '6', orderId: 'O600', risk: 'High', buyerIntent: 'Low', customer: 'Louis Litt', items: 'Item 9', orderDate: '2024-10-15' },
    { id: '7', orderId: 'O700', risk: 'Low', buyerIntent: 'High', customer: 'Jessica Pearson', items: 'Item 10', orderDate: '2024-10-16' },
];

export default function CustomStyledDataTable() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[] | null>(null);
    const [rowClick, setRowClick] = useState<boolean>(true);

    useEffect(() => {
        setProducts(staticProducts);
    }, []);

    return (
        <div className="card bg-[#1d1f27] rounded-lg p-4 mt-2">
            <div className="flex justify-center items-center mb-4 gap-4">
                {/* Add any toggle buttons if needed */}
            </div>
            <DataTable
                value={products}
                selectionMode={rowClick ? null : 'multiple'}
                selection={selectedProducts!}
                onSelectionChange={(e : any) => setSelectedProducts(e.value)}
                dataKey="id"
                tableStyle={{ minWidth: '50rem' }}
                className="rounded-lg bg-[#1d1f27] text-[#6fedc7]"
                scrollable // Enable scrolling
                scrollHeight="300px" // Set scroll height for the DataTable
            >
                {/* Custom Header Fields */}
                <Column
                    field="orderId"
                    header="Order ID"
                    headerClassName="bg-[#292b35] text-[#808080] text-left p-3 rounded-t-lg"
                    bodyClassName="bg-[#282A2F] text-[#6fedc7]"
                ></Column>
                <Column
                    field="risk"
                    header="Risk"
                    headerClassName="bg-[#292b35] text-[#808080] text-left p-3"
                    bodyClassName="bg-[#282A2F] text-[#6fedc7]"
                ></Column>
                <Column
                    field="buyerIntent"
                    header="Buyer Intent"
                    headerClassName="bg-[#292b35] text-[#808080] text-left p-3"
                    bodyClassName="bg-[#282A2F] text-[#6fedc7]"
                ></Column>
                <Column
                    field="customer"
                    header="Customer"
                    headerClassName="bg-[#292b35] text-[#808080] text-left p-3"
                    bodyClassName="bg-[#282A2F] text-[#6fedc7]"
                ></Column>
                <Column
                    field="items"
                    header="Items"
                    headerClassName="bg-[#292b35] text-[#808080] text-left p-3"
                    bodyClassName="bg-[#282A2F] text-[#6fedc7]"
                ></Column>
                <Column
                    field="orderDate"
                    header="Order Date"
                    headerClassName="bg-[#292b35] text-[#808080] text-left p-3"
                    bodyClassName="bg-[#282A2F] text-[#6fedc7]"
                ></Column>
                <Column
                    field="action"
                    header="Action"
                    body={(rowData: Product) => (
                        <button className="bg-[#292b35] text-[#6fedc7] px-4 py-2 rounded-md">
                            Action
                        </button>
                    )}
                    headerClassName="bg-[#292b35] text-[#808080] text-left p-3"
                    bodyClassName="bg-[#282A2F]"
                ></Column>
            </DataTable>
        </div>
    );
}
