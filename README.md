# my new portfolio page

> 새로 작성하는 포트폴리오 페이지입니다.



- 배포된 페이지 구경하러가기
  - https://hangeol-chang.github.io/me



## About this Repository

이 프로젝트는 제가 여태까지 해온 것들, 진행한 프로젝트들, 앞으로 진행할 프로젝트, 계획 등을 정리할 포트폴리오 repo입니다.

제 프로젝트들을 가장 제 방식대로 표헌할 수 있는 형태로 제작하기 위해 제작되었습니다.

즐겁게 구경해주세요.





## Rules

### Branch Rule

- 브랜치 이름은 기능 FEAT, DOCS, REFACT 등의 범주로 시작.
- -로 띄어쓰기를 대신하고, 뒤에는 기능명, 수정 doc 명 등을 작성.
  - ex
    - DOCS-README
    - FEAT-HEADER-FOOTER



- available tag list
  - FEAT
  - DOCS
  - CLEANUP



### Commit Rule

- 대괄호 안에 작업 tag 달기
- tag 뒤에 띄어쓰기를 한 칸 하고, 



- master 브랜치는 커밋을 직접 올리지 않고, 다른 브랜치의 작업을 merge하는 것만 가능



### Deploy Rule

- 마스터 브랜치로 병합 후 배포하는 것을 원칙으로 함.





### Naming Rule

- 폴더
  - 첫자만 대문자. (root dir에 있는 폴더는 전부 소문자 사용)
- component 
  - 파일명은 전부 소문자
  - function명은 파스칼 케이스를 사용.
- 변수
  - 변수는 카멜케이스 사용.
    - 변수명은 최대한 풀어서 사용하며,  줄여 표현할 경우 주석으로 description을 달아놓을 것.



### Props Rule

- 3개 이상 props로 전달되는 값은 recoil을 사용하여 전역으로 저장할 것.



### Style rule

- Client Side Render를 할 쪽에서는 Styled-Components를 최대한 활용.



## Structure

- components
  - Common : 공용으로 사용할 component들 (image, link, button 등)
  - layout : header, footer
- public : 사진, Component별로 폴더로 구분
- src
  - app : 메인 폴더

- states
  - recoil 관리 폴더
- wrapper : 각종 wrapper(필요하다면)