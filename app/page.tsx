import { redirect } from "next/navigation";

// Until the landing page is built, the root shows the type comparison.
export default function Home() {
  redirect("/type");
}
