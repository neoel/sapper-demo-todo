<script>
  import Button, {Label} from '@smui/button';
  import Card, { Content } from '@smui/card';
  import List, {Item, Text} from '@smui/list';
  import Checkbox from '@smui/checkbox';
  import Textfield from '@smui/textfield';

  let newTodo = ''
  let todos = []
</script>

<main>
  <h1 >Todo app</h1>
  <Card style='min-width: 320px;'>
    <Content>
      <form on:submit|preventDefault={() => {
          todos = [...todos, { todo: newTodo, done: false }]
          newTodo = ''
        }}>
        <Textfield bind:value={newTodo} label="Todo:" />
        <Button variant=raised>
          Add
        </Button>
      </form>
    </Content>

    {#if todos.length}
      <Content component={List}>
        {#each todos as { todo, done }}
          <Item class={done ? 'done' : ''}>
            <Checkbox bind:checked={done} />
            <Text>{todo}</Text>
          </Item>
        {/each}
      </Content>
    {/if}
  </Card>
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