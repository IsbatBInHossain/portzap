import { describe, it, expect, vi } from 'vitest';
import os from 'node:os';
import { detectOs } from '../../src/utils/detectOs';

// We "spy" on os.platform to control its return value for each test
vi.mock('node:os');

describe('detectOs utility', () => {
  it('should return "windows" for win32 platform', () => {
    vi.spyOn(os, 'platform').mockReturnValue('win32');
    expect(detectOs()).toBe('windows');
  });

  it('should return "unix" for darwin (macOS) platform', () => {
    vi.spyOn(os, 'platform').mockReturnValue('darwin');
    expect(detectOs()).toBe('unix');
  });

  it('should return "unix" for linux platform', () => {
    vi.spyOn(os, 'platform').mockReturnValue('linux');
    expect(detectOs()).toBe('unix');
  });

  it('should throw an error for an unsupported OS', () => {
    vi.spyOn(os, 'platform').mockReturnValue('sunos'); // An example of an unsupported OS
    expect(() => detectOs()).toThrow('Unsupported OS: sunos');
  });
});
