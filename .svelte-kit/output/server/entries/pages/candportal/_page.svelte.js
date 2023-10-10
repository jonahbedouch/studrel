import { c as create_ssr_component, e as escape, a as subscribe, v as validate_component, b as each } from "../../../chunks/ssr.js";
import { u as user, a as userData, f as firestore } from "../../../chunks/authStore.js";
import { C as Card } from "../../../chunks/Card.js";
import "firebase/auth";
import { doc, collection, query, orderBy, where, limit } from "firebase/firestore";
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate" || key === "on_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const goto = /* @__PURE__ */ client_method("goto");
const CompleteIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${"feather feather-check " + escape(className, true)}"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
});
const Event = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  let $userData, $$unsubscribe_userData;
  let $candidateData, $$unsubscribe_candidateData;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  let { event } = $$props;
  doc(firestore, "events", event.name);
  doc(firestore, "users", $user?.email ?? "");
  let candidateData = userData;
  $$unsubscribe_candidateData = subscribe(candidateData, (value) => $candidateData = value);
  if ($$props.event === void 0 && $$bindings.event && event !== void 0)
    $$bindings.event(event);
  $$unsubscribe_user();
  $$unsubscribe_userData();
  $$unsubscribe_candidateData();
  return `${$userData?.candidate ? `<li class="flex flex-col"><h1><b>${escape(event.name)}</b> ${event.rsvp && $user?.email && $candidateData?.rsvps.includes(event.name) ? `<button class="text-base bg-red-600 hover:bg-red-700 px-1 rounded-lg text-white" data-svelte-h="svelte-18ssvtu">un-RSVP</button>` : `${event.rsvp ? `<button class="text-base bg-blue-600 hover:bg-blue-700 px-1 rounded-lg text-white" data-svelte-h="svelte-1do5yn3">RSVP</button>` : ``}`}</h1> <p class="text-lg">${escape(event.location)} | ${escape(event.time.toDate().toLocaleDateString())} ${escape(event.time.toDate().toLocaleTimeString())}</p></li>` : `<li class="flex flex-col"><h1 class="text-xl"><b>${escape(event.name)}</b></h1> <p class="text-lg">${escape(event.location)} | ${escape(event.time.toDate().toLocaleDateString())}</p></li>`}`;
});
const IncompleteIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${"feather feather-x " + escape(className, true)}"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let graphicsPoints;
  let spotlightPoints;
  let merchPoints;
  let graphicsCategoryPoints;
  let graphicReqSatisfied;
  let meetingPoints;
  let snackPoints;
  let eventPoints;
  let eventCategoryPoints;
  let eventReqSatisfied;
  let totalPoints;
  let $candidateData, $$unsubscribe_candidateData;
  let candidateData = userData;
  $$unsubscribe_candidateData = subscribe(candidateData, (value) => $candidateData = value);
  if (!$candidateData) {
    goto("/invalidAccount");
  }
  let eventRef = collection(firestore, "events");
  console.log(Date.now());
  query(eventRef, orderBy("time"), where("time", ">", /* @__PURE__ */ new Date()), limit(5));
  let events = [];
  graphicsPoints = $candidateData ? $candidateData.graphicsCreated.length * 2 : 0;
  spotlightPoints = $candidateData ? ($candidateData.spotlightCreated ? 1 : 0) * 3 : 0;
  merchPoints = $candidateData ? ($candidateData.merchDesigned ? 1 : 0) * 4 : 0;
  graphicsCategoryPoints = graphicsPoints + spotlightPoints + merchPoints;
  graphicReqSatisfied = graphicsCategoryPoints > 0;
  meetingPoints = $candidateData ? $candidateData.meetingsAttended.length * 1 : 0;
  snackPoints = $candidateData ? $candidateData.snackAttacksAttended.length * 1 : 0;
  eventPoints = $candidateData ? $candidateData.eventsOrganized.length * 4 : 0;
  eventCategoryPoints = meetingPoints + snackPoints + eventPoints;
  eventReqSatisfied = eventCategoryPoints > 0;
  totalPoints = graphicsCategoryPoints + eventCategoryPoints;
  $$unsubscribe_candidateData();
  return `<div class="flex flex-col">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h1 class="text-3xl" data-svelte-h="svelte-ze847t">Welcome to Studrel!</h1> <p class="text-lg">We&#39;re very excited to have you initiating with us this semester, ${escape($candidateData?.firstName)}!
			Studrel is the student relations arm of HKN! We focus on event planning for the campus
			community, marketing and social media promotions, and general community engagement. This
			semester, we&#39;re demoing a brand new candidate project, alongside this brand new candidate
			portal! If you have any problems with the portal or are confused about your responsibilities,
			please reach out to your POC!</p>`;
    }
  })} ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h1 class="text-3xl">Your POC this semester is:
			${`Loading...`}</h1> <p class="text-lg mb-4" data-svelte-h="svelte-qhc2ra">They should check in with you throughout the semester! If you have any questions, feel free to
			reach out to them on slack!</p>`;
    }
  })} <div class="flex md:flex-row flex-col">${validate_component(Card, "Card").$$render($$result, { className: "flex grow mr-6 min-w-max" }, {}, {
    default: () => {
      return `<h1 class="text-3xl" data-svelte-h="svelte-1s19jud">Upcoming Dates</h1> <ul class="text-lg max-h-64 overflow-y-scroll">${events.length > 0 ? `${each(events, (event) => {
        return `${validate_component(Event, "Event").$$render($$result, { event }, {}, {})}`;
      })}` : `<p data-svelte-h="svelte-qdsr2u">Loading...</p>`}</ul>`;
    }
  })} ${validate_component(Card, "Card").$$render($$result, { className: "shrink min-w-max" }, {}, {
    default: () => {
      return `<h1 class="text-3xl" data-svelte-h="svelte-miayo9">Important Links</h1> <p class="text-lg" data-svelte-h="svelte-1w4itna">put event signups here</p>`;
    }
  })}</div> ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h1 class="flex flex-row items-center align-middle text-3xl">Candidate Project
			${totalPoints > 6 && graphicReqSatisfied && eventReqSatisfied ? `${validate_component(CompleteIcon, "CompleteIcon").$$render(
        $$result,
        {
          className: "w-6 h-6 ml-2 stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
        },
        {},
        {}
      )}` : `${validate_component(IncompleteIcon, "IncompleteIcon").$$render(
        $$result,
        {
          className: "w-6 h-6 ml-2 stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
        },
        {},
        {}
      )}`}</h1> <div class="flex"><div class="flex flex-col w-full"><h2 class="mb-1 flex flex-row items-center align-middle text-2xl">Number of Points
					${totalPoints >= 6 ? `${validate_component(CompleteIcon, "CompleteIcon").$$render(
        $$result,
        {
          className: "w-6 h-6 ml-2 stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
        },
        {},
        {}
      )}` : `${validate_component(IncompleteIcon, "IncompleteIcon").$$render(
        $$result,
        {
          className: "w-6 h-6 ml-2 stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
        },
        {},
        {}
      )}`}</h2> <div class="w-full mb-5 h-8 rounded-full bg-gray-200 dark:bg-gray-700"><div class="h-8 rounded-full bg-blue-500" style="${"width: " + escape(
        totalPoints / 6 * 100 < 100 ? totalPoints / 6 * 100 : 100,
        true
      ) + "%"}"></div></div></div> <div class="flex justify-center align-middle items-center w-32"><span class="block text-5xl mx-auto">${escape(totalPoints)}/6</span></div></div> <h2 class="flex flex-row items-center align-middle text-2xl">Breadth Requirement
			${graphicReqSatisfied && eventReqSatisfied ? `${validate_component(CompleteIcon, "CompleteIcon").$$render(
        $$result,
        {
          className: "w-6 h-6 ml-2 stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
        },
        {},
        {}
      )}` : `${validate_component(IncompleteIcon, "IncompleteIcon").$$render(
        $$result,
        {
          className: "w-6 h-6 ml-2 stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
        },
        {},
        {}
      )}`}</h2> <p class="flex flex-row items-center align-middle text-lg">Graphic Design
			${graphicReqSatisfied ? `${validate_component(CompleteIcon, "CompleteIcon").$$render(
        $$result,
        {
          className: "w-6 h-6 ml-2 stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
        },
        {},
        {}
      )}` : `${validate_component(IncompleteIcon, "IncompleteIcon").$$render(
        $$result,
        {
          className: "w-6 h-6 ml-2 stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
        },
        {},
        {}
      )}`}</p> <p class="flex flex-row items-center align-middle text-lg">Event Planning
			${eventReqSatisfied ? `${validate_component(CompleteIcon, "CompleteIcon").$$render(
        $$result,
        {
          className: "w-6 h-6 ml-2 stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
        },
        {},
        {}
      )}` : `${validate_component(IncompleteIcon, "IncompleteIcon").$$render(
        $$result,
        {
          className: "w-6 h-6 ml-2 stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
        },
        {},
        {}
      )}`}</p>`;
    }
  })} <div class="flex md:flex-row flex-col">${validate_component(Card, "Card").$$render($$result, { className: "flex grow mr-6 min-w-max" }, {}, {
    default: () => {
      return `<h1 class="text-3xl" data-svelte-h="svelte-1hlg1lm">Graphic Design</h1> <p class="text-2xl">Instagram Posts <span class="w-6 h-6 ml-2 stroke-2 text-lg bg-blue-600 text-white px-1 rounded-lg" data-svelte-h="svelte-1i5vo5n">2 PTS</span> ${$candidateData?.graphicsCreated && $candidateData?.graphicsCreated.length > 0 ? `${each($candidateData.graphicsCreated, (graphic) => {
        return `<p class="text-base">${escape(graphic)}</p>`;
      })}` : `<p class="text-base" data-svelte-h="svelte-kd0ghy">No Posts Made (yet... )</p>`}</p> <p class="flex flex-row items-center align-middle text-2xl">Committee Spotlight Graphic <span class="h-6 ml-2 stroke-2 text-lg bg-blue-600 text-white px-1 rounded-lg" data-svelte-h="svelte-p49bl0">3 PTS</span> ${$candidateData?.spotlightCreated ? `${validate_component(CompleteIcon, "CompleteIcon").$$render(
        $$result,
        {
          className: "w-6 h-6 ml-2 stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
        },
        {},
        {}
      )}` : `${validate_component(IncompleteIcon, "IncompleteIcon").$$render(
        $$result,
        {
          className: "w-6 h-6 ml-2 stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
        },
        {},
        {}
      )}`}</p> <p class="flex flex-row items-center align-middle text-2xl">Merch Design <span class="h-6 ml-2 stroke-2 text-lg bg-blue-600 text-white px-1 rounded-lg" data-svelte-h="svelte-1eqkqbp">4 PTS</span> ${$candidateData?.merchDesigned ? `${validate_component(CompleteIcon, "CompleteIcon").$$render(
        $$result,
        {
          className: "w-6 h-6 ml-2 stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
        },
        {},
        {}
      )}` : `${validate_component(IncompleteIcon, "IncompleteIcon").$$render(
        $$result,
        {
          className: "w-6 h-6 ml-2 stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
        },
        {},
        {}
      )}`}</p>`;
    }
  })} ${validate_component(Card, "Card").$$render($$result, { className: "flex grow min-w-max" }, {}, {
    default: () => {
      return `<h1 class="text-3xl" data-svelte-h="svelte-dqads7">Event Planning</h1> <p class="text-2xl">Studrel Meetings <span class="w-6 h-6 ml-2 stroke-2 text-lg bg-blue-600 text-white px-1 rounded-lg" data-svelte-h="svelte-kjpxa3">1 PT</span> ${$candidateData?.meetingsAttended && $candidateData?.meetingsAttended.length > 0 ? `${each($candidateData.meetingsAttended, (meeting) => {
        return `<p class="text-base">${escape(meeting)}</p>`;
      })}` : `<p class="text-base" data-svelte-h="svelte-85igiq">No Studrel Meetings Attended (yet... )</p>`}</p> <p class="text-2xl">Snack Attacks <span class="w-6 h-6 ml-2 stroke-2 text-lg bg-blue-600 text-white px-1 rounded-lg" data-svelte-h="svelte-kjpxa3">1 PT</span> ${$candidateData?.snackAttacksAttended && $candidateData?.snackAttacksAttended.length > 0 ? `${each($candidateData.snackAttacksAttended, (meeting) => {
        return `<p class="text-base">${escape(meeting)}</p>`;
      })}` : `<p class="text-base" data-svelte-h="svelte-1qap0hq">No Snack Attacks Attended (yet... )</p>`}</p> <p class="text-2xl">Event Organizing <span class="w-6 h-6 ml-2 stroke-2 text-lg bg-blue-600 text-white px-1 rounded-lg" data-svelte-h="svelte-mwl6zl">4 PTS</span> ${$candidateData?.eventsOrganized && $candidateData?.eventsOrganized.length > 0 ? `${each($candidateData.eventsOrganized, (meeting) => {
        return `<p class="text-base">${escape(meeting)}</p>`;
      })}` : `<p class="text-base" data-svelte-h="svelte-11niyvg">No Events Organized (yet... )</p>`}</p>`;
    }
  })}</div></div>`;
});
export {
  Page as default
};
