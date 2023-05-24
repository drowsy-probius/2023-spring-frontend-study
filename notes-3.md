# 0522

비동기 시스템에서는 추가적인 스레드 시작

첫번째 스레드에서는 첫번째 API 요청

두번째 스레드는 첫번째 API 끝날 때까지 기다리지 않고 두번째 API 요청 수행 

두 API 요청이 동시에 필요한 코드가 있다면 두 스레드가 서로 결과를 가져올 때까지 기다림. 
두 스레드 다 결과를 가져왔을 때 결과를 합치기 위해 재동기화 수행 


자바스크립트는 싱글스레드 언어. 자바스크립트의 하나의 메인 스레드와 하나의 콜스택을 가짐. 근데 브라우저는 어케햇냐

nodejs에서는 메인 스레드인 이벤트 스레드가 싱글 스레드  < 찾아보기 


---


프로세스: 메모리에 올라와있는 프로그램 중 실제 실행 중인 프로그램

스레드: cpu를 구성하는 기본 단위 (hw) / 프로세스 내에서 실제로 작업을 수행하는 주체 (sw) => 프로세스가 할당받은 자원을 이용하는 실행의 단위 

프로세스 내에서 실행되는 흐름의 단위. 프로세스에 따라 1개 혹은 그 이상 


싱글스레드: 하나의 작업을 하나의 스레드가 다 하는 것

멀티스레드: cpu의 최대 활용을 위해 하나의 작업을 여러개의 스레드로 실행하는 것. context switching을 통해 여러 thread를 concurrent하게 실행 

하나 이상의 명령어 세트를 일련의 과정을 통해...

CPU만 갈구는 단순 계산 작업이면 싱글스레드가 빠름(context switching 부하있음). IO가 포함된 작업이면 멀티스레드가 이점

single processor: thread concurrent 실행 (cpu 시분할 해서 context switching하면서 왔다갔다)

multi processor: thread parallel 실행 (다른 코어, 프로세스, 컴퓨터에서 동시에 실행)


멀티스레드 기반의 서버는 보통 클라이언트의 요청마다 스레드 발생시킴. 메모리 자원이 사용됨.

리소스 문제가 있으니 서버 업그레이드, 로드밸런싱 등의 분산처리 방법 사용

멀티스레드면 스레드 간의 공유자원 접근할 때 신중해야함. dead lock, starvation, race condition


비동기 != 멀티스레딩. 

멀티스레딩: 여러 다른 함수들을 동시에 실행

비동기 여러 작업을 non blocking으로 실행

멀티스레딩은 작업자(thread), 비동기는 작업 (task)에 대한 것

--- 

일단 비동기는 프로그램의 흐름을 방해하지 않음.

자바스크립트의 하나의 메인 스레드와 하나의 콜스택을 가짐. 

비동기 프로그램은 느린 코드를 실행하고 나중에 콜백 수행함.

싱글 스레드 언어이므로 구현 난이도가 낮음. dead lock 등 문제 고려하지 않아도 됨 

JS는 어떻게 비동기를 구현했나? JS는 싱글 스레드 언어라도 JS의 런타임(브라우저 V8엔진, nodejs, ...)은 멀티스레드임.

Chrome V8엔진 기준으로 설명-

```
브라우저 내에 이렇게 되어있음

JS Engine                      Web API

Heap    |  Call Stack  -->    API  |  AJAX 등    <---> thread pool (런타임이 멀티스레드니까)
objects | functions


      ^                          |
      |                          v
      Event Loop    <----   Callback Queue
```




코드가 call stack에 쌓이고 stack 형태로 일 처리 

비동기면 web api 호출되고 작업이 완료되면 api는 비동기함수의 콜백함수를 callback queue에 밀어넣음


자바스크립트에는 heap, call stack 1개씩 존재함. 

### heap: 변수, 객체 메모리 할당에 사용되는 비정형 메모리

### call stack: js에서 수행할 함수가 순차적으로(동기적으로)실행될 때 쌓이는 곳. 한 번에 1개의 일만 수행.

한 줄 스택에 넣고 한 줄 실행 끝나면 스택에서 꺼냄. 

Web API를 사용하는 코드면 Web API에 넘기고 스택에서 꺼냄.


### Web API: JS 런타임 환경에 존재하는 별도의 API. JS 엔진 밖에 존재함. FE에서는 웹브라우저가 지원. 

웹 브라우저의 Web API는 DOM 이벤트, AJAX, setTimeout 등의 비동기 작업을 수행할 수 있는 인터페이스 지원 

각 Web API작업은 하나의 스레드에 할당되는 것인가?

### Web API는 작동이 완료되면 Callback을 callback queue에 푸시. 비동기 작업 수행하는 주체 

### Callback Queue: WebApi 결과값을 쌓아두는 Queue. 콜백 함수 또는 이벤트 핸들러가 일시적으로 보관되는 영역
```
Task Queue | Microtask Queue | Animation Frames
의 세가지 큐로 구성되어있음
```

task queue: setTimeout, 이벤트 함수

microtask queue: promise, async/await, process.nextTick, object.observe, mutationObsrever

animation frames: requestAnimationFrame 및 브러우저 렌더링과 관련된 작업 (리액트 최적화에 사용됨)


### Event Loop

call stack이 비어지면 callback queue에 있는 callback을 call stack에 넣어주는 역할 

16ms정도가 1 tick 



---

callback, promise, async/await, setTimeout, generator,

비동기에서의 순차처리

### callback 

callback hell, callback 사이의 로직 변경하기 어려움

근데 내가 맘대로 cb 정의해도 비동기로 동작하나? 아니면 비동기로 동작하고 cb받는 함수 종류가 따로 있는건가?
근데 내가 그런 함수를 정의해야 할 필요가 있나? 

promise 어떻게 구현되었는지 확인해보는 것도 좋을 듯

### promise

JS에서 비동기 조작의 최종 완료나 실패를 표현해주는 *객체*

pending -> settled (fulfilled or rejected)

`new Promise`내에서 `return resolve`해도 됨? 거기서 코드 끝나고 resolve되나? 

resolve나 reject 실행 안하면 어케됨? `return undefined`겠지 계속 pending 상태임.

근데 `.catch(_ => console.log(1)).then(_ => console.log(2))`는 1, 2 둘 다 출력됨

promise의 리턴은 promise 또는 값 가능 => promise chaining 

### async/await 

yield, generator에서 발전된 개념

근데 Promise 방식 사용. Promise의 syntatic sugar 

`await` 오른쪽에는 Promise 객체 사용 (근데 Promise는 Promise나 값을 반환 가능하니까 상수 넣어도 가능)

await는 코드 순차적으로 실행됨. 그래서 병렬적으로 수행하려면 `Promise.all`할 수 있음. 

리액트에서 사용한다면 `React Query`라이브버리 같은 좋은 것이 있다고 함.


try...catch 컴파일러 최적화 못하는 이슈 있음. 그래도 편함.






