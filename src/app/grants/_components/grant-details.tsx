import type { Grant } from "@prisma/client";
import Image from "next/image";
import { Markdown } from "~/components/ui/markdown";

export function GrantDetails({ name, image, description }: Grant) {
  return (
    <div>
      <div className="relative mb-6 h-72">
        <Image
          alt={name}
          src={image}
          sizes="1024px"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <Markdown>{description}</Markdown>
    </div>
  );
}
