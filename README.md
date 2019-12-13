# Simon Says Game

![Simon Says](SimonSays.jpg)
This is a simple 'Simon says' game made in Javascript, HTML5 & CSS3 without any dependencies.
 
## UX

The goal of the game is to get as many points in a row as you can, by memorizing and repeating the random patterns.
The patterns are indicated with white flashes, that occurs on one of the four buttons at a time. Along with a beep noice.

The game plays out a little something like this:
- Computer throws a random sequence at you. (Indicated by white flashes on the buttons along with a noice)
- You need you memorize the order in which the sequence was played and repeat it back to gain points.
- If you choose the wrong button you have to start over from the beginning.
- If you complete the sequence you'll reach the next level, for every level the sequence is extended by 1.
- The high score is based on the highest ever reached score, it will automatically be written over if beat.

## Features

- I hooked the project up with a [Firebase](https://firebase.google.com/) DB to keep track of the highscore.
- Increasingly more difficult gameplay based on which level you are at, both the speed of the sequence and the sequence length is increased.
- Lose screen which pauses and resets the game and allows you to play from scratch.

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [Sass](https://sass-lang.com/documentation/syntax)
    - I'm using Sass for CSS handling, it's very neat for smaller projects to keep everything organized.
    I like the idea of having the CSS for the mobile separated from the PC version.


## Testing

I've play tested the game enough to find that there are no bugs, pressing the highlighted buttons in the right & wrong order to make sure the game plays out correctly. Using the Chrome console to check if there is any problematic Javascript. During the proccess of creating the game I've continously looked for ways to enhance the code I've written, making it shorter & more effective.

## Deployment

To deploy the project I've been using Git Bash, regularly commiting my changes and pushing them to Github.
The final deployment is using Github Pages, which you can find a link for at the top of this page, also you can click [here](https://emilohlund-git.github.io/Simon/).

### Media
- The sounds used in this site were obtained from [Soundsbible.com](http://soundbible.com/free-sound-effects-1.html)

### Acknowledgements

- I got the idea from this game from Code Institute. It was one of the example projects.
