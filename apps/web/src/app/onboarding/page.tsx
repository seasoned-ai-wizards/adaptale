"use client";

import { useCallback } from "react";
import Onboarding from "~/components/views/Onboarding";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const onComplete = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <div>
      <Onboarding onComplete={onComplete} />
    </div>
  );
}
