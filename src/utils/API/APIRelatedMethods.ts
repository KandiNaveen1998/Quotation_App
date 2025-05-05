export const handleParamsData = (
  url: string,
  params: Record<
    string,
    string | number | boolean | string[] | number[] | null | undefined
  >,
): string => {
  const queryParams: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (
      value !== undefined &&
      value !== null &&
      value.toString().trim().length > 0
    ) {
      if (Array.isArray(value)) {
        // Convert the array to a string without encoding
        queryParams.push(`${key}=${JSON.stringify(value)}`);
      } else {
        queryParams.push(`${key}=${encodeURIComponent(value)}`);
      }
    }
  }

  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }

  return url;
};
