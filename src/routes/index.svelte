<script>
  import gql from 'graphql-tag'

	import { goto } from '@sapper/app'

  import Todo from '../components/Todo.svelte'

  import { mutation } from '../graphql'

  const createTodo = mutation({
    mutation: gql`
      mutation createTodo($data: jsonb!) {
        insert_todos(objects: {data:$data}) {
          returning {
            id
          }
        }
      }
    `
  })

  async function save(event) {
    const {
      data: {
        insert_todos: {
          returning: [{ id }]
        }
      }
    } = await createTodo({ data: event.detail })

    goto(`todos/${id}`)
  }
</script>

<main>
  <h1 >Todo app</h1>

  <Todo on:save={save} />
</main>

<style>
  h1 {
    text-align: center;
  }

  main :global(.done) {
    opacity: 0.6;
    text-decoration: line-through;
  }
</style>