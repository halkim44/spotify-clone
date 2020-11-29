## Components hierarchy

App
--.top-content
----header
------// account icon upgrade button
------.back-forward-btns
------.search-input

--.left-content
----nav
------.logo
------// search | Home
------.playlist-creator
------.user-playlist-all

--.bottom-content
----.sdk-player

--.main-content
----// recommended contents
----.section#shortcuts
------.shortcuts
--------.h2
----------.card
----.section#recent
------// all recents played songs
--------.h2
----------.card
.
...

### User Page

.container
--header
----.profileImg
----.userDescription
--main
----.publicPlaylist
------.cards
--------.card
----.Following
------.cards
--------.card

### SideBar

.left-container
--nav.sidebar
----Logo
----ul.navList
------li
--------a.Link[react-router]
-------- . . .
----.user-playlists-container
------.horizontal-line
------ul
--------li
----------Link

## playing music

### Displaying currently playing music

getdata
|
|
|
|
|
V

## Pages

/
/search
/artist
/album
/playlist

## Epics

1. as a User I want to be able to Login to my account so that I can listen to music and keep my preferences.
2. as a User I want to view recommended list of musics so that I can easily find music that interest me.
3. as a User I want to be able to search for music so that i can explore the spotify library
4. as a user I want to have control on the music playing so that I can choose to keep listening or stop or change to other songs.
5. As a user I want to be able to create my Own Playlist so that I can
