import type { Round } from "@prisma/client";
import Image from "next/image";

export function RoundDetails({ name, image, description }: Round) {
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
