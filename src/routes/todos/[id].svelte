<script context=module>
  import gql from 'graphql-tag'
  import { query, awaitQueries } from '../../graphql'

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
      todoStore: getTodo(id)
    })
  }
</script>

<script>
  import Todo from '../../components/Todo.svelte'

  export let id
  export let todoStore

  $: todos = $todoStore.data.todos_by_pk.data
</script>


<Todo {todos} />
