// Polyfills para APIs web que Supabase necesita pero Hermes no tiene
if (typeof globalThis.DOMException === 'undefined') {
  class DOMException extends Error {
    constructor(message?: string, name?: string) {
      super(message);
      this.name = name || 'DOMException';
    }
  }
  globalThis.DOMException = DOMException as any;
}
