import UtilityMeeterPage from "~/pages/utilityMeeterPage";
import type { Route } from "../+types/root";
import { ProtectedRoute } from "./security/ProtectedRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Utility Meter" },
    { name: "description", content: "Utility meter page" },
  ];
}

export default function UtilityMeeter() {
  return (
    <ProtectedRoute>
      <UtilityMeeterPage />
    </ProtectedRoute>
  );
}
