import { c as create_ssr_component, e as escape } from "./ssr.js";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<div class="${"flex flex-col w-full mx-auto my-3 p-6 rounded-xl bg-gray-200 dark:bg-gray-900 " + escape(className, true)}">${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Card as C
};
