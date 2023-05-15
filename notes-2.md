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

