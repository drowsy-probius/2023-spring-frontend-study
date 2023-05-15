modern web frontend -> component 

modern javascript -> vlpt.us


---

# 0508

## [React](react.dev)

UI/View를 위한 라이브러리 (not 프레임워크)

프레임워크 - 제어 역전이 일어나는 것. 주도권이 개발자가 아니라 프레임워크에 있음.

라이브러리 - 개발자가 맘대로 폴더구조 정하고 개발할 수 있음.

컴포넌트 기반 프로그래밍. 선언적으로 UI 조작. how보다는 what

빠른 렌더링, 업데이트, Virtual DOM 

Component 기반 - 재사용성 증가 할 수 있음


1. [Describing the UI](https://react.dev/learn/describing-the-ui)


component: UI building blocks

React lets you combine your markup, CSS, and JavaScript into custom “components”, reusable UI elements for your app. 

React puts interactivity first while still using the same technology: a React component is a JavaScript function that you can sprinkle with markup.

function component 

Components can render other components, but you must never nest their definitions:


ESM module system (import, export)


3. Writing Markup with JSX

JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file.

Each React component is a JavaScript function that may contain some markup that React renders into the browser.

4. JavaScript in JSX with Curly Braces

Sometimes you will want to add a little JavaScript logic or reference a dynamic property inside that markup. In this situation, you can use curly braces in your JSX to open a window to JavaScript.


5. Passing Props to a Component

React components use props to communicate with each other. Every parent component can pass some information to its child components by giving them props.

6. Conditional Rendering

In React, you can conditionally render JSX using JavaScript syntax like if statements, &&, and ? : operators.

분기하는 지점에 따라서 성능이 달라질 수 있는가?


7. Rendering Lists

On this page, you’ll use filter() and map() with React to filter and transform your array of data into an array of components.

key props -> 렌더링 과정 중에서 같은 컴포넌트인지 확인하기 위한 id 값. 

Keys tell React which array item each component corresponds to, so that it can match them up later. This becomes important if your array items can move (e.g. due to sorting), get inserted, or get deleted. A well-chosen key helps React infer what exactly has happened, and make the correct updates to the DOM tree.



8. Keeping Components Pure

전역변수 참조하면 순수하지 못함.

`strict mode`에서는 코드 두번씩 호출됨 

side effect 


While functional programming relies heavily on purity, at some point, somewhere, something has to change. That’s kind of the point of programming! These changes—updating the screen, starting an animation, changing the data—are called side effects. They’re things that happen “on the side”, not during rendering.


## Typescript 

TS - 구조적 타이핑, JS - 덕타이핑

```javascript

const a = {a:1}
const b = {a:1, b:2}

typeof b === typeof a // true in js

typeof b !== typeof b // false in ts
```

[링크](https://yamoo9.gitbook.io/typescript)

타입 - 집합 개념 

전체집합: `unknown`, 공집합: `never`

```typescript
const k = 'asdf' // type: 'asdf'
```

관련 서적: 이펙티브 타입스크립트 


TODO: react.dev의 challenge

# 0510

상호작용과 그에 따른 side effect (좋은거, 변화가 생겨야 그게 상호작용이고 피드백이니까)

## Event on Browser

사용자와의 상호작용과 DOM에 관한 이벤트

Event Handler가 이벤트를 처리

[event bubbling, capturing](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Building_blocks/Events)


```js
event.preventDefault();
event.stopPropagation();
```

`this` 5가지 동작

`1st citizen` 1급객체 




## Adding Interactivity

### Responding to Events

### State: A Component's Memor
관리해야 할 데이터, 시간에 따라 변하는 데이터 

`useState` (cf. `useEffect`)

### Render and Commit

component가 어떻게 표시되는가

리컨실레이션


Trigering -> Rendering -> Committing


render
- initial 될 때 -> root component 호출
- state가 변경될 때 (setState -> trigger -> re-render. update component). 상태가 변해서 trigger된 컴포넌트 함수 호출

VirtualDOM이라서 변경된 일부분만 re-rendering 가능.

commit
- 실제로 DOM 변경 


cf. critical rendering path (브라우저의 렌더링 방식, 또는 painting)



### State as a Snapshot

state는 상태에 따라 변하니까 그 때의 state 

Your component returns a snapshot of the UI with a fresh set of props and event handlers in its JSX, all calculated using the state values from that render!

상태 변경해도 리렌더링 전에는 이전 상태 값을 참조하고 있다. 다음 렌더링 전에는 (렌더링과 렌더링 사이에서는) 변한 상태 값이 반영된다. 

```js
setNumber(number + 1);
setNumber(number + 1);
setNumber(number + 1);
```
스냅샷되어 들어가기 때문에 (number + 1)만 실행됨.


### Queueing a Series of State Updates
React waits until all code in the event handlers has run before processing your state updates. 

```js
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
```
세 줄이 다 실행 된 후에 렌더링 됨.

스냅샷 되어 들어가긴 하는데 렌더링 전에도 값은 내부적으로 변하고 있으니까 이러면 +3이 됨.

입력한 순서대로 상태 변화 큐에 들어가고 순서대로 상태가 변한 뒤에 렌더링이 된다.


```js
setNumber(number + 5);
setNumber(n => n + 1);
// +6

setNumber(n => n + 1);
setNumber(number + 5);
// +5
```


### Updating Objects in State

Treat state as read-only 

In other words, you should treat any JavaScript object that you put into state as read-only.

불변성 (immutation)과 관련


Write concise update logic with Immer 

불변성 도와주는 라이브러리

### Updating Arrays in State

shallow copy할 때 nested 객체인 경우 조심


