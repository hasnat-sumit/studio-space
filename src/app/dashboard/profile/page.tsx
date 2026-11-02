import type { Metadata } from "next";
import { MyProfile } from "./_components/my-profile";

export const metadata: Metadata = { title: "My Profile - StudioSpace" };

export default function MyProfilePage() {
  return <MyProfile />;
}
