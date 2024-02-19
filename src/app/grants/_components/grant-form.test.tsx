// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { screen, setup } from "~/test-utils";
import { GrantForm } from "./grant-form";
import { mockRoundCreated } from "~/test-setup";
import { type UploadFn } from "~/components/ui/form/image-upload";

describe("Grant Form", () => {
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
      <GrantForm onSubmit={onSubmit} upload={upload} />,
    );

    await user.click(screen.getByRole("button", { name: "Save grant" }));
    expect(onSubmit).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText("Name"), mockRoundCreated.name);
    await user.type(
      screen.getByLabelText("Description"),
      mockRoundCreated.description,
    );

    const image = new File(["(⌐□_□)"], "image.png", { type: "image/png" });
    const imageInput = container.querySelector(`input[name="image"]`);
    await user.upload(imageInput as HTMLElement, image);

    await user.click(screen.getByRole("button", { name: "Save grant" }));

    expect(onSubmit).toHaveBeenCalled();
  });
});
