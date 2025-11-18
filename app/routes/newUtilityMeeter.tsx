import UtilityMeeterPage from "~/pages/utilityMeeterPage";
import type { Route } from "../+types/root";
import { ProtectedRoute } from "./security/ProtectedRoute";
import NewUtilityMeeterPage from "~/pages/newUtilityMeeterPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Utility Meter" },
    { name: "description", content: "New Utility meter page" },
  ];
}

export default function NewUtilityMeeter() {
  return (
    <ProtectedRoute>
      <NewUtilityMeeterPage />
    </ProtectedRoute>
  );
}
