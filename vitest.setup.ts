import { vi } from 'vitest';

// Mock CSS imports
vi.mock('vuetify/lib/components/VCode/VCode.css', () => ({}));
vi.mock('vuetify/lib/styles/main.css', () => ({}));

// Globální mock pro všechny .css soubory
// @ts-ignore
if (typeof require !== 'undefined') {
  const Module = require('module');
  const originalLoad = Module._load;
  Module._load = function (request, parent, isMain) {
    if (request && typeof request === 'string' && request.match(/\.css$/)) {
      return {};
    }
    return originalLoad.apply(this, arguments);
  };
}
