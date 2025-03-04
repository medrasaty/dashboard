import { useState, useEffect } from "react";

export default function useSubmitLoading() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const show = () => setIsSubmitting(true);
  const hide = () => setIsSubmitting(false);

  return { isSubmitting, show, hide };
}
