export type PublicHolidayTemplates = {
  id: number;
  template_name: string;
  country_id: number;
  iso_3166: string;
  is_default: boolean;
  source_id: number;
  active: boolean;
};

export type PublicHolidayTemplatesCreate = Pick<Partial<PublicHolidayTemplates>, 'template_name' | 'iso_3166'> &
  Pick<PublicHolidayTemplates, 'country_id'>;

export type PublicHolidayTemplatesUpdate = Partial<Omit<PublicHolidayTemplates, 'id'>> & Pick<PublicHolidayTemplates, 'id'>;
