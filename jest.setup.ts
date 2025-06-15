import '@testing-library/jest-dom'

// @ts-ignore
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(global, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserver,
});

window.HTMLElement.prototype.scrollIntoView = jest.fn()
