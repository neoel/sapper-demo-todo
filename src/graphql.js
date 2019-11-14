import { readable } from 'svelte/store'
import ApolloClient from 'apollo-boost'
import fetchPonyfill from 'fetch-ponyfill'

const { fetch } = process.browser ? window : fetchPonyfill();

const client = new ApolloClient({
  fetch,
  uri: process.browser
    ? 'http://todo-hasura-1.todo.dock/v1/graphql'
    : 'http://hasura/v1/graphql'
});


class Query {
  constructor(options) {
    this.store = readable(
      { loading: true },
      set => {
        const subscription = client.watchQuery(options)
          .subscribe(
            ({ loading, data }) => set({ loading, data }),
            error => set({ loading: false, error })
          )
        return () => subscription.unsubscribe()
      }, 
    )
  }

  subscribe(fn) {
    return this.store.subscribe(fn)
  }
}


export function query (options) {
  return new Query(options)
}

export function mutation({ beforeMutation, ...options }) {
  return async variables => {
    try {
      return client.mutate({
        ...options,
        variables: {
          ...options.variables,
          ...(beforeMutation ? await beforeMutation() : {}),
          ...variables
        }
      })
    } catch (e) {
      console.error("Error in mutation:", e)
    }
  }
}

export async function awaitQueries(stores) {
  // Receives a map of possible stores, awaits all the stores

  await Promise.all(
    Object.values(stores)
      .map(store => {
        if (store instanceof Query) {
          let unsub
          return new Promise((resolve, reject) => {
            unsub = store.subscribe(({ loading }) => {
              if ((loading === undefined) || !loading) {
                resolve()
              }
            })
          }).then(unsub)
        }
      })
  )

  return stores

}