import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { C as Card } from "../../../chunks/Card.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col w-full">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `Add a Candidate`;
    }
  })}</div>`;
});
export {
  Page as default
};
