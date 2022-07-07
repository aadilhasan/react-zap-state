# react-zap-state

Simple react utility to improve react's local-state experience

## Install

```bash
npm install --save react-zap-state
```

or

```bash
yarn add react-zap-state
```

## Features

- `react-zap-state` uses state updation approach from class based component.
- It memoization to the component by default.
- It keeps the state outside the component so the code looks more neat and easy to read.
- For older version (< v18) of react `react-zap-state` provides batched state updates.

### Why

`react-zap-state`  if trying to help with some of the issues with react functional component -

- Most of the react component need memoization.
- A lot of components have multiple states, which makes it hard to manage them and code becomes hard to read and understand.
- Sometimes there are things which needs to be done only after the state is updated, currently useEffect is used to watch the changes in state (developer also need to make sure to handle the intital state in useEffect, which creates more boilerplate code).

## Exmples

### Basic

#### Javascript

```js
import { zap } from  "react-zap-state";

const appState = {
    count: 1
};

function App({state}) {
    const updateCount = () => {
        state.set({count: state.count+1}, () => {
            console.log("state updated");
        });
    };

    return (
        <button onClick={updateCount}> count: {state.count} </button>
    );
};

export default zap(App, appState);
```

#### Typescript

```ts
import { zap, ZapProps } from  "react-zap-state";

const appState = {
    count: 1
};
type AppProps = ZapProps<typeof appState> & {
    // add props here
}
function App({state}: AppProps) {
    const updateCount = () => {
        state.set({count: state.count+1}, () => {
            console.log("state updated");
        });
    };

    return (
        <button onClick={updateCount}> count: {state.count} </button>
    );
};

export default zap<AppProps>(App, appState);
```

### Derive state from props

```js
    export default zap(Component, (props) => {
        // return state
        return {
            ...
        }
    }); 
```
