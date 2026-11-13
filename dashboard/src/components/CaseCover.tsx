import { useState } from "react";
import type { CaseSummary } from "../../shared/types";

export function CaseCover({
  item,
  large = false
}: {
  item: Pick<CaseSummary, "id" | "code" | "name" | "accent" | "year" | "media">;
  large?: boolean;
}) {
  const media = item.media[0];
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(media?.imageUrl) && !failed;

  return (
    <div
      className={`case-cover${large ? " case-cover--large" : ""}${hasImage ? " has-image" : " is-source-only"}`}
      style={{ backgroundColor: item.accent }}
      title={media ? `${media.caption} · ${media.credit}` : "暂无图片来源记录"}
    >
      {hasImage ? (
        <img
          className="cover-image"
          src={media.imageUrl ?? undefined}
          alt={media.caption}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="cover-missing">
          <span>{failed ? "原图无法外链预览" : "图片来源页"}</span>
          <small>{media?.status ?? "待补"}</small>
        </div>
      )}
      <span className="cover-shade" />
      <span className="cover-code">{item.code.replace(/^C/, "")}</span>
      <span className="cover-year">{item.year}</span>
    </div>
  );
}
