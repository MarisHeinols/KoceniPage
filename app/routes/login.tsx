import UtilityMeeterPage from "~/pages/utilityMeeterPage";
import type { Route } from "../+types/root";
import Login from "~/pages/login";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }, { name: "Login", content: "Login Page" }];
}

export default function UtilityMeeter() {
  return <Login />;
}
