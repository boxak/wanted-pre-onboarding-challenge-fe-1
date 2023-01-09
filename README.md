# 처음 만드는 To do List



### 간략한 제 소개

------------------------------------------

- 현재 해운, 항만 솔루션을 제공하는 IT 회사에 재직 중.
- 본래 Java, Spring Framework를 주로 개발했으나 고객이 직접 사용하는 단말기 화면을 React로 제작하면서 프론트엔드 기술에 관심이 생겼습니다. 서버 API 개발보다는 눈에 보이는 UI를 개발하는 것이 더 적성에 맞다고 느껴 다시 신입의 자세로 프론트엔드 기술을 공부하고 있습니다.



### 제가 만든 To do List 소개

-------------------------------------------

##### 구성

- 회원가입, 로그인, 로그아웃
- Todo List CRUD



##### 사용한 기술, 라이브러리

- React
- axios : Rest API 요청으로 데이터 요청 및 수정에 사용
- react-router-dom : Login, Log out, Sign Up 버튼 클릭시 페이지 이동하도록 하는데 사용
- react-dom : createPortal을 통해 새로운 To-do 내용을 입력하는 모달 창을 구현하는 데 사용



##### 프로젝트 구조

- Auth 부분 구조

![image-20230107104939291](https://user-images.githubusercontent.com/38724041/211310397-6ea3e8f7-3ca4-4aa4-adde-475e1b3b941f.png)

- Todo List 구조

![image-20230107105230034](https://user-images.githubusercontent.com/38724041/211310408-f066787d-566f-4501-addd-d17390b784e0.png)

Todo 라는 상위 컴포넌트와 TodoList, TodoDetail, CreateTodoModal 의 하위 컴포넌트끼리 props로 데이터를 주고받도록 설계하였습니다.



##### 페이지 실행

```
> npm install

> npm start # http://localhost:3000
```





----------------------------------------------

#### 프로젝트하며 어려웠던 점

- Modal 창을 구현하는 것이 어려웠습니다. 다행히 인터넷 검색을 통해 createPortal 기능을 사용하여 모달 창을 관리하도록 구현하는 방법이 있어 그것을 참고하였습니다.
- 기존에는 클래스형 컴포넌트로 컴포넌트 생성 주기를 관리하는 방법만 알고 있었기에 함수형 컴포넌트를 사용하는 것이 익숙하지 않아 어려웠습니다. 그것 외에도 클래스형 컴포넌트와 문법같은 부분이 다른 것들이 많아 어렵게 느껴졌습니다.
