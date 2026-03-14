import { Suspense } from "react";
import AdvisorsClient from "./AdvisorsClient";

export default function AdvisorsPage() {
  return (
    <Suspense fallback={<div>Loading advisors...</div>}>
      <AdvisorsClient />
    </Suspense>
  );
}