// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { screen, setup } from "~/test-utils";
import { mockRoundCreated } from "~/test-setup";
import { type UploadFn } from "~/components/ui/form/image-upload";
import DiscoverRoundsPage from "./page";

describe("Discover Rounds", () => {
  it("renders", async () => {
    const { user, container } = setup(<DiscoverRoundsPage />);
  });
});
