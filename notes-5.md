# 0531

## 주소창 입력부터 렌더링

### 주소창 입력부터 서버 리소스 가져오기

url 입력 - DNS 서치 - TCP 연결 - HTTP 연결 

https://developer.mozilla.org/ko/docs/Learn/Getting_started_with_the_web/How_the_Web_works 

https://aws-hyoh.tistory.com/entry/TCPIP-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0

DNS 쿼리 

브라우저 캐시 - OS 캐시 (시스템 콜) - 라우터 캐시 - ISP 캐시 - DNS 서버 쿼리 

https://velog.io/@khy226/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%97%90-url%EC%9D%84-%EC%9E%85%EB%A0%A5%ED%95%98%EB%A9%B4-%EC%96%B4%EB%96%A4%EC%9D%BC%EC%9D%B4-%EB%B2%8C%EC%96%B4%EC%A7%88%EA%B9%8C


https://velog.io/@tnehd1998/주소창에-www.google.com을-입력했을-때-일어나는-과정

https://d2.naver.com/helloworld/59361

https://d2.naver.com/helloworld/5237120


### 브라우저 렌더링

<b>Critical Rendering Path</b>

```
Network ( -> Byte files)

HTML -> DOM | CSS -> CSSOM | JavaScript

Render Tree (보이는 노드 선별. display: none같은거는 제외 (visibility: none은 렌더링 됨))

Layout (or Reflow)

Paint (레이어 만드는 것)

Composite (레이어 합치기)

```


### Reflow, Repaint

Critical Rendering Path과 관련해서 최적화 

Reflow: Layout, Paint, Composite 포함한 모든 렌더링 과정 발생

Repaoint: Layout 과정 생략 후 바로 Paint만 실행되는 경우 

불필요한 reflow -> jank 현상 (버벅이는 것): Reflow를 일으키지 않는 CSS 속성같은거 있음. 

웹 성능 최적화: 리소스 최적화 혹은 렌더링 최적화



## Javascript 클로저 & 호이스팅 

https://meetup.nhncloud.com/posts/86

https://ui.toast.com/weekly-pick/ko_20191014/

JavaScript는 ESCMAScript 언어 명세의 구현체임. 거기 명세에 실행코드와 실행컨텍스트 부분에서 스코프에 관한 동작 방식을 확인할 수 있음. 

`var`: function scope, `let, const`: block scope. 

해당 스코프 사라지면 변수도 힙 영역 메모리에서 사라진다. 


Temporal Dead Zone (TDZ)의 영향을 받는 키워드 `let`, `const`, `class`;

그러니까 선언 전에 참조하면 `ReferenceError` 뱉음. (호이스팅은 됨)

TDZ에 영향을 받지 않는 것. `var`, `function`, `import`;



https://dummyjson.com/ 

https://jsonplaceholder.typicode.com/guide/

https://mswjs.io/


# 0605 

## React ref

https://programming119.tistory.com/265 

https://programming119.tistory.com/266 


## React rendering 

https://velog.io/@superlipbalm/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior

props, state, parent component에 변경이 발생하면 `React`의  re-rendering이 발생함.


Trigger -> Render -> Commit 

강제 렌더링 방법: state 변경, 노드의 key 변경 등. 리컨실레이션  


https://hewonjeong.github.io/deep-dive-how-do-react-hooks-really-work-ko/
