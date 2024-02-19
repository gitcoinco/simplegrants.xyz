import clsx from "clsx";
import { ImageIcon } from "lucide-react";
import {
  type ComponentProps,
  type ChangeEvent,
  useRef,
  forwardRef,
} from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "../button";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { Spinner } from "../spinner";

export type UploadFn = UseMutationResult<
  { url: string },
  unknown,
  File,
  unknown
>;
type Props = {
  name?: string;
  maxSize?: number;
  upload: UploadFn;
} & ComponentProps<"img">;

export const ImageUpload = forwardRef(function ImageUpload(
  {
    name,
    maxSize = 1024 * 1024 * 5, // 5 MB
    className,
    upload,
  }: Props,
  _ref,
) {
  const ref = useRef<HTMLInputElement>(null);
  const { control, setError } = useFormContext();

  const setPreview = useMutation(async (file: File) =>
    URL.createObjectURL(file),
  );

  return (
    <Controller
      control={control}
      name={name!}
      rules={{ required: "Recipe picture is required" }}
      render={({ field: { value, onChange, ...field } }) => {
        function handleChange(event: ChangeEvent<HTMLInputElement>) {
          const [file] = event.target.files ?? [];
          if (file) {
            if (file?.size >= maxSize) {
              setError(name!, {
                message: `Image file is too large. Max size is ${(maxSize / 1024).toFixed(2)} kb`,
              });
            } else {
              setPreview.mutate(file, {
                onSuccess: () =>
                  upload?.mutate(file, {
                    onSuccess: ({ url }) => onChange(url),
                  }),
              });
            }
          }
        }

        return (
          <div className={clsx("relative overflow-hidden", className)}>
            <Button
              size="icon"
              disabled={upload?.isLoading}
              onClick={() => ref.current?.click()}
              variant="primary"
              icon={upload?.isLoading ? Spinner : ImageIcon}
              className="absolute bottom-2 right-2"
            />

            <div
              onClick={() => ref.current?.click()}
              className={clsx(
                "h-full cursor-pointer rounded bg-gray-200 bg-cover bg-center bg-no-repeat dark:bg-gray-800",
                {
                  ["animate-pulse opacity-50"]: upload?.isLoading,
                },
              )}
              style={{
                backgroundImage: `url("${setPreview.data ?? value}")`,
              }}
            />
            <input
              {...field}
              ref={ref}
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              type="file"
            />
          </div>
        );
      }}
    />
  );
});
