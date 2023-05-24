# 0524

## React with API 

REST API

URI + method + 


POST: body

GET: query 


HTTP: application layer protocol 

Socket: 지속적 연결

---

React에서 렌더링 이전에 API호출하려면? 

useCallback: 렌더링마다 재생성되지 않도록 함 

## React Query 

API 응답값이 여러 컴포넌트에 쓰인다면 - 데이터 정합성, 자원 낭비 문제 

API 상태를 전역 상태로 관리하면 해결할 수 있다. redux-saga, mobx flow 확장 기능 이 있었음.

> 상태 관리 라이브러리로 저장해보기 

API를 통해 요청하는 서버에서 들고 있는 값은 조회, 업데이트, 최신화 등이 필요하고 FE에서만 사용되는 상태하고는 특성이 다르다. 

API 응답 값과 엮여있는 코드가 너무 많아 Store가 너무 비대해지고 상태 관리 코드보다 API 통신 코드가 더 많은 경우도 있었음. 

-> React Query, SWR, RTK Query, Redux Query, etc.

상태: 주어진 시간에 대해 시스템을 나타내는 것으로 언제든지 변경될 수 있음. 응용 프로그램에 저장된 데이터 

클라이언트와 별개의 원격의 공간에서 관리 및 유지, fetch과 update에 비동기 API가 필요. 다른사람들과 공유되므로 모르는 사이에 변경될 수 있음. 잠재적인 out of date 가능성 있음. => API 요청 결과값은 일종의 캐시

상태 분류: Client State, Server State. Ownership에 따라 구분 

> React Query 

