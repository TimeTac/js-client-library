export type Tier = {
  id: number;
  name: string;
  internal_name: string;
  pricing: {
    hasMonthlyPrice: boolean;
    month: number;
    premiumYear: number;
    year: number;
    currency: string;
    premiumMonth: number;
    priceOnRequest: boolean;
  };
  description: string;
  display_features: {
    features: {
      image: string;
      tooltip: Record<string, string>;
      title: Record<string, string>;
    }[];
    premiumFeatures?: {
      image: string;
      tooltip: Record<string, string>;
      title: Record<string, string>;
    }[];
  };
  active?: boolean;
  sort_order?: number;
  unique_id?: string;
  zoho_product_id: string;
  zoho_plan_name_suffix?: string;
  free_tier?: boolean;
  specification_of_services: unknown; // leaving it like this in case the BE decides to properly implement the localised specs_of_services
};
