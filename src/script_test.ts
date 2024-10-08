import { assertEquals, assertRejects } from '@std/assert'
import { expect } from '@std/expect'
import { assertSpyCall, spy } from '@std/testing/mock'

import { run } from './script.ts'

Deno.test({
  name: '[assert] it should throw if file path is missing from env',
  fn: async () => {
    // Arrange
    Deno.env.set('ID_FILE_PATH', '')

    await assertRejects(run)
  },
})

Deno.test({
  name: '[expect] it should throw if file path is missing from env',
  fn: async () => {
    // Arrange
    Deno.env.set('ID_FILE_PATH', '')

    await expect(run()).rejects.toThrow()
  },
})

Deno.test({
  name: 'it should run the script',
  fn: async () => {
    // Arrange
    Deno.env.set('ID_FILE_PATH', './id.txt')

    const spyRead = spy(Deno, 'readFile')

    // Act
    const res = await run()

    // Assert
    assertSpyCall(spyRead, 0, { args: ['./id.txt'] })
    assertEquals(res, {
      id: 11,
      userId: 1,
      title: 'vero rerum temporibus dolor',
      completed: true,
    })
  },
})
