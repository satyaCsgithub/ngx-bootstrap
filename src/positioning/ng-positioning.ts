/**
 * @copyright Valor Software
 * @copyright Federico Zivolo and contributors
 */
import { Renderer2 } from '@angular/core';
import {
  computeAutoPlacement,
  getClientRect,
  getTargetOffsets,
  getReferenceOffsets,
  roundOffset,
  isNumeric
} from './utils';

import { updateArrowPosition, flip, preventOverflow, shift } from './modifiers';
import { Offsets } from './models';


export class Positioning {
  private renderer: Renderer2 = null;

  position(hostElement: HTMLElement, targetElement: HTMLElement, round = true): Offsets {
    return this.offset(hostElement, targetElement, false);
  }

  offset(hostElement: HTMLElement, targetElement: HTMLElement, round = true): Offsets {
    return getReferenceOffsets(targetElement, hostElement);
  }

  positionElements(
    hostElement: HTMLElement,
    targetElement: HTMLElement,
    position: string,
    appendToBody?: boolean
  ): Offsets {
    const hostElPosition = this.offset(hostElement, targetElement, false);
    const placement = computeAutoPlacement(position, hostElPosition, targetElement, hostElement);
    const targetElPosition: Offsets = getTargetOffsets(targetElement, hostElPosition, placement);

    updateArrowPosition(targetElement, targetElPosition, hostElPosition, '.arrow', placement);

    const chainOfModifiers = [
      getClientRect,
      (targetPosition: Offsets) => flip(targetElement, hostElement, targetPosition, hostElPosition, placement),
      (targetPosition: Offsets) => preventOverflow(targetElement, hostElement, targetPosition),
      (targetPosition: Offsets) => shift(targetPosition, hostElPosition, placement),
      roundOffset
    ];

    return chainOfModifiers.reduce((targetPosition, modifier) => {
      return modifier(targetPosition);
    }, targetElPosition);
  }

  initRenderer(renderer: Renderer2) {
    if (!this.renderer) {
      this.renderer = renderer;
    }
  }

  setStyles(element: HTMLElement, styles: any) {
    Object.keys(styles).forEach((prop: any) => {
      let unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 &&
        isNumeric(styles[prop])) {
        unit = 'px';
      }

      this.renderer.setStyle(element, prop, `${String(styles[prop])}${unit}`);
    });
  }
}

const positionService = new Positioning();

export function positionElements(
  hostElement: HTMLElement,
  targetElement: HTMLElement,
  placement: string,
  renderer: Renderer2,
  appendToBody?: boolean
): void {

  positionService.initRenderer(renderer);
  const pos = positionService.positionElements(
    hostElement,
    targetElement,
    placement,
    appendToBody
  );

  positionService.setStyles(targetElement, {
    'will-change': 'transform',
    top: '0px',
    left: '0px',
    transform: `translate3d(${pos.left}px, ${pos.top}px, 0px)`
  });
}
