import { describe, expect, it, vi } from 'vitest';
import { createSignal } from 'solid-js';
import { render, fireEvent } from '@solidjs/testing-library';
import Modal from './Modal';

describe('Modal component', () => {
  const testText = 'Test Content';
  const mockModalContent = <label>{testText}</label>;
  const bodyElement = document.querySelector('body');

  it('should render a Portal if Modal is closed', () => {
    const renderedModal = render(
      () => {
        const dummyFunction = vi.fn();
        const isModalOpen = false;
        return (
          <Modal isOpen={isModalOpen} onCloseRequest={dummyFunction}>
            {mockModalContent}
          </Modal>
        );
      },
      {
        container: bodyElement ?? undefined, // added option to avoid solid-testing-library to wrap rendered content in a <div>
      }
    );

    // Mock child not present in the DOM
    const modalChild = renderedModal.queryByText(testText);
    expect(modalChild).toBeNull();
  });

  it('should render its children if open', () => {
    const dummyFunction = vi.fn();
    const isModalOpen = true;
    const renderedModal = render(
      () => {
        return (
          <Modal isOpen={isModalOpen} onCloseRequest={dummyFunction}>
            {mockModalContent}
          </Modal>
        );
      },
      {
        container: bodyElement ?? undefined,
      }
    );

    // Mock child is present in the DOM
    const modalChild = renderedModal.queryByText(testText);
    expect(modalChild).toBe(mockModalContent?.valueOf());
  });

  it('should close when its isOpen prop changes to false', () => {
    const [isModalOpen, setIsModalOpen] = createSignal<boolean>(true);
    const closeModal = () => setIsModalOpen(false);
    const renderedModal = render(
      () => (
        <Modal isOpen={isModalOpen()} onCloseRequest={closeModal}>
          {mockModalContent}
        </Modal>
      ),
      {
        container: bodyElement ?? undefined,
      }
    );
    let modalChild = renderedModal.queryByText(testText);
    expect(modalChild).toBe(mockModalContent?.valueOf());

    closeModal();
    expect(isModalOpen()).toBe(false);

    modalChild = renderedModal.queryByText(testText);
    expect(modalChild).toBeNull();
  });

  it('should close when click happens on its overlay and its "closeOnOutsideClick" prop is set to true', () => {
    const [isModalOpen, setIsModalOpen] = createSignal<boolean>(true);
    const closeModal = () => setIsModalOpen(false);

    const renderedModal = render(
      () => (
        <Modal closeOnOutsideClick isOpen={isModalOpen()} onCloseRequest={closeModal}>
          {mockModalContent}
        </Modal>
      ),
      {
        container: bodyElement ?? undefined,
      }
    );

    let modalChild = renderedModal.queryByText(testText);
    expect(modalChild).toBe(mockModalContent?.valueOf());

    const modalOverlay = renderedModal.queryByRole('presentation');
    if (modalOverlay) {
      fireEvent.click(modalOverlay);
    }

    modalChild = renderedModal.queryByText(testText);
    expect(modalChild).toBeNull();
  });

  it('should not close when click happens on its content and its "closeOnOutsideClick" prop is set to true', () => {
    const [isModalOpen, setIsModalOpen] = createSignal<boolean>(true);
    const closeModal = () => setIsModalOpen(false);

    const renderedModal = render(
      () => (
        <Modal closeOnOutsideClick isOpen={isModalOpen()} onCloseRequest={closeModal}>
          {mockModalContent}
        </Modal>
      ),
      {
        container: bodyElement ?? undefined,
      }
    );

    let modalChild = renderedModal.queryByText(testText);
    expect(modalChild).toBe(mockModalContent?.valueOf());

    if (modalChild) {
      fireEvent.click(modalChild);
    }

    // Still open
    modalChild = renderedModal.queryByText(testText);
    expect(modalChild).toBe(mockModalContent?.valueOf());
  });
});
