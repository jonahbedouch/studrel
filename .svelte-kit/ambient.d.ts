
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const LC_TELEPHONE: string;
	export const GDMSESSION: string;
	export const DESKTOP_SESSION: string;
	export const CSF_DrawPluginDefaults: string;
	export const CSF_LANGUAGE: string;
	export const CSF_XmlOcafResource: string;
	export const MMGT_CLEAR: string;
	export const LOGNAME: string;
	export const EDITOR: string;
	export const MAIL: string;
	export const FLUTTER_HOME: string;
	export const LC_MEASUREMENT: string;
	export const XDG_SESSION_TYPE: string;
	export const SYSTEMD_EXEC_PID: string;
	export const DRAWHOME: string;
	export const HOME: string;
	export const USERNAME: string;
	export const CSF_STEPDefaults: string;
	export const QT_IM_MODULE: string;
	export const CSF_TObjMessage: string;
	export const DRAWDEFAULT: string;
	export const QT_AUTO_SCREEN_SCALE_FACTOR: string;
	export const CSF_XSMessage: string;
	export const USER: string;
	export const DISPLAY: string;
	export const MOTD_SHOWN: string;
	export const PATH: string;
	export const CSF_XCAFDefaults: string;
	export const CSF_StandardLiteDefaults: string;
	export const LANG: string;
	export const LC_NAME: string;
	export const XAUTHORITY: string;
	export const LC_PAPER: string;
	export const CSF_PluginDefaults: string;
	export const SESSION_MANAGER: string;
	export const PWD: string;
	export const XDG_RUNTIME_DIR: string;
	export const CSF_ShadersDirectory: string;
	export const XDG_SESSION_DESKTOP: string;
	export const XDG_DATA_DIRS: string;
	export const VTE_VERSION: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const CSF_OCCTResourcePath: string;
	export const GDM_LANG: string;
	export const CSF_StandardDefaults: string;
	export const GNOME_TERMINAL_SERVICE: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const LC_ADDRESS: string;
	export const SHELL: string;
	export const CASROOT: string;
	export const XDG_SESSION_CLASS: string;
	export const CSF_IGESDefaults: string;
	export const XMODIFIERS: string;
	export const LC_IDENTIFICATION: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const CSF_TObjDefaults: string;
	export const CSF_SHMessage: string;
	export const GNOME_TERMINAL_SCREEN: string;
	export const DEBUGINFOD_URLS: string;
	export const LC_NUMERIC: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const TERM: string;
	export const XDG_MENU_PREFIX: string;
	export const COLORTERM: string;
	export const LC_TIME: string;
	export const CSF_MDTVTexturesDirectory: string;
	export const WINDOWPATH: string;
	export const CSF_MIGRATION_TYPES: string;
	export const CSF_EXCEPTION_PROMPT: string;
	export const SSH_AUTH_SOCK: string;
	export const LC_MONETARY: string;
	export const SHLVL: string;
	export const OLDPWD: string;
	export const LESS_TERMCAP_mb: string;
	export const LESS_TERMCAP_md: string;
	export const LESS_TERMCAP_me: string;
	export const LESS_TERMCAP_se: string;
	export const LESS_TERMCAP_so: string;
	export const LESS_TERMCAP_ue: string;
	export const LESS_TERMCAP_us: string;
	export const LESS: string;
	export const LS_OPTIONS: string;
	export const LS_COLORS: string;
	export const P9K_SSH: string;
	export const _P9K_SSH_TTY: string;
	export const NVM_DIR: string;
	export const NVM_CD_FLAGS: string;
	export const NVM_BIN: string;
	export const NVM_INC: string;
	export const CONDA_EXE: string;
	export const _CE_M: string;
	export const _CE_CONDA: string;
	export const CONDA_PYTHON_EXE: string;
	export const CONDA_SHLVL: string;
	export const CONDA_PREFIX: string;
	export const CONDA_DEFAULT_ENV: string;
	export const CONDA_PROMPT_MODIFIER: string;
	export const BUN_INSTALL: string;
	export const P9K_TTY: string;
	export const _P9K_TTY: string;
	export const _: string;
	export const IS_FIREBASE_CLI: string;
	export const __FIREBASE_DEFAULTS__: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	export const PUBLIC_FIREBASE_API_KEY: string;
	export const PUBLIC_FIREBASE_AUTH_DOMAIN: string;
	export const PUBLIC_FIREBASE_PROJECT_ID: string;
	export const PUBLIC_FIREBASE_STORAGE_BUCKET: string;
	export const PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
	export const PUBLIC_FIREBASE_APP_ID: string;
	export const PUBLIC_FIREBASE_MEASUREMENT_ID: string;
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		LC_TELEPHONE: string;
		GDMSESSION: string;
		DESKTOP_SESSION: string;
		CSF_DrawPluginDefaults: string;
		CSF_LANGUAGE: string;
		CSF_XmlOcafResource: string;
		MMGT_CLEAR: string;
		LOGNAME: string;
		EDITOR: string;
		MAIL: string;
		FLUTTER_HOME: string;
		LC_MEASUREMENT: string;
		XDG_SESSION_TYPE: string;
		SYSTEMD_EXEC_PID: string;
		DRAWHOME: string;
		HOME: string;
		USERNAME: string;
		CSF_STEPDefaults: string;
		QT_IM_MODULE: string;
		CSF_TObjMessage: string;
		DRAWDEFAULT: string;
		QT_AUTO_SCREEN_SCALE_FACTOR: string;
		CSF_XSMessage: string;
		USER: string;
		DISPLAY: string;
		MOTD_SHOWN: string;
		PATH: string;
		CSF_XCAFDefaults: string;
		CSF_StandardLiteDefaults: string;
		LANG: string;
		LC_NAME: string;
		XAUTHORITY: string;
		LC_PAPER: string;
		CSF_PluginDefaults: string;
		SESSION_MANAGER: string;
		PWD: string;
		XDG_RUNTIME_DIR: string;
		CSF_ShadersDirectory: string;
		XDG_SESSION_DESKTOP: string;
		XDG_DATA_DIRS: string;
		VTE_VERSION: string;
		XDG_CURRENT_DESKTOP: string;
		CSF_OCCTResourcePath: string;
		GDM_LANG: string;
		CSF_StandardDefaults: string;
		GNOME_TERMINAL_SERVICE: string;
		MEMORY_PRESSURE_WRITE: string;
		LC_ADDRESS: string;
		SHELL: string;
		CASROOT: string;
		XDG_SESSION_CLASS: string;
		CSF_IGESDefaults: string;
		XMODIFIERS: string;
		LC_IDENTIFICATION: string;
		MEMORY_PRESSURE_WATCH: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		CSF_TObjDefaults: string;
		CSF_SHMessage: string;
		GNOME_TERMINAL_SCREEN: string;
		DEBUGINFOD_URLS: string;
		LC_NUMERIC: string;
		QT_QPA_PLATFORMTHEME: string;
		TERM: string;
		XDG_MENU_PREFIX: string;
		COLORTERM: string;
		LC_TIME: string;
		CSF_MDTVTexturesDirectory: string;
		WINDOWPATH: string;
		CSF_MIGRATION_TYPES: string;
		CSF_EXCEPTION_PROMPT: string;
		SSH_AUTH_SOCK: string;
		LC_MONETARY: string;
		SHLVL: string;
		OLDPWD: string;
		LESS_TERMCAP_mb: string;
		LESS_TERMCAP_md: string;
		LESS_TERMCAP_me: string;
		LESS_TERMCAP_se: string;
		LESS_TERMCAP_so: string;
		LESS_TERMCAP_ue: string;
		LESS_TERMCAP_us: string;
		LESS: string;
		LS_OPTIONS: string;
		LS_COLORS: string;
		P9K_SSH: string;
		_P9K_SSH_TTY: string;
		NVM_DIR: string;
		NVM_CD_FLAGS: string;
		NVM_BIN: string;
		NVM_INC: string;
		CONDA_EXE: string;
		_CE_M: string;
		_CE_CONDA: string;
		CONDA_PYTHON_EXE: string;
		CONDA_SHLVL: string;
		CONDA_PREFIX: string;
		CONDA_DEFAULT_ENV: string;
		CONDA_PROMPT_MODIFIER: string;
		BUN_INSTALL: string;
		P9K_TTY: string;
		_P9K_TTY: string;
		_: string;
		IS_FIREBASE_CLI: string;
		__FIREBASE_DEFAULTS__: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		PUBLIC_FIREBASE_API_KEY: string;
		PUBLIC_FIREBASE_AUTH_DOMAIN: string;
		PUBLIC_FIREBASE_PROJECT_ID: string;
		PUBLIC_FIREBASE_STORAGE_BUCKET: string;
		PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
		PUBLIC_FIREBASE_APP_ID: string;
		PUBLIC_FIREBASE_MEASUREMENT_ID: string;
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
