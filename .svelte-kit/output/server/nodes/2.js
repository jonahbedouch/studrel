

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.644d98c8.js","_app/immutable/chunks/scheduler.05435e17.js","_app/immutable/chunks/index.d7cb2043.js"];
export const stylesheets = [];
export const fonts = [];
