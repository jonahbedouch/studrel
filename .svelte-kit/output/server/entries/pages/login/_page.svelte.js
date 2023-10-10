import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/authStore.js";
import { C as Card } from "../../../chunks/Card.js";
import "firebase/auth";
import "firebase/firestore";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Card, "Card").$$render($$result, { className: "h-min" }, {}, {
    default: () => {
      return `<h1 class="text-3xl" data-svelte-h="svelte-9wpdv9">Welcome to the Studrel Candidate Portal!</h1> <p class="text-xl mb-6" data-svelte-h="svelte-6kkuxh">If you&#39;re a Studrel candidate, log in with your Berkeley email to track your progress throughout
		the candidate semester and view important upcoming dates!</p> <p class="text-xl mb-6" data-svelte-h="svelte-1lzcsvm">If you&#39;re a Studrel officer, log in with your HKN email to update your POCs&#39; progress!</p> <button class="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white p-2 rounded" data-svelte-h="svelte-6iw4m6">Login</button>`;
    }
  })}`;
});
export {
  Page as default
};
