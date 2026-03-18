import { createImageUrlBuilder } from "@sanity/image-url";
import { serverClient as client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
