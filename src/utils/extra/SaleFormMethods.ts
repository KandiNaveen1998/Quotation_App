type Step = {
  label: string;
  completed: boolean;
  value: string;
  displayName: string;
};

type ApiItem = {
  id: number;
  name: string;
  vehicleId: number;
  doc_date: string;
  description: string | null;
  isApproved: number;
};

export function updateStepsWithApiData(
  localData: Step[],
  apiData: ApiItem[],
): Step[] {
  return localData.map(step => {
    const matchedApiItem = apiData.find(item => {
      return item.name.toLowerCase() === step.label.toLowerCase();
    });

    if (matchedApiItem) {
      return {
        ...step,
        completed: matchedApiItem.isApproved === 1,
        displayName:
          step.label === 'Status' && matchedApiItem.isApproved === 1
            ? matchedApiItem.description || step.displayName
            : step.displayName,
      };
    }

    return step;
  });
}

export function mapApiDataToSteps(localData, apiData) {
  // mapping between local label and API name
  const labelToApiName = {
    Purchase: 'Purchaser',
    'Old Fin': 'Old Financer',
    Seller: 'Sale Customer',
    'Sale Fin': 'Sale Financer',
    RTO: 'RTO',
    Status: 'Status',
  };

  return localData.map(step => {
    const apiName = labelToApiName[step.label];
    const matchedApi = apiData.find(item => item.name === apiName);

    if (matchedApi) {
      const isCompleted = matchedApi.isApproved === 1;
      const isRejected = isCompleted && matchedApi.description === 'Rejected';

      return {
        ...step,
        completed: isCompleted,
        displayName:
          step.label === 'Status' && isCompleted
            ? matchedApi.description || step.displayName
            : step.displayName,
        ...(step.label === 'Status' && isRejected ? {cancelled: true} : {}),
      };
    }

    return step; // return original step if no match found
  });
}
