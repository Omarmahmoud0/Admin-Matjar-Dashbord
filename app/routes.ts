import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("users", "routes/users.tsx"),
  route("products", "routes/products.tsx"),
  route("orders", "routes/orders.tsx"),
  route("settings", "routes/settings.tsx"),
] satisfies RouteConfig;
