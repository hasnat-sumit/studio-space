import type { Metadata } from "next";
import { EditStudio } from "@/app/(account)/my-listings/_components/edit-studio";

export const metadata: Metadata = { title: "Update Studio - StudioSpace" };

export default function EditStudioPage() {
  return <EditStudio />;
}
