import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape } from "../../../chunks/ssr.js";
import { u as user } from "../../../chunks/authStore.js";
import { C as Card } from "../../../chunks/Card.js";
import "firebase/auth";
import "firebase/firestore";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_user();
  return `${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h1 class="text-3xl" data-svelte-h="svelte-109c01i">There is no valid account associated with this email.</h1> <p class="text-xl mb-12" data-svelte-h="svelte-121owk2">This may be the result of an incorrectly set up account or data corruption. Please ensure that
		you are signed in with your <code class="bg-gray-300 border border-black dark:bg-gray-950 dark:border-white dark:text-gray-200 py-0.5 px-1 rounded">@berkeley.edu</code>
		email if you are a candidate and your
		<code class="bg-gray-300 border border-black dark:bg-gray-950 dark:border-white dark:text-gray-200 py-0.5 px-1 rounded">@hkn.eecs.berkeley.edu</code> email if you are already initiated. If you believe this to be an error, please DM your POC in the
		candidate slack!</p> <p class="mb-8 text-xl">You are currently signed in with: <code class="bg-gray-300 border border-black dark:bg-gray-950 dark:border-white dark:text-gray-200 py-0.5 px-1 rounded">${escape($user?.email)}</code></p> <button class="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white p-2 rounded" data-svelte-h="svelte-1kloi8k">Sign Out</button>`;
    }
  })}`;
});
export {
  Page as default
};
