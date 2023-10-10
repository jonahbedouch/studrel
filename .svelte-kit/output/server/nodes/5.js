

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.89f3e334.js","_app/immutable/chunks/scheduler.05435e17.js","_app/immutable/chunks/index.d7cb2043.js","_app/immutable/chunks/utils.8765cbc3.js","_app/immutable/chunks/singletons.5f66887f.js","_app/immutable/chunks/Card.7dd95f78.js"];
export const stylesheets = [];
export const fonts = [];
