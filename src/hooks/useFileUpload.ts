import { useMutation } from "@tanstack/react-query";

export function useFileUpload() {
  return useMutation(async (file: File) => {
    return fetch("/api/upload", {
      method: "POST",
      headers: { "content-type": file?.type || "application/octet-stream" },
      body: file,
    }).then((r) => r.json());
  });
}
