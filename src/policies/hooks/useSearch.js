import { useSearchParams } from "react-router-dom";

export default function useSearch() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("petitionsearch");

  const detailOverlap = (policyDetails, searchDetails) => {
    if (policyDetails.length === 0 && searchDetails.length !== 0) return false;
    let check=true
    searchDetails.forEach((element) => {
      if (!policyDetails.includes(element)) {
        check= false;
      }
    })
    return check;
  };

  const filterPolicies = (policies, search, details) => {
    if (policies === null || (search === null && details.length === 0)) {
      return policies;
    }
    policies = policies.filter((policy) => policy.title.includes(search));
    policies = policies.filter((policy) =>
      detailOverlap(policy.details, details)
    );
    return policies;
  };

  return {
    search,
    filterPolicies,
  };
}
