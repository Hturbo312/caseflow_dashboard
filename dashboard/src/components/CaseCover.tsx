import type { CaseSummary } from "../../shared/types";

function Pattern({ cover }: { cover: string }) {
  const stroke = "rgba(255,255,255,.22)";
  const strong = "rgba(255,255,255,.38)";

  switch (cover) {
    case "steps":
      return (
        <g fill="none" stroke={stroke} strokeWidth="1">
          {[10, 20, 30, 40, 50, 60, 70].map((v) => (
            <path key={v} d={`M${v} 10h66v92H${v}`} />
          ))}
          <path d="M22 26h44v62H22z" stroke={strong} />
        </g>
      );
    case "network":
      return (
        <g>
          <g stroke={stroke} strokeWidth="1">
            <path d="M14 24 37 38 62 22M14 24l14 31 24-16 10 26-28 15-9-25M62 22l10 20M28 55l34 12" />
          </g>
          {[
            [14, 24],
            [37, 38],
            [62, 22],
            [28, 55],
            [52, 39],
            [62, 68],
            [72, 42],
            [34, 80]
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i === 1 ? 4 : 2.8}
              fill={i === 1 ? "rgba(255,255,255,.8)" : strong}
            />
          ))}
        </g>
      );
    case "lines":
      return (
        <g stroke={stroke} strokeWidth="1">
          {Array.from({ length: 13 }, (_, i) => (
            <path key={i} d={`M0 ${16 + i * 7}h86`} />
          ))}
          <path d="M0 44h86" stroke={strong} strokeWidth="2.2" />
          <path d="M23 0v112" stroke="rgba(255,255,255,.45)" strokeWidth="1.2" />
        </g>
      );
    case "lattice":
      return (
        <g stroke={stroke} strokeWidth="1">
          {Array.from({ length: 9 }, (_, i) => (
            <path key={`a${i}`} d={`M-20 ${i * 18}h126`} transform="rotate(38 43 56)" />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <path key={`b${i}`} d={`M-20 ${i * 18}h126`} transform="rotate(-38 43 56)" />
          ))}
          <circle cx="43" cy="56" r="12" fill="none" stroke={strong} strokeWidth="1.4" />
        </g>
      );
    case "star":
      return (
        <g stroke={stroke} strokeWidth="1" fill="none">
          {Array.from({ length: 18 }, (_, i) => {
            const angle = (i / 18) * Math.PI * 2;
            return (
              <path
                key={i}
                d={`M43 56 L${43 + Math.cos(angle) * 54} ${56 + Math.sin(angle) * 70}`}
              />
            );
          })}
          <circle cx="43" cy="56" r="7" fill={strong} stroke="none" />
          <circle cx="43" cy="56" r="18" stroke={strong} />
        </g>
      );
    case "rings":
      return (
        <g fill="none" stroke={stroke} strokeWidth="1">
          {[8, 17, 27, 38, 49, 61].map((r) => (
            <circle key={r} cx="43" cy="56" r={r} />
          ))}
          <path d="M43 0v112M0 56h86" stroke={strong} />
        </g>
      );
    case "cells":
      return (
        <g>
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={10 + col * 22}
                y={20 + row * 25}
                width="18"
                height="21"
                rx="1"
                fill={(row + col) % 3 === 0 ? strong : "none"}
                stroke={stroke}
              />
            ))
          )}
        </g>
      );
    case "tree":
      return (
        <g fill="none" stroke={stroke} strokeWidth="1.1">
          <path d="M43 112V66M43 66 23 42M43 66l22-24M23 42 12 22M23 42l4-24M65 42 54 20M65 42l14-16" />
          {[
            [12, 22],
            [27, 18],
            [54, 20],
            [79, 26],
            [23, 42],
            [65, 42]
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill={strong} stroke="none" />
          ))}
        </g>
      );
    case "stripes":
      return (
        <g stroke={stroke} strokeWidth="7">
          {Array.from({ length: 7 }, (_, i) => (
            <path key={i} d={`M-30 ${i * 26 - 10} 110 ${i * 26 - 58}`} />
          ))}
          <path d="M10 100 100 10" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
        </g>
      );
    default:
      return (
        <g fill={stroke}>
          {Array.from({ length: 7 }, (_, row) =>
            Array.from({ length: 5 }, (_, col) => (
              <circle key={`${row}-${col}`} cx={14 + col * 14} cy={22 + row * 12} r="2.2" />
            ))
          )}
        </g>
      );
  }
}

export function CaseCover({
  item,
  large = false
}: {
  item: Pick<CaseSummary, "id" | "code" | "name" | "accent" | "cover" | "year">;
  large?: boolean;
}) {
  return (
    <div
      className={`case-cover${large ? " case-cover--large" : ""}`}
      style={{ backgroundColor: item.accent }}
    >
      <svg
        viewBox="0 0 86 112"
        preserveAspectRatio="none"
        aria-hidden
        className="cover-pattern"
      >
        <Pattern cover={item.cover} />
      </svg>
      <span className="cover-code">{item.code.replace(/^C/, "")}</span>
      <span className="cover-initial">{item.name.slice(0, 1)}</span>
      <span className="cover-year">{item.year}</span>
      <span className="cover-grain" />
    </div>
  );
}
