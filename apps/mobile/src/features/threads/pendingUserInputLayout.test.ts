import { describe, expect, it } from "vite-plus/test";

import { derivePendingUserInputMaxHeight } from "./pendingUserInputLayout";

describe("derivePendingUserInputMaxHeight", () => {
  it.each([
    {
      name: "normal portrait",
      windowHeight: 844,
      keyboardHeight: 336,
      navigationHeaderHeight: 88,
      composerOverlapHeight: 80,
      expected: 328,
    },
    {
      name: "maximum height cap",
      windowHeight: 1000,
      keyboardHeight: 0,
      navigationHeaderHeight: 88,
      composerOverlapHeight: 80,
      expected: 560,
    },
    {
      name: "120 points available",
      windowHeight: 400,
      keyboardHeight: 100,
      navigationHeaderHeight: 88,
      composerOverlapHeight: 80,
      expected: 120,
    },
    {
      name: "zero available space",
      windowHeight: 280,
      keyboardHeight: 100,
      navigationHeaderHeight: 88,
      composerOverlapHeight: 80,
      expected: 0,
    },
    {
      name: "negative available space",
      windowHeight: 240,
      keyboardHeight: 100,
      navigationHeaderHeight: 88,
      composerOverlapHeight: 80,
      expected: 0,
    },
    {
      name: "negative keyboard inset",
      windowHeight: 400,
      keyboardHeight: -100,
      navigationHeaderHeight: 88,
      composerOverlapHeight: 80,
      expected: 220,
    },
    {
      name: "negative navigation inset",
      windowHeight: 400,
      keyboardHeight: 100,
      navigationHeaderHeight: -88,
      composerOverlapHeight: 80,
      expected: 208,
    },
    {
      name: "negative composer inset",
      windowHeight: 400,
      keyboardHeight: 100,
      navigationHeaderHeight: 88,
      composerOverlapHeight: -80,
      expected: 200,
    },
    {
      name: "landscape keyboard closed",
      windowHeight: 390,
      keyboardHeight: 0,
      navigationHeaderHeight: 44,
      composerOverlapHeight: 64,
      expected: 270,
    },
    {
      name: "landscape keyboard open",
      windowHeight: 390,
      keyboardHeight: 200,
      navigationHeaderHeight: 44,
      composerOverlapHeight: 64,
      expected: 70,
    },
    {
      name: "landscape taller keyboard",
      windowHeight: 390,
      keyboardHeight: 300,
      navigationHeaderHeight: 44,
      composerOverlapHeight: 64,
      expected: 0,
    },
  ])("clamps $name", ({ name: _name, expected, ...input }) => {
    expect(derivePendingUserInputMaxHeight(input)).toBe(expected);
  });
});
