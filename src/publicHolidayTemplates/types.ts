export type PublicHolidayTemplates = {
  id: number;
  template_name: string;
  country_id: number;
  iso_3166: string;
  is_default: boolean;
  source_id: number;
  active: boolean;
};

export type PublicHolidayTemplatesUpdate = Partial<Omit<PublicHolidayTemplates, 'id'>> & Pick<PublicHolidayTemplates, 'id'>;
