import { parseAsString, useQueryStates } from "nuqs";

export const useMemberFilters = () => {
  return useQueryStates({
    searchTerm: parseAsString,
    role: parseAsString,
  });
};
