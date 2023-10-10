

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.799dbbde.js","_app/immutable/chunks/scheduler.05435e17.js","_app/immutable/chunks/index.d7cb2043.js","_app/immutable/chunks/utils.2fb9abaf.js","_app/immutable/chunks/singletons.47379fd2.js"];
export const stylesheets = ["_app/immutable/assets/0.d6a014aa.css"];
export const fonts = [];
