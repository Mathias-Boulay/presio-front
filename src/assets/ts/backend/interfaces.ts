/*
 * Types exported from Static inference of TypeBox types from the backend.
 * Copy pasted from presio-back
 */

export type ID = {
  id: string;
}

export type Position = {
  x: number;
  y: number;
  z: number;
}

export type Rotation = {
  pitch: number;
  roll: number;
  yaw: number;
}

export type Device = {
  id: string;
} & {
  name: string;
  filePath: string;
}

export type LightType = "AMBIANT" | "POINT";

export type LightPresentation = {
  id: string;
} & {
  x: number;
  y: number;
  z: number;
} & {
  pitch: number;
  roll: number;
  yaw: number;
} & {
  lightType: "AMBIANT" | "POINT";
}

export type DevicePresentation = {
  id: string;
} & {
  x: number;
  y: number;
  z: number;
} & {
  pitch: number;
  roll: number;
  yaw: number;
} & {
  imagePath?: string | null | undefined;
  device: {
      id: string;
  } & {
      name: string;
      filePath: string;
  };
}

export type Presentation = {
  id: string;
} & {
  name: string;
  devices: ({
      id: string;
  } & {
      x: number;
      y: number;
      z: number;
  } & {
      pitch: number;
      roll: number;
      yaw: number;
  } & {
      imagePath?: string | null | undefined;
      device: {
          id: string;
      } & {
          name: string;
          filePath: string;
      };
  })[];
  lights: ({
      id: string;
  } & {
      x: number;
      y: number;
      z: number;
  } & {
      pitch: number;
      roll: number;
      yaw: number;
  } & {
      lightType: "AMBIANT" | "POINT";
  })[];
}

export type UserPresentation = {
  id: string;
} & {
  name: string;
  devices: ({
      id: string;
  } & {
      x: number;
      y: number;
      z: number;
  } & {
      roll: number;
      pitch: number;
      yaw: number;
  } & {
      imagePath?: string | null | undefined;
      device: {
          id: string;
      } & {
          name: string;
          filePath: string;
      };
  })[];
  lights: ({
      id: string;
  } & {
      x: number;
      y: number;
      z: number;
  } & {
      roll: number;
      pitch: number;
      yaw: number;
  } & {
      lightType: "AMBIANT" | "POINT";
  })[];
} & {
  model: {
      id: string;
  } & {
      name: string;
      devices: ({
          id: string;
      } & {
          x: number;
          y: number;
          z: number;
      } & {
          roll: number;
          pitch: number;
          yaw: number;
      } & {
          imagePath?: string | null | undefined;
          device: {
              id: string;
          } & {
              name: string;
              filePath: string;
          };
      })[];
      lights: ({
          id: string;
      } & {
          x: number;
          y: number;
          z: number;
      } & {
          roll: number;
          pitch: number;
          yaw: number;
      } & {
          lightType: "AMBIANT" | "POINT";
      })[];
  };
}

export type PresentationMetadata = {
  count: number;
}

export type SimplePresentation = {
  id: string;
  name: string;
}
