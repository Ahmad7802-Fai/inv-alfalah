import { Suspense } from "react";
import Invitation from "./Invitation";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Invitation />
    </Suspense>
  );
}