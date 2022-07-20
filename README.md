# MyWorld
> 2022 Summer MadCamp Week3 Class 2

## 1. Teammates ##

* 부산대학교 정보컴퓨터공학부 [김아나스타시야](https://github.com/anista13)
* KAIST 전산학부 20학번 [방준형](https://github.com/jazzdosa)
* KAIST 전산학부 20학번 [서재덕](https://github.com/losif63)

***

## 2. Development Info ##

* Language: HTML, CSS, JAVASCRIPT
* Backend: Node.js + express
* Database: Firebase

***

## 3. 웹페이지 정보 ##

* MyWorld은 자신만의 방을 꾸미고 게시판을 이용하여 다른 사람들과 교류할 수 있는 가벼운 SNS 플랫폼입니다.
* 닉네임, 직업 등 자신에 관한 정보와 상태메세지를 편집할 수 있습니다.
* 자신, 혹은 타인의 프로필의 게시판에 글을 남기는 등의 활동을 할 수 있습니다.
* 활동을 통해 얻은 '코인'이라는 재화를 이용하여 새로운 방을 뽑을 수 있습니다.
* HTTPS를 이용하여 안전하게 사용자들의 정보를 보호합니다.

***

## 4. 메인 페이지 ##

메인 페이지 화면               |
:-------------------------:|
<img width="1511" alt="Screen Shot 2022-07-19 at 8 39 25 PM" src="https://user-images.githubusercontent.com/77673334/179741748-55c3ab1b-b658-44d7-a294-3bda9c665450.png">

* 본 웹사이트는 HTTPS를 이용하여 사용자 정보를 안전하게 보호합니다.
* Explore와 My World 버튼을 이용하여 내 프로필로 이동할 수 있습니다. 로그인 되어 있지 않았을 경우, 자동으로 로그인 페이지로 이동합니다.
* Login 버튼으로 로그인 페이지로 이동할 수 있습니다. 이미 로그인이 진행된 경우, 자동으로 나의 프로필로 이동합니다.
* Sign Up 버튼으로 계정 생성 페이지로 이동할 수 있습니다. 이미 로그인이 진행된 경우, 자동으로 나의 프로필로 이동합니다.


*** 

### 4-1. 로그인 페이지 ###

로그인 화면               |
:-------------------------:|
![Screen Shot 2022-07-19 at 8 45 57 PM](https://user-images.githubusercontent.com/77673334/179742655-05b89ebe-9ddb-4e6f-a274-27902db75339.png)
***

### 4-2. 계정 생성 페이지 ###

계정 생성 화면               |
:-------------------------:|
![Screen Shot 2022-07-19 at 8 46 16 PM](https://user-images.githubusercontent.com/77673334/179742661-4f11dca1-c492-4efe-8092-29f08a7958a7.png)

***

## 5. MYWORLD 페이지 ##

나의 프로필 화면               |
:-------------------------:|
![Screen Shot 2022-07-19 at 8 48 51 PM](https://user-images.githubusercontent.com/77673334/179743111-feb4d3f5-3ca3-42c1-806d-8ca5050c3ae5.png)

* 좌측에 본인의 닉네임, 직업, 취미, 그리고 상태메세지 등의 정보가 표시됩니다. "프로필 수정" 버튼을 이용하여 프로필을 수정할 수 있습니다.
* 우측 상단 로그아웃 버튼을 이용하여 로그아웃 할 수 있습니다.
* 우측 상단 "등록" 버튼을 이용하여 게시글을 작성할 수 있습니다.
* 좌측 상단 유저 검색창에 찾고자 하는 유저의 닉네임을 입력하여 해당 유저의 프로필 (Otherworld)로 이동할 수 있습니다.
* 좌측 하단 "게임 시작" 버튼을 클릭하여 게임 화면으로 이동할 수 있습니다.
* 게시글을 클릭하여 게시글 상세보기를 할 수 있습니다.
* 화면 중앙에 "나의 방"이 표시됩니다. WASD 키를 이용하여 나의 방에서 캐릭터를 움직일 수 있습니다.
* "나의 방" 화면 좌측 상단의 톱니바퀴 버튼을 이용하여 "방 선택 화면"을 띄울 수 있습니다. 방 선택 화면에서는 현재 내가 갖고 있는 방들 중 프로필에 표시할 방을 선택할 수 있습니다.
* "나의 방" 화면 우측 상단의 가챠 버튼을 이용하여 확률적으로 새로운 방을 획득할 수 있습니다. 각 가챠 시도 당 100코인이 차감됩니다.


방 선택 화면               |
:-------------------------:|
![Screen Shot 2022-07-19 at 8 53 48 PM](https://user-images.githubusercontent.com/77673334/179743974-fca1e344-983d-4e20-89ec-2a746126aae9.png)


Room 1                   |  Room 2            | Room 3
:-------------------------:|:-------------------------:|:-------------------------:
![Screen Shot 2022-07-20 at 4 32 02 PM](https://user-images.githubusercontent.com/77673334/179924096-ed5f7c06-3972-4322-9eae-cdcb9e0904c5.png)  |  ![Screen Shot 2022-07-20 at 4 32 23 PM](https://user-images.githubusercontent.com/77673334/179924121-a136355f-8381-4a30-8ab0-0cfdca69d98d.png) | ![Screen Shot 2022-07-20 at 4 32 44 PM](https://user-images.githubusercontent.com/77673334/179924157-931dee3c-18f5-47ee-a7d4-f20a42a85977.png)


 
Room 4                   |  Room 5            | Room 6
:-------------------------:|:-------------------------:|:-------------------------:
![Screen Shot 2022-07-20 at 4 33 24 PM](https://user-images.githubusercontent.com/77673334/179924265-c6c5a2a1-2eb6-42b0-8e9a-e03bb56885ad.png)  |  ![Screen Shot 2022-07-20 at 4 33 39 PM](https://user-images.githubusercontent.com/77673334/179924278-55856ae6-82ef-479b-9bda-117c2538e434.png) | ![Screen Shot 2022-07-20 at 4 34 02 PM](https://user-images.githubusercontent.com/77673334/179924294-ae45cc22-e0b1-4523-86c9-21850238a0d3.png)

***
## 6. OTHERWORLD 페이지 ##

Otherworld 화면              |
:-------------------------:|
![Screen Shot 2022-07-20 at 4 47 10 PM](https://user-images.githubusercontent.com/77673334/179926567-50db67c8-ef45-4f0d-bb45-b400c0289857.png)

* Myworld 페이지에서 닉네임 검색을 통해 다른 유저의 프로필 페이지인 Otherworld 페이지로 이동할 수 있습니다.
* 해당 유저의 방, 게시판, 프로필 정보를 확인할 수 있습니다.
* Otherworld 페이지에서는 수정 기능을 이용할 수 없습니다.
* 우측 상단의 "등록" 버튼을 이용하여 해당 유저의 게시판에 글을 남길 수 있습니다. 많은 유저들과 마음껏 교류해보세요!

***
## 7. 글쓰기 페이지 ##

글쓰기 화면              |
:-------------------------:|
![Screen Shot 2022-07-20 at 4 42 35 PM](https://user-images.githubusercontent.com/77673334/179925733-90409924-048f-47e3-afbb-4296ad63415a.png)

* Myworld 페이지에서 글을 작성하면 본인 프로필 게시판에 글이 등재됩니다.
* Otherworld 페이지에서 글을 작성하면 해당 유저의 게시판에 글이 등재됩니다.

***
## 8. 게임 선택 페이지 ##


게임 선택 페이지              |
:-------------------------:|
![Screen Shot 2022-07-20 at 4 56 39 PM](https://user-images.githubusercontent.com/77673334/179928447-ae82d122-977d-48fa-ae4a-8ad27e43b279.png)

* 게임 선택 페이지에서는 각종 게임들을 선택하여 맵을 뽑는데 필요한 코인을 획득할 수 있습니다.
* 게임은 현재는 총 5가지가 구현되어 있습니다.


***
## 9. 게임 페이지 ##



터치 게임               |
:-------------------------:|
![Screen Shot 2022-07-20 at 4 58 24 PM](https://user-images.githubusercontent.com/77673334/179929301-cf853031-6bf6-4ac0-9df7-9178fc3b14a0.png)






피하기 게임               |
:-------------------------:|
![Screen Shot 2022-07-20 at 4 58 36 PM](https://user-images.githubusercontent.com/77673334/179929092-5927ce3c-781f-434c-9800-e48022a11f24.png)






스와이프 벽돌깨기 게임               |
:-------------------------:|
![Screen Shot 2022-07-20 at 4 58 53 PM](https://user-images.githubusercontent.com/77673334/179929205-d6bc2724-fd34-42da-adea-4aea0d78cbef.png)







테트리스 게임               |
:-------------------------:|
![Screen Shot 2022-07-20 at 4 59 07 PM](https://user-images.githubusercontent.com/77673334/179929230-2f2eb9c6-976d-4124-a1c3-98bb33cd6004.png)







스택 게임               |
:-------------------------:|
![Screen Shot 2022-07-20 at 4 59 22 PM](https://user-images.githubusercontent.com/77673334/179929394-a0117b73-df2a-4ec4-9a02-4b139415397c.png)







