import { LightSourceType, type Presentation } from "../Presentation"


/**
 * Simple file to have some pres data
 * Since I didn't build the backend
 */
export const mockPres: Presentation = {
  name: 'mock Pres',
  devices: [
    {
      model: 'samsung-s22',
      originalPosition: {
        x: 0,
        y: 0,
        z: 0
      },
      deltaPosition: {
        x: 0,
        y: 0,
        z: 0
      },

      originalRotation: {
        roll: 0,
        pitch: 0,
        yaw: 0
      },
      deltaRotation: {
        roll: 0,
        pitch: 0,
        yaw: 0
      }
    },

    {
      model: 'samsung-s20',
      originalPosition: {
        x: 0,
        y: 0,
        z: 0
      },
      deltaPosition: {
        x: 0,
        y: 0,
        z: 0
      },

      originalRotation: {
        roll: 0,
        pitch: 0,
        yaw: 0
      },
      deltaRotation: {
        roll: 0,
        pitch: 0,
        yaw: 0
      }
    },
    
  ],

  lights: [
    {
      type: LightSourceType.Ambiant,
      originalPosition: {
        x: 0,
        y: 0,
        z: 0
      },
      deltaPosition: {
        x: 0,
        y: 0,
        z: 0
      },

      originalRotation: {
        roll: 0,
        pitch: 0,
        yaw: 0
      },
      deltaRotation: {
        roll: 0,
        pitch: 0,
        yaw: 0
      }
    }
  ]
}