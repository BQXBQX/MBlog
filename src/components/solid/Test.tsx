import { createSignal } from "solid-js";

export default function Test() {
  const [name] = createSignal<string>("BQX");

  return <h1>Hello {name()}</h1>;
}
