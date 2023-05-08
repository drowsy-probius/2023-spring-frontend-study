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


