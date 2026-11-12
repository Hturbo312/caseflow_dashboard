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
  const common = { fill, stroke: fill };
  const svgProps = {
    width: size,
    height: size,
    viewBox: "0 0 12 12",
    "aria-hidden": true
  };

  if (type === "case") {
    return (
      <svg {...svgProps}>
        <rect x="1.5" y="1.5" width="9" height="9" rx="1.6" fill="#20242a" />
      </svg>
    );
  }
  if (type === "context") {
    return (
      <svg {...svgProps}>
        <path d="M6 1.3 10.7 6 6 10.7 1.3 6 6 1.3Z" {...common} />
      </svg>
    );
  }
  if (type === "actor") {
    return (
      <svg {...svgProps}>
        <circle cx="6" cy="6" r="4.4" {...common} />
      </svg>
    );
  }
  if (type === "task") {
    return (
      <svg {...svgProps}>
        <rect x="1.5" y="2.2" width="9" height="7.6" rx="2.2" {...common} />
      </svg>
    );
  }
  if (type === "technology") {
    return (
      <svg {...svgProps}>
        <path d="M6 1.1 10.4 3.4v5.2L6 10.9 1.6 8.6V3.4L6 1.1Z" {...common} />
      </svg>
    );
  }
  if (type === "capability") {
    return (
      <svg {...svgProps}>
        <circle cx="6" cy="6" r="4.4" fill="none" stroke={fill} strokeWidth="1.5" />
        <circle cx="6" cy="6" r="2.3" fill={fill} />
      </svg>
    );
  }
  if (type === "action") {
    return (
      <svg {...svgProps}>
        <path d="M6 1.3 10.7 10.2H1.3L6 1.3Z" {...common} />
      </svg>
    );
  }
  if (type === "target") {
    return (
      <svg {...svgProps}>
        <rect x="1.7" y="1.7" width="8.6" height="8.6" rx="1.1" fill="none" stroke={fill} strokeWidth="1.5" />
        <circle cx="6" cy="6" r="1.5" fill={fill} />
      </svg>
    );
  }
  return (
    <svg {...svgProps}>
      <circle cx="6" cy="6" r="4.3" fill="none" stroke={fill} strokeWidth="1.5" />
      <circle cx="6" cy="6" r="1.9" fill={fill} />
    </svg>
  );
}
