export type GeofenceToNodes = {
  id: number;
  geofence_id: number;
  node_id: number;
  updated: string;
};

export type GeofenceToNodesRead = GeofenceToNodes;

export type GeofenceToNodesUpdate = Pick<GeofenceToNodes, 'id' | 'node_id' | 'updated'>;

export type GeofenceToNodesCreate = Pick<GeofenceToNodes, 'geofence_id' | 'node_id'> & Partial<Pick<GeofenceToNodes, 'updated'>>;
