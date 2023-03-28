import { Component, createEffect, JSX, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

import { getFocusableElements, KeyCodesEnum } from '../utils/getFocusableElements';

interface ModalProps {
  children: JSX.Element;
  isOpen: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  closeOnOutsideClick?: boolean;
  contentClass?: string;
  contentStyle?: JSX.CSSProperties;
  overlayClass?: string;
  overlayStyle?: JSX.CSSProperties;
  role?: 'alert' | 'dialog';
  onCloseRequest: () => void;
}

const modalStyles: JSX.CSSProperties = {
  position: 'fixed',
  padding: '1rem',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'auto',
  border: '1px solid rgba(200, 200, 200, 0.5)',
  'background-color': 'white',
  'border-radius': '1rem',
  'max-height': '90%',
  'max-width': '90%',
};

const modalOverlayStyles: JSX.CSSProperties = {
  position: 'fixed',
  inset: '0 0 0 0',
  'background-color': 'rgba(255, 255, 255, 0.5)',
};

const Modal: Component<ModalProps> = (props) => {
  let modalRef: HTMLDivElement | undefined;

  let initialFocusedElement: Element | null;

  let focusableChildren: HTMLElement[] = [];

  const overlayClasses = {
    'solid-modal-overlay': true,
    [props.overlayClass as string]: !!props.overlayClass,
  };

  const contentClasses = {
    'solid-modal-content': true,
    [props.contentClass as string]: !!props.contentClass,
  };

  const focusInitialElement = (modalElement: HTMLDivElement) => {
    if (focusableChildren.length > 1) {
      focusableChildren[0].focus();
    } else {
      modalElement.focus();
    }
  };

  const focusNextElement = (currentFocusIndex: number) => {
    if (currentFocusIndex < focusableChildren.length - 1) {
      focusableChildren[currentFocusIndex + 1].focus();
    } else {
      focusableChildren[0].focus();
    }
  };

  const focusPreviousElement = (currentFocusIndex: number) => {
    if (currentFocusIndex > 0) {
      focusableChildren[currentFocusIndex - 1].focus();
    } else {
      focusableChildren[focusableChildren.length - 1].focus();
    }
  };

  createEffect(() => {
    if (props.isOpen && props.children && modalRef) {
      focusableChildren = getFocusableElements(modalRef);
    }
  });

  createEffect(() => {
    if (props.isOpen && modalRef) {
      initialFocusedElement = document.activeElement;
      focusInitialElement(modalRef);
    }
  });

  createEffect(() => {
    if (!props.isOpen && initialFocusedElement) {
      (initialFocusedElement as HTMLElement).focus();
    }
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case KeyCodesEnum.TAB:
        e.preventDefault();
        if (document.activeElement === modalRef && focusableChildren.length > 0) {
          e.shiftKey ? focusableChildren[focusableChildren.length - 1].focus() : focusableChildren[0].focus();
          return;
        }

        const activeFocusedChildIndex = focusableChildren.findIndex((child) => child === (document.activeElement as HTMLElement));

        if (activeFocusedChildIndex > -1) {
          e.shiftKey ? focusPreviousElement(activeFocusedChildIndex) : focusNextElement(activeFocusedChildIndex);
        }
        return;
      case KeyCodesEnum.ESCAPE:
        e.stopPropagation();
        props.onCloseRequest();
        return;
      default:
        return;
    }
  };

  return (
    <Portal>
      <Show when={props.isOpen}>
        <div
          role="presentation"
          style={!props.overlayClass ? { ...modalOverlayStyles, ...props.overlayStyle } : props.overlayStyle}
          classList={overlayClasses}
          onClick={props.closeOnOutsideClick ? props.onCloseRequest : undefined}
        >
          <div
            aria-labelledby={props.ariaLabelledBy}
            aria-label={props.ariaLabel}
            aria-modal="true"
            onKeyDown={handleKeyDown}
            style={!props.contentClass ? { ...modalStyles, ...props.overlayStyle } : props.contentStyle}
            classList={contentClasses}
            role={props.role ?? 'dialog'}
            ref={modalRef}
            tabIndex={0}
            onClick={(e) => e.stopImmediatePropagation()}
          >
            {props.children}
          </div>
        </div>
      </Show>
    </Portal>
  );
};

export default Modal;
