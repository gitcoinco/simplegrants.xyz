// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { screen, setup } from "~/test-utils";
import { RoundForm } from "./round-form";
import { mockRoundCreated } from "~/test-setup";
import { type UploadFn } from "~/components/ui/form/image-upload";

describe("Round Form", () => {
  it("submits the form if validation passes", async () => {
    global.URL.createObjectURL = vi.fn();
    const onSubmit = vi.fn();
    const onUpload = vi
      .fn()
      .mockImplementation(
        (
          file,
          { onSuccess }: { onSuccess: (params: { url: string }) => void },
        ) => onSuccess({ url: "https://test-image" }),
      );

    const upload = {
      mutate: onUpload,
      isLoading: false,
    } as unknown as UploadFn;
    const { user, container } = setup(
      <RoundForm onSubmit={onSubmit} upload={upload} />,
    );

    await user.click(screen.getByRole("button", { name: "Save round" }));
    expect(onSubmit).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText("Name"), mockRoundCreated.name);
    await user.type(
      screen.getByLabelText("Description"),
      mockRoundCreated.description,
    );

    const image = new File(["(⌐□_□)"], "image.png", { type: "image/png" });
    const imageInput = container.querySelector(`input[name="image"]`);
    await user.upload(imageInput as HTMLElement, image);

    await user.type(screen.getByLabelText("Starts at"), "2025-01-01");
    await user.type(screen.getByLabelText("Ends at"), "2025-02-01");

    await user.click(screen.getByRole("button", { name: "Save round" }));

    expect(onSubmit).toHaveBeenCalled();
  });
});
