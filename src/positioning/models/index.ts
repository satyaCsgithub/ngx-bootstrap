export interface Offsets {
  bottom?: number;
  height: number;
  left?: number;
  right?: number;
  top?: number;
  width: number;
  marginTop?: number;
  marginLeft?: number;
  arrow?: {
    arrowElement?: HTMLElement;
    offsetsArrow?: { [key: string]: string|number|HTMLElement };
  };
}
