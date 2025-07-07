type Geofence = {
  id: number;
  name: string;
  geo_lat: number;
  geo_long: number;
  radius: number;
  is_demo_data: boolean;
  updated: string;
  is_request_flow_active: boolean;
  address?: string;
};

export type GeofenceRead = Geofence;

export type GeofenceCreate = Pick<Geofence, 'name' | 'geo_lat' | 'geo_long' | 'radius' | 'address' | 'is_request_flow_active'> &
  Partial<Pick<Geofence, 'updated'>>;

export type GeofenceUpdate = Pick<Geofence, 'id'> &
  Pick<Partial<Geofence>, 'name' | 'geo_lat' | 'geo_long' | 'radius' | 'updated' | 'address' | 'is_request_flow_active'>;
