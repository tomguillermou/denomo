import { z } from 'npm:zod'

const todoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  completed: z.boolean(),
})

type Todo = z.infer<typeof todoSchema>

export async function run(): Promise<Todo> {
  const filePath = Deno.env.get('ID_FILE_PATH')

  if (!filePath) {
    throw new Error('File path is missing')
  }

  const decoder = new TextDecoder('utf-8')
  const data = await Deno.readFile(filePath)
  const id = decoder.decode(data)

  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  const json = await res.json()

  const todo = todoSchema.parse(json)

  return todo
}
