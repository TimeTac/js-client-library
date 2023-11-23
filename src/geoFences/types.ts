type GeoFence = {
  id: number;
  name: string;
  geo_lat: number;
  geo_long: number;
  radius: number;
  is_demo_data: boolean;
  updated: string;
};

export type GeoFenceRead = GeoFence;

export type GeofanceCreate = Pick<GeoFence, 'name' | 'geo_lat' | 'geo_long' | 'radius'> & Partial<Pick<GeoFence, 'updated'>>;

export type GeofencUpdate = Pick<GeoFence, 'id'> & Pick<Partial<GeoFence>, 'name' | 'geo_lat' | 'geo_long' | 'radius' | 'updated'>;
