import AllReadingsPage from "~/pages/allReadingsPage";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "All Readings" },
    { name: "description", content: "All readings page" },
  ];
}

export default function AllReadings() {
  return <AllReadingsPage />;
}
