import type { EntityType } from "../../shared/types";
import { TYPE_META } from "../../shared/meta";

export function TypeGlyph({
  type,
  size = 12,
  color
}: {
  type: EntityType;
  size?: number;
  color?: string;
}) {
  const fill = color ?? TYPE_META[type].color;
  const svgProps = {
    width: size,
    height: size,
    viewBox: "0 0 12 12",
    "aria-hidden": true
  };

  return (
    <svg {...svgProps}>
      <circle
        cx="6"
        cy="6"
        r={type === "case" ? 4.6 : 4.3}
        fill={fill}
        stroke={type === "case" ? "#f8f5ed" : fill}
        strokeWidth={type === "case" ? 1.2 : 0}
      />
    </svg>
  );
}
