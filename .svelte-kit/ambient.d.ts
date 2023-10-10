
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
	export const SHELL: string;
	export const npm_command: string;
	export const SESSION_MANAGER: string;
	export const npm_config_userconfig: string;
	export const COLORTERM: string;
	export const CSF_MDTVTexturesDirectory: string;
	export const npm_config_cache: string;
	export const LESS: string;
	export const NVM_INC: string;
	export const XDG_MENU_PREFIX: string;
	export const CONDA_EXE: string;
	export const _CE_M: string;
	export const CSF_DrawPluginDefaults: string;
	export const _P9K_TTY: string;
	export const NODE: string;
	export const LESS_TERMCAP_se: string;
	export const LESS_TERMCAP_so: string;
	export const LC_ADDRESS: string;
	export const CSF_LANGUAGE: string;
	export const LC_NAME: string;
	export const SSH_AUTH_SOCK: string;
	export const CSF_MIGRATION_TYPES: string;
	export const P9K_TTY: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const COLOR: string;
	export const npm_config_local_prefix: string;
	export const XMODIFIERS: string;
	export const DESKTOP_SESSION: string;
	export const LC_MONETARY: string;
	export const CSF_OCCTResourcePath: string;
	export const npm_config_globalconfig: string;
	export const FLUTTER_HOME: string;
	export const CSF_STEPDefaults: string;
	export const EDITOR: string;
	export const PWD: string;
	export const XDG_SESSION_DESKTOP: string;
	export const LOGNAME: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const XDG_SESSION_TYPE: string;
	export const CONDA_PREFIX: string;
	export const DRAWHOME: string;
	export const npm_config_init_module: string;
	export const SYSTEMD_EXEC_PID: string;
	export const _: string;
	export const XAUTHORITY: string;
	export const CSF_StandardLiteDefaults: string;
	export const LS_OPTIONS: string;
	export const WINDOWPATH: string;
	export const MOTD_SHOWN: string;
	export const GDM_LANG: string;
	export const HOME: string;
	export const USERNAME: string;
	export const LC_PAPER: string;
	export const LANG: string;
	export const LS_COLORS: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const npm_package_version: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const VTE_VERSION: string;
	export const CONDA_PROMPT_MODIFIER: string;
	export const GNOME_TERMINAL_SCREEN: string;
	export const INIT_CWD: string;
	export const CSF_ShadersDirectory: string;
	export const CSF_EXCEPTION_PROMPT: string;
	export const CSF_XmlOcafResource: string;
	export const npm_lifecycle_script: string;
	export const NVM_DIR: string;
	export const CSF_SHMessage: string;
	export const XDG_SESSION_CLASS: string;
	export const TERM: string;
	export const LC_IDENTIFICATION: string;
	export const npm_package_name: string;
	export const LESS_TERMCAP_mb: string;
	export const LESS_TERMCAP_me: string;
	export const LESS_TERMCAP_md: string;
	export const _CE_CONDA: string;
	export const npm_config_prefix: string;
	export const USER: string;
	export const GNOME_TERMINAL_SERVICE: string;
	export const CONDA_SHLVL: string;
	export const CSF_StandardDefaults: string;
	export const CSF_IGESDefaults: string;
	export const DISPLAY: string;
	export const CSF_XCAFDefaults: string;
	export const npm_lifecycle_event: string;
	export const LESS_TERMCAP_ue: string;
	export const SHLVL: string;
	export const NVM_CD_FLAGS: string;
	export const LESS_TERMCAP_us: string;
	export const LC_TELEPHONE: string;
	export const QT_IM_MODULE: string;
	export const _P9K_SSH_TTY: string;
	export const LC_MEASUREMENT: string;
	export const CSF_PluginDefaults: string;
	export const CSF_TObjMessage: string;
	export const npm_config_user_agent: string;
	export const CASROOT: string;
	export const npm_execpath: string;
	export const CONDA_PYTHON_EXE: string;
	export const XDG_RUNTIME_DIR: string;
	export const CONDA_DEFAULT_ENV: string;
	export const DEBUGINFOD_URLS: string;
	export const npm_package_json: string;
	export const LC_TIME: string;
	export const BUN_INSTALL: string;
	export const P9K_SSH: string;
	export const QT_AUTO_SCREEN_SCALE_FACTOR: string;
	export const CSF_XSMessage: string;
	export const MMGT_CLEAR: string;
	export const XDG_DATA_DIRS: string;
	export const npm_config_noproxy: string;
	export const PATH: string;
	export const npm_config_metrics_registry: string;
	export const CSF_TObjDefaults: string;
	export const npm_config_node_gyp: string;
	export const GDMSESSION: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const npm_config_global_prefix: string;
	export const NVM_BIN: string;
	export const MAIL: string;
	export const DRAWDEFAULT: string;
	export const npm_node_execpath: string;
	export const npm_config_engine_strict: string;
	export const LC_NUMERIC: string;
	export const OLDPWD: string;
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
		SHELL: string;
		npm_command: string;
		SESSION_MANAGER: string;
		npm_config_userconfig: string;
		COLORTERM: string;
		CSF_MDTVTexturesDirectory: string;
		npm_config_cache: string;
		LESS: string;
		NVM_INC: string;
		XDG_MENU_PREFIX: string;
		CONDA_EXE: string;
		_CE_M: string;
		CSF_DrawPluginDefaults: string;
		_P9K_TTY: string;
		NODE: string;
		LESS_TERMCAP_se: string;
		LESS_TERMCAP_so: string;
		LC_ADDRESS: string;
		CSF_LANGUAGE: string;
		LC_NAME: string;
		SSH_AUTH_SOCK: string;
		CSF_MIGRATION_TYPES: string;
		P9K_TTY: string;
		MEMORY_PRESSURE_WRITE: string;
		COLOR: string;
		npm_config_local_prefix: string;
		XMODIFIERS: string;
		DESKTOP_SESSION: string;
		LC_MONETARY: string;
		CSF_OCCTResourcePath: string;
		npm_config_globalconfig: string;
		FLUTTER_HOME: string;
		CSF_STEPDefaults: string;
		EDITOR: string;
		PWD: string;
		XDG_SESSION_DESKTOP: string;
		LOGNAME: string;
		QT_QPA_PLATFORMTHEME: string;
		XDG_SESSION_TYPE: string;
		CONDA_PREFIX: string;
		DRAWHOME: string;
		npm_config_init_module: string;
		SYSTEMD_EXEC_PID: string;
		_: string;
		XAUTHORITY: string;
		CSF_StandardLiteDefaults: string;
		LS_OPTIONS: string;
		WINDOWPATH: string;
		MOTD_SHOWN: string;
		GDM_LANG: string;
		HOME: string;
		USERNAME: string;
		LC_PAPER: string;
		LANG: string;
		LS_COLORS: string;
		XDG_CURRENT_DESKTOP: string;
		npm_package_version: string;
		MEMORY_PRESSURE_WATCH: string;
		VTE_VERSION: string;
		CONDA_PROMPT_MODIFIER: string;
		GNOME_TERMINAL_SCREEN: string;
		INIT_CWD: string;
		CSF_ShadersDirectory: string;
		CSF_EXCEPTION_PROMPT: string;
		CSF_XmlOcafResource: string;
		npm_lifecycle_script: string;
		NVM_DIR: string;
		CSF_SHMessage: string;
		XDG_SESSION_CLASS: string;
		TERM: string;
		LC_IDENTIFICATION: string;
		npm_package_name: string;
		LESS_TERMCAP_mb: string;
		LESS_TERMCAP_me: string;
		LESS_TERMCAP_md: string;
		_CE_CONDA: string;
		npm_config_prefix: string;
		USER: string;
		GNOME_TERMINAL_SERVICE: string;
		CONDA_SHLVL: string;
		CSF_StandardDefaults: string;
		CSF_IGESDefaults: string;
		DISPLAY: string;
		CSF_XCAFDefaults: string;
		npm_lifecycle_event: string;
		LESS_TERMCAP_ue: string;
		SHLVL: string;
		NVM_CD_FLAGS: string;
		LESS_TERMCAP_us: string;
		LC_TELEPHONE: string;
		QT_IM_MODULE: string;
		_P9K_SSH_TTY: string;
		LC_MEASUREMENT: string;
		CSF_PluginDefaults: string;
		CSF_TObjMessage: string;
		npm_config_user_agent: string;
		CASROOT: string;
		npm_execpath: string;
		CONDA_PYTHON_EXE: string;
		XDG_RUNTIME_DIR: string;
		CONDA_DEFAULT_ENV: string;
		DEBUGINFOD_URLS: string;
		npm_package_json: string;
		LC_TIME: string;
		BUN_INSTALL: string;
		P9K_SSH: string;
		QT_AUTO_SCREEN_SCALE_FACTOR: string;
		CSF_XSMessage: string;
		MMGT_CLEAR: string;
		XDG_DATA_DIRS: string;
		npm_config_noproxy: string;
		PATH: string;
		npm_config_metrics_registry: string;
		CSF_TObjDefaults: string;
		npm_config_node_gyp: string;
		GDMSESSION: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		npm_config_global_prefix: string;
		NVM_BIN: string;
		MAIL: string;
		DRAWDEFAULT: string;
		npm_node_execpath: string;
		npm_config_engine_strict: string;
		LC_NUMERIC: string;
		OLDPWD: string;
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
