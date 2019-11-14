<script context=module>
  import gql from 'graphql-tag'
  import { query, awaitQueries } from '../../graphql'

  const allTodos = query({
    query: gql`
      query {
        todos {
          id
        }
      }
    `
  })

  export async function preload() {
    return awaitQueries({
      allTodos
    })
  }
</script>

<script>
  import List, {Item, Text} from '@smui/list'
  export let allTodos

  $: todos = $allTodos.data.todos.map(({ id }) => id)
</script>


<List>
  {#each todos as id}
    <a href='/todos/{id}'>
      <Item>
        <Text>Todo: {id}</Text>
      </Item>
    </a>
  {/each}
</List>
