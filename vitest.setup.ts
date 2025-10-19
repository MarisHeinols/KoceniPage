// vitest.setup.ts
import { vi } from "vitest";

// Mock CSS modules so Vitest doesn’t choke on .css imports
vi.mock("*.css", () => ({}));