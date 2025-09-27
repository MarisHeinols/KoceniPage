import type { Route } from "./+types/home";
import HomePage from "~/pages/homePage";

export function meta({}: Route.MetaArgs) {}

export default function Home() {
  return <HomePage />;
}
