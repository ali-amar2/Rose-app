import React from "react";
import UpdateOccasionForm from "./_components/update-occasion-form";
import { getOccasionById } from "@/lib/actions/dashboard-occasions.actions";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { occasion } = await getOccasionById(id);

  return (
    <div className="w-[69rem] ">
      <h1 className="text-2xl font-semibold mb-4">
        Update Occasion: {occasion.name}
      </h1>
      <UpdateOccasionForm occasion={occasion} />
    </div>
  );
}
