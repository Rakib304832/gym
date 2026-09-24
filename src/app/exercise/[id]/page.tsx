import React from 'react';
import {notFound } from "next/navigation";
import {Exercise} from "../../../type"
type PageProps = {
    params: Promise<{id: string}>
}

const gymDetails = async ():Promise<Exercise[]> => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog")
  const data = await res.json()
  return data;
}

export default async function gymData({ params }: PageProps) {

    const { id } = await params;
    const items = await gymDetails();
    const item = items.find((m) => (m.id === Number(id)))
    if (!item) notFound()

    return (
        <div>
            <h2>Hi</h2>
        </div>
    );
};

