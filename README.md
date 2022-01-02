# Click >> [VOYAGER](https://www.voyager.or.kr/)
<br/>

> ## 기획 의도
저희는 사람들이 mbti에 열광하는 원인이 '나와 타인을 알고, 이해하고 싶은 욕구'라고 생각했습니다. <br/>
이 영감에서 출발한 저희는 **'나'에대해 질문하며 나 자신을 알아가고 기록해나가는 프로젝트** 진행하기로 마음 먹었습니다.<br/>
관종이라는 표현에 민감한 지금의 시대를 반영하여, 아무도 없는 우주에서 자기만의 세상을 펼치길 바라는 마음으로 **우주**를 컨셉으로 잡았습니다.

<img width="567" alt="스크린샷 2022-01-02 오후 3 59 03" src="https://user-images.githubusercontent.com/85235063/147868789-d557b625-7d35-4e11-bd05-319ee33b9350.png">

![KakaoTalk_Photo_2022-01-02-16-06-17](https://user-images.githubusercontent.com/85235063/147868804-536056d1-11ac-46e8-946d-f6ab83fc26ca.jpeg)

---------
> ## 사용된 기술 및 배포 구조
<img width="567" alt="스크린샷 2022-01-02 오후 3 46 57" src="https://user-images.githubusercontent.com/85235063/147869226-918a2ea0-bd13-4867-934e-299bd439fb84.png">

<img width="709" alt="스크린샷 2022-01-02 오후 4 39 09" src="https://user-images.githubusercontent.com/85235063/147869337-8c007418-3155-4e8c-b2e4-750f21976409.png">

--------
> ## 메인 페이지
<img width="709" alt="스크린샷 2022-01-02 오후 5 06 54" src="https://user-images.githubusercontent.com/85235063/147869893-79eec177-7797-49d8-8de3-b5ce11042f81.png">

<br/>

> ## 주요 기술
1. [로그인 및 개인 프로필](https://github.com/m1naworld/VOYAGER/blob/master/README.md#%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%B0%8F-%EA%B0%9C%EC%9D%B8-%ED%94%84%EB%A1%9C%ED%95%84)
2. [오늘 하루의 감정을 색깔로](https://github.com/m1naworld/VOYAGER/blob/master/README.md#%EC%98%A4%EB%8A%98-%ED%95%98%EB%A3%A8%EC%9D%98-%EA%B0%90%EC%A0%95%EC%9D%84-%EC%83%89%EA%B9%94%EB%A1%9C) 
3. [매일 3가지 질문을 통해 나를 알아가기](https://github.com/m1naworld/VOYAGER/blob/master/README.md#%EB%A7%A4%EC%9D%BC-3%EA%B0%80%EC%A7%80-%EC%A7%88%EB%AC%B8%EC%9D%84-%ED%86%B5%ED%95%B4-%EB%82%98%EB%A5%BC-%EC%95%8C%EC%95%84%EA%B0%80%EA%B8%B0)
4. 피드
5. [캘린더](https://github.com/m1naworld/VOYAGER/blob/master/README.md#%EC%BA%98%EB%A6%B0%EB%8D%94)

<br/>

> ### 로그인 및 개인 프로필
> 회원가입 및 로컬로그인 & 소셜로그인, 이메일 찾기 및 비밀번호 찾기, 프로필 변경, 닉네임 변경, 개인 정보 확인, 비밀번호 변경, 회원탈퇴
<img width="709" alt="스크린샷 2022-01-02 오후 4 43 53" src="https://user-images.githubusercontent.com/85235063/147869926-d36a0f57-b8f1-47dd-9ca7-f220efceb9d7.png">
<img width="709" alt="스크린샷 2022-01-02 오후 5 19 39" src="https://user-images.githubusercontent.com/85235063/147870159-dcaa9d4f-471f-472c-827f-bdc2e0f644cd.png">
<img width="709" alt="스크린샷 2022-01-02 오후 5 18 18" src="https://user-images.githubusercontent.com/85235063/147870162-a53f2245-d8f9-47c7-999f-ffb7be9aef00.png">

<br/>

> ### 오늘 하루의 감정을 색깔로
> 4가지 감정 * 각 감정별 3가지 질문 -> 총 12가지 질문을 통해 각 감정별 점수를 통해 색깔을 뽑아내는 알고리즘 구현 
<img width="709" alt="스크린샷 2022-01-02 오후 3 47 25" src="https://user-images.githubusercontent.com/85235063/147870036-cb6a1fcd-691a-41de-b58c-03cd7b8dde8d.png">
<img width="709" alt="스크린샷 2022-01-02 오후 5 12 29" src="https://user-images.githubusercontent.com/85235063/147869994-5d6fa9b8-b573-4924-a351-f0e908a8a190.png">
<img width="709" alt="스크린샷 2022-01-02 오후 5 12 54" src="https://user-images.githubusercontent.com/85235063/147869996-1f7b2b03-fa6e-4130-8f39-d7831827cac5.png">

> 오늘의 감정색 결과에 따라 메인 페이지 행성색 또한 변하도록 구현 

<img width="1518" alt="스크린샷 2022-01-02 오후 5 19 29" src="https://user-images.githubusercontent.com/85235063/147870301-6be4b646-dfbb-4e6c-ac6b-92d2bf0388b6.png">

<br/>

> ### 매일 3가지 질문을 통해 나를 알아가기 
> 매일 밤 12시를 기준으로 모든 유저마다 같은 질문이 나오도록 구현, 피드에 답변이 노출되므로 자기자신을 공개할지 비공개로할지 선택하도록 구현 

<img width="709" alt="스크린샷 2022-01-02 오후 5 36 30" src="https://user-images.githubusercontent.com/85235063/147870516-57d0b1b0-fa41-4439-844c-e62ea2f5ec4d.png">
<img width="709" alt="스크린샷 2022-01-02 오후 5 36 48" src="https://user-images.githubusercontent.com/85235063/147870521-18b25189-d16a-4573-820f-a43c518dd4bf.png">

<br/>

> ### 피드 
> 좋아요 기능 및 게시글은 좋아요 순으로 정렬되도록 구현

<br/>

> ### 캘린더
> 감정색 및 주관식 질문&답변 기록, 일기 쓰기, 수정, 삭제 기능
<img width="709" alt="스크린샷 2022-01-02 오후 5 46 21" src="https://user-images.githubusercontent.com/85235063/147871049-68f7052d-7a56-4a25-afc8-48161ff434c1.png">
<img width="709" alt="스크린샷 2022-01-02 오후 5 47 41" src="https://user-images.githubusercontent.com/85235063/147871082-3c822aa7-556f-40cb-b03c-3aaddd3792cc.png">
<img width="709" alt="스크린샷 2022-01-02 오후 5 48 41" src="https://user-images.githubusercontent.com/85235063/147871084-3bc6b643-bceb-431e-acba-f7aa9f3ffbc5.png">


--------

> ## 개발 및 기획
- 엽용현 [Raymond](https://github.com/raymondanythings)
- 송민아 [m1naworld](https://github.com/m1naworld)
- 김도현 [dovard](https://github.com/dovard)
- 이경덕 [Kyung-Deok](https://github.com/Kyung-Deok)
- 김태헌 [yeedacoding](https://github.com/yeedacoding)
- 최용기 [x86osx](https://github.com/x86osx)
