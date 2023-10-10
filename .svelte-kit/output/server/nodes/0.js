import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.8f1dd2f9.js","_app/immutable/chunks/scheduler.05435e17.js","_app/immutable/chunks/index.d7cb2043.js","_app/immutable/chunks/utils.8765cbc3.js","_app/immutable/chunks/singletons.5f66887f.js"];
export const stylesheets = ["_app/immutable/assets/0.d6a014aa.css"];
export const fonts = [];
