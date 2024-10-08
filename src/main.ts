import { log } from '@logger'

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  Deno.env.set('VERSION', '0.0.1')

  const environment = Deno.env.get('ENVIRONMENT')
  const version = Deno.env.get('VERSION')

  log(`Env: ${environment} / Version: ${version}`)
}
