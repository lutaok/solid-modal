# **Solid Modal**

A simple and accessible Modal that you can use in your next **SolidJS** project

## Index

- [Installation](#installation)
- [Usage](#usage)
- [Properties](#properties)
- [Default Styling](#default-styling)

## Installation

Install the packages using any package manager you like:

### npm

    npm install @lutaok/solid-modal

### yarn

    yarn add @lutaok/solid-modal

### pnpm

    pnpm add @lutaok/solid-modal

## Usage

Here's a minimal example on how you can use the Modal to render your content

```tsx
const App: Component = () => {
  const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false);

  return (
    <div class={styles.App}>
      <button onClick={() => setIsModalOpen(true)}>Ciao</button>
      <Modal isOpen={isModalOpen()} onCloseRequest={() => setIsModalOpen(false)}>
        <div>Insert</div>
        <div>Your</div>
        <div>Content</div>
        <div>Here</div>
      </Modal>
    </div>
  );
};
```

Pretty simple, right? <br>
Simplicity though comes with the "cost" of having you define the ways to close the modal. <br>
It's usually recommended to have an element inside the **Modal** which could close it. <br>
In case you don't want it, you can specify **closeOnOutsideClick** _boolean_ prop, so you'll be able to close it just by clicking on the overlay.

## Properties

Here's the complete list of properties that the Modal can accept:

- **isOpen**: boolean -> Decides whether Modal overlay and content are rendered or not
- **ariaLabel** (_Optional_): string -> Label for accessibility purposes to identify the modal in the accessibility tree
- **ariaLabelledBy** (_Optional_): string -> Label that overrides **ariaLabel** to make the modal identified from other elements in the accessibility tree
- **closeOnOutsideClick** (_Optional_): boolean -> When true or present, makes the modal close by clicking on the overlay
- **contentClass** (_Optional_): string -> Class name for the content container (**BEWARE**: you will opt-out from default styling)
- **contentStyle** (_Optional_): JSX.CSSProperties -> Custom style object for the content container (**BEWARE**: can be used in conjunction with custom class names)
- **overlayClass** (_Optional_): string -> Class name for the overlay (**BEWARE**: you will opt-out from default styling)
- **overlayStyle** (_Optional_): JSX.CSSProperties -> Custom style object for the overlay (**BEWARE**: can be used in conjunction with custom class names)
- **role** (_Optional_): 'alert' | 'dialog' -> Will define the aria-role for accessibility purposes. Defaults to **dialog**
- **onCloseRequest**: () => void -> Handler for closing the modal

## Default Styling

I'll put here the default styling for both overlay and content just in case you want to opt-out but still want some defaults:

### Overlay:

```css
 {
  position: fixed;
  inset: 0 0 0 0;
  background-color: rgba(255, 255, 255, 0.5);
}
```

### Content:

```css
 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid rgba(200, 200, 200, 0.5);
  background-color: white;
  overflow: auto;
  max-height: 90%;
  max-width: 90%;
}
```

## Final Thoughts

This library is still in its **early stages** so it needs work and study to be perfectly accessible and functional. <br>
Contributions, advices and constructive criticism are warmly welcomed, don't be scared :)
