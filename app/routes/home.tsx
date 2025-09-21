import type { Route } from "./+types/home";
import SkaititajiPage from "../pages/skaititajiPage";

export function meta({}: Route.MetaArgs) {}

export default function Home() {
  return <SkaititajiPage />;
}
