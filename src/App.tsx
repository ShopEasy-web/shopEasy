import { RouterProvider } from "react-router";
import { router } from "./routes";

export type PageType =
  | "home"
  | "pricing"
  | "features"
  | "about"
  | "support"
  | "contact"
  | "download"
  | "training"
  | "terms"
  | "privacy"
  | "admin"
  | "diagnostic";

export default function App() {
  return <RouterProvider router={router} />;
}
