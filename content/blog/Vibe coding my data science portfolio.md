---
title: Vibe coding my data science portfolio
date: 2025-05-19T10:00:00-05:00
draft: false
summary: How I "vibe coded" a web portfolio to showcase my data science projects.
tags:
  - Web
image: https://storage.googleapis.com/ei-dev-assets/assets/portfolio-screenshot.png
image-credit: Screenshot by author
---
This is the story of how I "vibe coded" a web portfolio to showcase my data science projects. 

Along the way I tested new AI tools, explored the personalities of each chat model, pitted LLMs against each other in a design battle royale, and discovered a new way of integrating AI with my workflows. It was a journey, but I finally have something I am proud to share. You can find it at `localhost:1313` (that's a joke, read on to see how it turned out).
## the call to adventure
I'm a reluctant front-end developer. I have built many user interfaces for data apps in my career, and I've deployed a fair amount to the web. I have strong opinions about user experience and a high standard for design (at least I'd like to think so). I just can't always translate the vision in my head to the web page.

Could an AI agent help me build a data science portfolio?

I had recently downloaded Claude Code and was itching to try it out. I had visions of completing my entire backlog of personal projects in a weekend using just my tab key. A data science portfolio seemed like the perfect testing ground for this new suite of agentic AI coding tools.
## taking aim
My primary goal was simply to build and deploy a data science portfolio. Because I planned to publish posts like this one on my portfolio, an important requirement was a streamlined workflow to publish Markdown files.

I started by asking ChatGPT which static site generators would be a good fit for these requirements
- simple design
- blog posts are written in Markdown and converted to HTML on publish
- updates are published automatically when pushed to GitHub repo

ChatGPT recommended two options: Hugo or Jekyll. After doing a bit of my own research, I settled on Hugo. I was glad I did because Hugo's lightening fast builds allowed me to watch the AI agents update my site in near real time.
## unleashing the agents
I was ready to be amazed. I poured myself a coffee and opened Claude Code. My goal was to see how much Claude could do on its own.

> [!NOTE]
> See my previous post [The definitive guide to installing Claude Code on Windows](https://eriktuck.com/blog/the-definitive-guide-to-installing-claude-code-on-windows) if you want to try Claude Code yourself. 

Following the Anthropic guide to [Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices), I started by asking Claude to create a `CLAUDE.md` file with instructions for itself, providing the context
- you're creating a portfolio
- use Hugo and create a custom theme
- include a light mode and dark mode with toggle
- use vanilla CSS and JavaScript
- include sections for projects and blog posts
- deploy automatically on GitHub Pages with GitHub Actions

Dutifully, Claude Code created the file in my empty repository with instructions on how to install Hugo, create a custom theme, structure the content, and use GitHub Actions to deploy the site. It even included a few web references.

Next I simply told it to build the site. A few minutes later, Claude presented its first try.

![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_8SHT9VAT86.png)
## getting lost in design
While the initial design wasn't bad, I wanted to help Claude with a little design direction. I provided two images, one for light mode and one for dark mode. (I used a screenshot of the credits for two shows: the show A.P. Bio for light mode and the show Severance for dark mode). 

This is where Claude lost its mind. 

Instead of updating the CSS in the files within the Hugo theme it originally created, it wrote entirely new, duplicative CSS and JavaScript in the `static` directory. Because I had not used Hugo before nor read the documentation in advance, I did not recognize the problem. That was my first mistake.

With duplicate CSS I couldn't get the tweaks I made to the theme to show up in the built site (the CSS in the static directory overwrote the changes, unbeknownst to me). 

In addition, the static directory is no longer the best way to include assets in a Hugo site. Instead, the documentation recommends using something called Hugo Pipes. The technical details aren't important, but for maintainability I wouldn't accept a portfolio coded with AI slop based on outdated design patterns. 
## going broke
Before I even recognized the issues above, I spent considerable time wrestling with Claude to implement simple changes to the design and functionality of the site. 

I prompted again and again to add, move and sometimes remove small elements like text formatting, drop shadows, and borders. Because I had asked for both dark and light mode, the design of the two themes began to diverge. In many instances, Claude would not update old CSS but simply duplicate CSS at the bottom of the file, which only increased the number of tokens passed on each request.

Claude had similar problems with JavaScript. I prompted Claude to present the projects cards in a carousel rather than a grid. The way the carousel interacted with the responsive design didn't work properly. I had to be very direct in suggesting solutions.

I was shocked--and not a little bit annoyed--when Claude informed me that I had used up the $20 in credits in my account.
## the long road out
Inevitably, I had to \*\*gasp\*\* read the documentation and actually learn Hugo.

I started over with a fresh build of a Hugo site following the Hugo [Quick Start](https://gohugo.io/getting-started/quick-start/). I migrated by hand the de-duplicated CSS and JavaScript into the correct theme directory. I skimmed the documentation so I would be able to recognize when things were going off the rails again.

Then I had an idea. What if I competed multiple coding agents against each other in a design off? 
## the design battle royale
For the design battle royale, I would compete Copilot in VS Code, Cursor, and Windsurf against each other. 

I drafted a prompt in plain English then asked Claude to improve it. The prompt began "You are participating in a web design competition with other LLMs. Your task is to redesign a data scientist's portfolio website with a focus on both aesthetics and functionality." The prompt included specific detail on the structure of the project's repository, design requirements and desired deliverables.

The results were somewhat underwhelming, but we were making progress. 

Each agent recommended some tweaks to the color scheme and tweaked the design of the project and blog post cards. The winning design was provided by Cursor.

![hero](https://storage.googleapis.com/ei-dev-assets/assets/chrome_yvcoUxg2qR.png)

![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_tyKNq4E98c.png)

![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_sudxalvjYa.png)
## turning to no-code tools
I was not yet fully satisfied with how it looked. Further prompting only resulted in minor tweaks to the design. The agents had settled in a local minimum and I needed to do something to shake them free. 

My YouTube feed was full of videos claiming to "build a $10,000 website in one hour with no coding!". Could these YouTubers actually be on to something? I watched a few YouTube videos comparing different tools like Bolt and Lovable. The sites they built looked more like $500 sites to me, but maybe one of these tools could inject some fresh design concepts into my site.

I provided the same prompt from the LLM design challenge to both Bolt and Lovable, this time excluding the requirement that it be built in Hugo since I just wanted a fresh design. I included the additional context that I focused on NLP and knowledge graphs to help it personalize the design.

Bolt gave me a decent design and I especially liked the animated graph element in the hero. (For some reason it didn't use my actual name but invented the name Alex Chen instead).

![img](https://storage.googleapis.com/ei-dev-assets/assets/Arc_KYZYvIU6Y8.png)

Lovable provided a similar result (this time my name was Jane Doe).

![img](https://storage.googleapis.com/ei-dev-assets/assets/lovable-portfolio-design.png)
## finally vibing
The designs from Bolt and Lovable were just the inspiration I needed. 

Having tried Cursor and Windsurf (and despite Cursor providing my preferred design), I enjoyed the developer experience in Windsurf the best. The code completions were more intelligent while also less intrusive. So, I opened my website project in Windsurf and got to work implementing the new design. 

This time, I relied far less on general prompting. I worked directly in the files, relying on code completion to quickly implement changes. For more complex revisions, I would highlight the relevant code and `Ctrl + L` to include it in the chat context, which speeds up the process and reduces changes to code I don't intend. I reviewed each change and read the description in the sidebar for additional context if needed.

All the while I had a local server watching the changes happen in real time. (I have since learned of Windsurf's local browser feature which would have made debugging even easier.)

I don't know that this still qualifies as "vibe coding". I had to take ownership of nearly every line of code in the codebase. If I didn't have experience in web development, I don't know how far I would have gotten. In the end, I was glad for the struggle since it forced me to not only learn Hugo but it also showed me a new way of integrating AI agents while coding. 

As promised, you can find the finished site at [eriktuck.com](eriktuck.com).
## lessons learned
If you're thinking about following in my footsteps, I'll offer a few pieces of advice:

- **Set realistic expectations.** I assume if you're building a data science portfolio you have some coding experience. If you don't have experience in web development, keep your expectations reasonable. You may not be able to deviate too far from the boilerplate code that the model starts with, and adding advanced functionality (like a card carousel) could be a nightmare.

- **Define clear requirements.** I was glad I began by researching the best framework for my requirements--many of the AI coding tools have their own preferences (e.g., Vite as a framework or Tailwind for CSS). You'll be stuck with those if you don't specify yours up front.

- **Start with what you know.** AI agents can help you go fast, but they can't replace your understanding of the technology. Recognize the tradeoff between getting something done quickly with vibe coding and truly learning a new framework, tool or technology. If you're building something you plan to use and maintain for the long term, you'll eventually need to learn how it works.

- **Go slow to go fast.** The one-shot prompt worked fairly well to get started, but trying to make major changes from that point forward only led to frustration. I eventually learned to prompt for one small change at a time and review each change before accepting.  

Vibe coding is amazing for rapid prototyping, testing ideas and getting started. AI coding tools can act like a "Quick Start" guide that is perfectly tailored to your project. They can inspire you with new designs and help you experiment with different features and layouts. They can even teach you new tricks every once in a while. 

If you want to develop a stunning data science portfolio, and don't want to invest a bunch of time in learning the ins and outs of web development, the new world of AI coding tools is worth exploring. Through developing my own portfolio I not only got a website I'm proud to share but also learned a lot about how to incorporate AI in my coding workflows. 

That said, you don't need a fancy portfolio to get a job in data science. You may be better off with a simple, customized GitHub profile; using WordPress with a free template; or something entirely different. 

Whichever direction you go, comment below to share what you build! I've also compiled a compendium of [website inspiration](https://io.eriktuck.com/base/website+inspiration), which includes personal sites, portfolios, and GitHub profiles.
