import { Component, JSX, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

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
  const overlayClasses = {
    'solid-modal-overlay': true,
    [props.overlayClass as string]: !!props.overlayClass,
  };

  const contentClasses = {
    'solid-modal-content': true,
    [props.contentClass as string]: !!props.contentClass,
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
            style={!props.contentClass ? { ...modalStyles, ...props.overlayStyle } : props.contentStyle}
            classList={contentClasses}
            role={props.role ?? 'dialog'}
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
