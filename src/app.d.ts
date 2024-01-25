// See https://kit.svelte.dev/docs/types#app

import type { Admin } from "@prisma/client";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      admin: Admin|null|undefined
    }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
