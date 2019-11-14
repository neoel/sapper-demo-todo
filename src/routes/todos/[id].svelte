<script context=module>
  import gql from 'graphql-tag'
  import { query, mutation, awaitQueries } from '../../graphql'

  const getTodo = id => query({
    query: gql`
      query getTodo($id: String!) {
        todos_by_pk(id:$id) {
          data
        }
      }
    `,
    variables: { id }
  })

  export async function preload(page) {
    const { id } = page.params

    return awaitQueries({
      id,
      todoStore: getTodo(id)
    })
  }
</script>

<script>

  import Todo from '../../components/Todo.svelte'

  export let id
  export let todoStore

  const updateTodo = mutation({
    mutation: gql`
      mutation updateTodo($id: String!, $data: jsonb!) {
        update_todos(where:{id:{_eq:$id}}, _set:{data:$data}) {
          affected_rows
        }
      }
    `
  })

  $: todos = $todoStore.data.todos_by_pk.data
</script>


<Todo
  {todos}
  on:save={({ detail: data }) => updateTodo({ id, data})}
/>
