

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.f92c85ee.js","_app/immutable/chunks/scheduler.05435e17.js","_app/immutable/chunks/index.d7cb2043.js","_app/immutable/chunks/singletons.47379fd2.js"];
export const stylesheets = [];
export const fonts = [];
