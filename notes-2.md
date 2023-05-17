# 0515

## Component Lifecycle

```
Automata 꼴로 생김

초기화
Initialization

화면에 등장 (렌더링)
Mounting

부모 컴포넌트 리렌더링. State 변경과 같은 업데이트
Updating

화면 (뷰포트 말하는거 아님) 에서 제거
Unmounting
```

## React Hooks

private, isolated

Hooks let you use different React features from your components. 

React Function Component 내에서만 사용되고 최상단에서만 사용. 
> 조건문, 반복문 등의 중첩된 함수 내에서 hook를 호출하면 안된다. return 구문 위에서 선언되어야 한다.

```js
if (predicate) {
  // 이렇게 하면 안된다.
  const [a, setA] = useState();
}
```

Function Component에서 Class Component에서 사용할 수 있었던 상태나 생명 주기 메소드를 사용할 수 있게 해준 도구.

### useState 

### [useEffect](https://ko.legacy.reactjs.org/docs/hooks-effect.html)

렌더링과 관련된 시점에 특정 작업을 수행할 수 있게 해주는 hook. 

side effect를 쉽게 다룰 수 있는 도구 

`useEffect(setup, dependencies?)`

`setup`함수의 return은 unmount할 때 수행할 함수 (clean-up). early-return과는 scope가 다르므로 다른 동작을 함
```js
useEffect(() => {
  // asdf

  if(predicate) return; // early return

  return () => {
    // 예를 들면 구독함수 제거
  }; // clean up
  
})
```

socket 같은거 연결할 때에도 이거 사용 


useEffect가 하는 일은 무엇일까요? useEffect Hook을 이용하여 우리는 React에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야하는 지를 말합니다.


```js
// cf. closure

function mr () {
  let a = 0; // heap memory

  return () => {
    a = a+1;
    return a;
  };
}

const b = mr();

console.log(b()); // 1
console.log(b()); // 2

```

```js
useEffect(() => {}); // (re) render 마다 실행
useEffect(() => {}, []); // Mount될 때만 실행
useEffect(() => {}, [state.props.id]); // state.props.id가 업데이트될 때만 실행

// cleanup은 dependency 관계 없이 언마운트될 때 모두 실행됨.
```


### useRef
최적화 관련인데 잘 안쓰는게 나음. render 사이에 값을 가짐.

렌더링에 필요하지 않는 것 가리킴. 수정한다고 해도 render를 trigger하지 않음.

DOM을 가리킨다면 mount된 이후에 값이 존재함.

### useMemo
re-render 사이에 계산한 값을 캐시하는 것.

### useCallback 
re-render 사이에 function definition 캐시하는 것. 거의 필요 없음

### useReducer
reducer...

### useContext 
react 전체를 관통하는 상태(global state)를 원할 때 사용. eg. 로그인 정보

내부적으로 Context API를 사용함.

### useLayoutEffect
useEffect보다 먼저 browser가 screen repaint 전에 호출되는 것. 

[critical rendering path](https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path)


### useId
임의의 값을 부여해야 할 때. crypto 대신에 고유한 id 만들기에 좋음

### [기타](https://react.dev/reference/react)


## Hooks with Component LifeCycle

Mounting

function -> useMemo -> return -> || -> React updates DOM and refs -> useEffect, useLayoutEffect -> cleanup

Updating

useState, useReducer, useContext -> useCallback -> || -> React updates DOM and refs -> useEffect, useLayoutEffect -> cleanup


## Eslint, Prettier

Eslint - linter: 일관성 있는 방식으로 코드 사용

Pretter - formater: 코드 구현방식이 아니라 코드 포맷팅



CSR vs. SSR vs. SSG vs. ISR


# 0517

[State Management](https://react.dev/learn/managing-state)


## [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)

### declarative UI programming 


1. Identify your component’s different visual states

2. Determine what triggers those state changes

3. Represent the state in memory using useState

4. Remove any non-essential state variables

5. Connect the event handlers to set the state

## [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)

state structure를 어떻게 고려해야하는지 



1. Group related state. If you always update two or more state variables at the same time, consider merging them into a single state variable.

2. Avoid contradictions in state. When the state is structured in a way that several pieces of state may contradict and “disagree” with each other, you leave room for mistakes. Try to avoid this.

3. Avoid redundant state. If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state.

4. Avoid duplication in state. When the same data is duplicated between multiple state variables, or within nested objects, it is difficult to keep them in sync. Reduce duplication when you can.

Single source of truth principle



5. Avoid deeply nested state. Deeply hierarchical state is not very convenient to update. When possible, prefer to structure state in a flat way.


## [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)

1. Lifting up

상태 관리를 부모에게 올리기 


A single source of truth for each state

data는 하나의 source에서 관리하고 해당 source에서만 참조해야 한다. 

## [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)

![img](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_dom_tree.dark.png&w=1920&q=75)

unmount되면 state는 초기화된다. 

그렇지만 같은 위치에 같은 컴포넌트를 (props는 변경해도 됨) -> UI 트리가 유지되는 상태로 렌더링할 때는 상태가 유지된다. 

Same component at the same position preserves state 



Option 2: Resetting state with a key

비권장인데 css로 재 렌더링해야하는 경우에는 key 변경하면 다른 컴포넌트로 인식하여 상태가 초기화됨.

리액트 컴포넌트는 key를 id로 사용함.

## Global State Management 

### Why

Props Drilling 문제. 

중간 컴포넌트에는 props 전달하기 위해 자신에서 쓰지 않는 props를 인자로 받아야 하는 문제가 있음.

컴포넌트의 독립성 / 재사용성과 결합도 측면에서는 좋지 않음. 결합도는 낮아야 좋음.


-> 1. 전역 상태 관리 혹은 2. Compound Component 패턴 같은 제어의 역전 (Inversion of Control) 활용


State Management: state와 usage 사이의 통신을 관리하는 방법 

Global State Management: 개별 컴포넌트의 상태가 아닌 여러 컴포넌트 간 공유되는 전역 상태에 대한 관리

eg. 로그인 상태 관리 


### How

- React Context 활용: useContext, useReducer 

- 외부 라이브러리 활용: Redux, Mobx, Zustand, Jotai, Recoil, Valtio, etc. (활용해야 할 상태가 많은 경우)


### Redux

- Flux 패턴에서 아이디어를 얻어 개발한 전역 상태 관리 도구 

- 요즘은 잘 안쓰고 쓴다면 Redux Toolkit을 이용해 사용 

```
Single Source of Truth 
State is read-only
Changes are made with pure functions (reducer는 순수함수이어야 함)
```

### Redux Flow 

```
Action -> Dispatcher -> Store -> View
            ^                     |
            |--------Action--------

```

action: action과 state를 받아서 어떤 state를 리턴할 지 정의

dispatcher: reducer 실행

store: 값이 저장되는 곳 

toolkit 사용한다면 slice에 기본값, reducer 정의 


### Redux 이후 

과한 boilerplate, 너무 복잡함

Mobx, Atom 개념 사용하는 Zustand, Jotai 라이브러리 등장 

Recoilr타은 훅을 사용한 상태관리도 등장

### Zustand 

간단함

Redux와 비슷한 Flux 패턴 사용 

inner 미들웨어로 객체 업데이트가 편함. persist를 들고 있어 storage와도 연동 가능 


[테오의 프론트엔드](https://yozm.wishket.com/magazine/list/search/?q=%ED%85%8C%EC%98%A4%EC%9D%98%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C)

[프론트엔드 트렌드 변천사](https://yozm.wishket.com/magazine/detail/1663/)



---

높은 응집도 낮은 결합도 캡슐화


