import type { Grant } from "@prisma/client";
import Image from "next/image";

export function GrantDetails({ name, image, description }: Grant) {
  return (
    <div>
      <div className="relative h-72">
        <Image
          alt={name}
          src={image}
          sizes="1024px"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div>{description}</div>
    </div>
  );
}
