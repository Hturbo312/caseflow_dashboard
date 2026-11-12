import { getBootstrap, searchAtlas } from "./db";

const payload = getBootstrap();
console.log(
  JSON.stringify(
    {
      meta: payload.meta,
      ontology: payload.ontology.map((item) => item.version),
      sampleSearch: searchAtlas("自组织").hits.slice(0, 3)
    },
    null,
    2
  )
);
