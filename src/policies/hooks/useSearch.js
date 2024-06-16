import { useSearchParams } from "react-router-dom";

export default function useSearch() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("petitionsearch");

  const filterPolicies = (policies, search) => {
    if (policies === null || search === null) return policies;
    return policies.filter((policy) => policy.title.includes(search));
  };

  return {
    search,filterPolicies
  };
}
