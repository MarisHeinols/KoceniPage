import type { Route } from "./+types/home";
import HomePage from "~/pages/homePage";
import { ProtectedRoute } from "./security/ProtectedRoute";

export function meta({}: Route.MetaArgs) {}

export default function Home() {
  return (
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  );
}
