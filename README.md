# My Life in Cities - Word Puzzle
#### Video Demo: https://youtu.be/TBD
#### Description:

My Life in Cities is a browser-based drag-and-drop word puzzle game created for my CS50 final project. The theme is personal, based on cities I have lived in during different stages of my life, which gives the project meaning beyond just being a programming exercise. The primary goal of the game is to drag moving letters on the screen into correctly ordered slots to spell the current city. Once the player completes the word, the game plays a short sound effect, shows confetti, increases the score, and loads the next city while the timer continues to run. There are multiple cities to complete, and finishing them all gives a final score based on progress and speed.

Before CS50, I already had some basic programming experience, but mainly in isolated tasks. I understood loops, arrays, and functions, but I had not combined them into something interactive that reacts to user actions. Building this project pushed me into using several separate concepts together and thinking about how they needed to cooperate. It helped me think in terms of flow: first creating letters, then allowing movement, then waiting for drag actions, then checking slot collisions, then updating the game state. Structuring that sequence was one of the most important lessons for me when building this project.

---

### Background and Motivation

I studied Advanced Motion Graphics in college, which means I usually approached interaction and design through visual tools where the underlying systems were already built. In that environment, I animated objects on timelines and controlled motion through sliders and keyframes, without thinking too deeply about the mechanisms beneath those tools. With this project, I wanted to explore the foundations that sit under that layer - the part where interaction and visual elements are directly controlled by logic and code rather than graphical interfaces.

Working from raw code instead of motion software was interesting because I could see how interaction forms before it becomes polished animation. It made me appreciate the role of simple building blocks, like movement controlled by random offsets or drag events being tracked through mouse positions. I could see how these smaller pieces eventually become motion and design tools once built up. That made the experience feel connected to my past, but also like a new direction where I could take the design thinking I already had and apply it from a more technical angle.

---

### File Contents

**index.html**
Defines the main layout of the game. It displays the title, score counter, timer, hint area, game area where letters and slots appear, and the reset button. It links the external style sheet, JavaScript file, and the confetti library. Most game elements are created dynamically by JavaScript, so the HTML stays relatively simple and serves as a frame.

**style.css**
Handles layout and visual design. It positions the game area and defines styles for letters and slots. The file also manages spacing and background colors for each city theme. A key goal was making sure letters remain readable while they move around. Without spacing and text sizing set in CSS, letters would overlap and become unreadable, so CSS helps maintain clarity while movement happens.

**script.js**
Contains all core functionality. It stores the city list and color themes, generates slots and moving letters for each level, handles dragging with mouse events, checks whether letters overlap slots when released, calculates snapping positions, tracks time and score, and controls level progression. One of the most challenging parts was making sure letters snap into slots cleanly without jumping off-screen or overlapping wrongly. Another challenge was preventing letters from wandering off the visible screen while still letting them move enough to be interesting. The script also triggers confetti and plays success and placement sound effects to give feedback.

**README.md**
This documentation file explains the project, its motivation, design choices, file roles, and reflection on what was learned. It also contains instructions for running the project and future improvement ideas.

---

### Design Decisions

I selected cities that I have lived in to make the game feel more personal. The idea was that each level represents a piece of my life, not just a random word list. Using drag-and-drop instead of typing made the game more tactile and direct. Letters move randomly to add challenge, but I made sure movement was not too fast so the game is still enjoyable. The background color themes are based on each city, which gives each level a different feel and keeps the player visually engaged. I added sounds and confetti to provide satisfying feedback, because without them the game felt flat and less rewarding.

I also decided not to include frameworks or external systems. Focusing on front-end JavaScript let me concentrate on interaction instead of setup or configuration. This choice made the project more achievable within my time, while still leaving room for future expansion if I choose to continue developing it.

---

### Reflection

This project helped me understand how several programming concepts can work together to create something that feels alive. I already knew how variables, functions, and arrays work alone, but applying them to behavior that changes over time based on user interaction was new to me. One of the main challenges was making sure letters remained readable even while they moved. At first, letters overlapped and became difficult to drag, which made it hard to tell them apart. I solved this by controlling maximum movement boundaries, adjusting spacing in CSS, and keeping movement values moderate instead of extreme.

Another challenge was snapping letters into slots in a way that felt smooth and predictable. I had to detect whether the center of a letter was within the slot area, then adjust its position so it matched the slot visually. Without those checks, letters would sometimes snap unevenly or overlap each other. Debugging this required printing values to the console and repeatedly adjusting numbers until the fit felt right. These small adjustments made a large difference in how the game feels to play.

Connecting this experience with my motion graphics background helped me think about design differently. Instead of focusing on how motion looks, I focused on how motion is created. That shift made me appreciate the underlying logic in creative tools and showed me how design and programming rely on each other more than I realized.

Publishing the game using GitHub Pages made it feel complete. Opening the link in a regular browser made the work feel more public and accessible, instead of existing only in a development environment.

If I continued working on this project, I would add full touch-screen support so players could drag letters on phones and tablets. I would also consider adding difficulty modes where letters move faster or where time decreases as the game progresses. These changes could increase replay value and give players more options based on their desired challenge level.

Overall, this project strengthened my understanding of how programming concepts, design decisions, and interactivity connect. It gave me confidence to build more things that are interactive instead of static, and it encouraged me to explore how logic and visuals work together.

---

### How to Run

1. Clone or download this repository
2. Open `index.html` in a web browser
Or
3. Use a live server extension in Visual Studio Code

---

### Future Improvements

- Add touch support for mobile and tablet devices
- Add difficulty modes where letters move faster
- Add time-based bonuses or score multipliers
- Include larger word sets or new themed levels

---

### AI Usage Disclosure

Some assistance was used during development for debugging guidance, planning help, and rewriting documentation text, but all code logic, decisions, and implementation were written and structured by me.
