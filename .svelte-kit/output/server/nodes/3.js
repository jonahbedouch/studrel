

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/candportal/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.f80d9749.js","_app/immutable/chunks/scheduler.05435e17.js","_app/immutable/chunks/index.d7cb2043.js","_app/immutable/chunks/utils.2fb9abaf.js","_app/immutable/chunks/singletons.47379fd2.js","_app/immutable/chunks/Card.7dd95f78.js"];
export const stylesheets = [];
export const fonts = [];
