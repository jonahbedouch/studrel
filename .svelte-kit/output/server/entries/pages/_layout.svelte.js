import { c as create_ssr_component, e as escape, a as subscribe, v as validate_component } from "../../chunks/ssr.js";
import { u as user } from "../../chunks/authStore.js";
import "firebase/auth";
import "firebase/firestore";
const LogoutIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${"feather feather-log-out " + escape(className, true)}"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_user();
  return `<nav class="container w-full mx-auto h-16 flex overflow-hidden"><div class="w-full flex" data-svelte-h="svelte-18ylh0i"><h1 class="text-3xl leading-[4rem] align-middle mx-auto">Studrel Candidate Portal</h1></div> <div class="relative">${$user ? `<button class="h-10 w-10 mt-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900 absolute l-0 -translate-x-[calc(100%+1rem)]">${validate_component(LogoutIcon, "LogoutIcon").$$render(
    $$result,
    {
      className: "h-7 w-7 mx-auto dark:stroke-white"
    },
    {},
    {}
  )}</button>` : ``}</div></nav>`;
});
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_user();
  return `<div id="app" class="w-full bg-white dark:bg-gray-950 dark:text-white">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main class="flex min-h-screen container mx-auto px-4 overflow-y-scroll">${slots.default ? slots.default({}) : ``}</main></div>`;
});
export {
  Layout as default
};
