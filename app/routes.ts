import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),               
  { path: "/utility-meter", file: "routes/utilityMeeter.tsx" },
  { path: "/all-readings", file: "routes/allReadings.tsx" },
] satisfies RouteConfig;