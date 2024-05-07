import {
  type WalineInstance,
  type WalineInitOptions,
  init,
} from "@waline/client";

import "@waline/client/style";
import { createEffect, onCleanup, onMount } from "solid-js";

export type WalineOptions = Omit<WalineInitOptions, "el" | "serverURL">;

export const Waline = (props: WalineOptions) => {
  let containerRef: HTMLDivElement;
  let walineRef: WalineInstance;

  onMount(() => {
    walineRef = init({
      ...props,
      el: containerRef,
      serverURL: "https://comment.6qx.top/",
      emoji: [
        "//unpkg.com/@waline/emojis@1.2.0/tw-emoji",
        "//unpkg.com/@waline/emojis@1.2.0/tieba",
      ],
    })!;
  });

  onCleanup(() => walineRef?.destroy());

  createEffect(() => {
    walineRef.update(props);
  });

  return <div id="waline" ref={containerRef!} />;
};
