<script>
  import { createEventDispatcher } from 'svelte';

  import Button, {Label} from '@smui/button';
  import Card, { Content } from '@smui/card';
  import List, {Item, Text} from '@smui/list';
  import Checkbox from '@smui/checkbox';
  import Textfield from '@smui/textfield';

  let newTodo = ''
  export let todos = []

  const dispatch = createEventDispatcher();
</script>

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

  <Button
    disabled={!todos.length}
    variant=raised
    on:click={() => dispatch('save', todos)}
  >Save todo list</Button>
</Card>