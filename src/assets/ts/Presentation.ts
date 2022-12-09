/**
 * Interfaces representing the data from the backend API
 */

/**
 * Data class which stores the data needed to render a scene
 */
export interface Presentation {
  name: string;
  devices: Array<Device>;
  lights: Array<LightSource>;
}

/** Data class: Represents a device */
export interface Device {
  model: string;  // The model name is queried against the db
  originalPosition: Position; 
  deltaPosition: Position;
  
  originalRotation: Rotation;
  deltaRotation: Rotation;
}

/** Data class: Represents a light */
export interface LightSource {
  type: LightSourceType;
  originalPosition: Position; 
  deltaPosition: Position;
  
  originalRotation: Rotation;
  deltaRotation: Rotation;
}


export enum LightSourceType { 
  Ambiant = 'ambiant'
}

export interface Position {
  x: Number;
  y: Number;
  z: Number;
}

export interface Rotation {
  roll: Number;
  pitch: Number;
  yaw: Number;
}