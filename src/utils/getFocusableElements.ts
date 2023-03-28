const focusableElementsQuery = 'a, button:not(:disabled), input, textarea, select, details, [tabindex]:not([tabindex="-1"])';

export const getFocusableElements = (element: HTMLElement): HTMLElement[] => Array.from(element.querySelectorAll(focusableElementsQuery));

export const enum KeyCodesEnum {
  TAB = 'Tab',
  ESCAPE = 'Escape',
}
