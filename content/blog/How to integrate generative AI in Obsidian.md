---
date: 2025-06-13
draft: false
image: null
image-credit: null
summary: A review of common approaches to leveraging the power of generative AI in
  personal knowledge management systems.
tags:
- Obsidian
- AI
title: How to integrate generative AI in Obsidian
---

If you're thinking about adding AI to your Obsidian Vault, start here. This article details the most common approaches to integrating generative AI in Obsidian. For each approach, I provide a curated list of YouTube videos that can help you get started.

Options I discuss in this article include
- use one of many available community plugins (I highlight four)
- use the Web Viewer core plugin to open any AI chatbot in an Obsidian tab
- open your Vault in an IDE like VS Code, Cursor or Windsurf
- use Claude Desktop with an Obsidian MCP
- import a subset of notes to NotebookLM
- automate common workflows with n8n

We'll also see that Obsidian is uniquely positioned to leverage generative AI. While tools like Notion have offered integrated AI assistants for some time, Obsidian's open-source, local-first, and community-driven philosophy allows for far more advanced and compelling generative AI integrations.
## start with why
Before you start evaluating which tool or approach is best for you, clarify why you want to integrate generative AI into your personal knowledge management system. Do you want help drafting content more quickly? Discovering unexpected connections between related notes? More easily organizing and categorizing your notes? Or a different way of retrieving and interacting with your notes' content? 

AI can do all of these things and more. But the more clarity you have around what you want to accomplish, the easier it will be to set up and the better you'll be able to evaluate how well your set up is achieving your goals.
## key considerations
When evaluating options, there are a few very important considerations to keep in mind including privacy, cost and hardware constraints.

**Is your content shared with third parties?** The most common concern is whether the tool will share the content of your chats and notes with a third party such as OpenAI. Many of the tools I discuss in this article default to frontier models that run on the AI providers' servers,  and therefore will share some or all of the content of your chats and notes. However, it is often possible to use these same tools with models you run locally so you don't have to worry about sharing information. 

**How much will it cost?** For many tools, you must provide your own API key (which you set up with the AI provider directly) so that you can be billed for your use of the models. Pricing for LLMs can be complex and it is possible to quickly run up a sizeable bill depending on your use and even the settings you choose. However, many AI providers allow you to pay in advance, and will turn off your access when funds run out, so you don't run up a high bill. Again, running models locally is free provided you have the right hardware.

**Do you have the right hardware?** If you want to run models locally to avoid sharing content with third parties and avoid large bills, you will need a computer with sufficient processing power to run the models or your experience will suffer. A newer Mac or a PC with a GPU should be sufficient. You can use the website [Can I Use LLM?](https://www.caniusellm.com/) to check which models you can run.
## good reasons not to integrate AI
Generative AI may make creating new content *too* easy. 

I started my Obsidian Vault to curate my own thoughts and develop novel insights. A robust finding in cognitive psychology, known as the Generation Effect, states you are more likely to remember information if you actively generate it yourself. In other words, by struggling through the sensemaking process of drafting your own notes, you are more likely to internalize the information. 

The more you rely on generative AI, the less personal your notes may become. As Paul Saffo so accurately foresaw in his 1994 article for Wired [It's the Context, Stupid](https://saffo.com/its-the-context-stupid):

> The scarcest of context resources will be something utterly beyond the ken of cold algorithms — point of view. “Point of view” is that quintissentially-human solution to information overload, an intuitive process of reducing things to an essential relevant and manageable minimum.

If you want to develop your own point of view, be cautious with how you use generative AI and what you use it for. 

There are of course ethical concerns. Use of AI writing tools may indirectly benefit from unauthorized use of copyrighted materials. Some also worry that using AI for creative tasks is a form of "cheating". In general, AI may contribute to job displacement or be used to spread misinformation at scale. There is also the environmental impact. 

Finally, you'll likely quickly discover how complex these systems can be to set up and maintain. As fast as the technology is growing, it's likely that in a year's time many of the tools you use will become obsolete and you'll need to learn new workflows.

That said, it can be an exciting adventure if you're up for it! Let's dive in to what we can do with AI and Obsidian.
## what can an LLM do in Obsidian?
Generative AI, in the form of Large Language Models (LLMs) and AI agents, can provide a myriad of benefits to your personal knowledge management workflow. Here are some examples.

**Chat with your notes**: chat has become the new normal for discovering contextualized information. This is especially helpful if you are using atomic notes where each note represents one idea. An LLM can re-combine relevant notes to respond to your query. 

**Discover connections**: embedding models project your notes into high-dimensional space to help organize information by topic. Neighboring notes contain similar information and can be exposed as potential connections.

**Enhance search and retrieval**: LLMs also use word (or token) embeddings to improve upon the basic key-word search built into Obsidian's search feature. You don't need to use the exact same words and phrases since the LLM better understands meaning to help find related information.

**Write and refine with AI**: LLMs can provide real-time suggestions to help you draft notes and recommend revisions for clarity and concision. Like code completions in an AI-powered IDE, the suggestions pop up discretely. Tab to accept or keep typing to ignore. It can help you write entire paragraphs or just remind you the syntax for adding a footnote or Dataview query.

**Automate note generation and restructuring**: beyond simple inline suggestions, LLMs can be used to propose note outlines, autofill entire sections with summaries of your content, restructure notes and other tasks. So called "agentic" AIs could also refactor notes, breaking longer notes into atomic notes and reorganizing them into folders.

**Transcribe and summarize multi-modal sources**: use LLMs to transcribe audio and videos, describe and extract information from images and chat with other assets like PDFs.

**Search the web with AI**: frontier models can now access the web to help you enhance a note with additional information and sources.

**Reformat and summarize content clipped from the web:** you can automatically process web content with generative AI when it is clipped from the web.

**Automate tagging and categorization**: tagging and categorization is less relevant when you have the power of an LLM for information retrieval, but if you're going to use tags or hierarchical folder structures for organizing your notes, you might as well use an LLM to do it quickly. 

**Identify knowledge gaps and errors**: an AI can quickly scan your notes to identify factual errors, update outdated information, and even suggest areas where your notes contain knowledge gaps or inconsistencies.

**Craft personalized learning paths**: once you know what you don't know, LLMs can suggest a learning path for backfilling knowledge gaps, and even create new notes for each topic area to jump start your learning.

**Visualize notes and relationships**: while graph view shows the links you set explicitly, with embeddings notes can be visualized based on semantic similarity to discover clusters you didn't know existed.

Let's take a look at some of the top community plugins for bringing these features to your note making workflows in Obsidian.
## AI integration community plugins
Obsidian's extensibility, and the vibrant Obsidian community, is a major reason I use Obsidian. Here are some of the top community plugins for bringing the power of AI to your Obsidian Vault. (Inclusion in this list does not indicate endorsement nor affiliation).

[Copilot for Obsidian](https://www.obsidiancopilot.com/en) by Logan Yang: your all-in-one AI assistant for Obsidian. Voted the best AI integration by the Obsidian community. Includes chat, multi-modal support, web search, YouTube summaries and more. For subscribers (currently $15/mo) you can get additional features like in-line suggestions. 

[Smart Connections](https://github.com/brianpetro/obsidian-smart-connections) by Brian Petro: this popular plugin focuses on surfacing related notes to help you discover connections. Also includes a chat feature.

[Companion](https://github.com/rizerphe/obsidian-companion) by rizerphe: for in-line text suggestions.

[Smart Second Brain](https://github.com/your-papa/obsidian-Smart2Brain) by Leo310 and nicobrauchtgit: an alternative to Smart Connections.

[Smart Connections Vault Visualizer](https://github.com/mossy1022/smart-connections-vault-visualizer) (by Evan Moscoso): enhances the graph view to visualize notes based on semantic similarity.   

> [!Example] Watch
> - [Your Brain's Next Evolution Might Begin Here](https://youtu.be/VpWMFgfW7lc?si=J8a2dwDIVFYI3cjw) | Logan Hallucinates - the creator of Copilot introduces the plugin.
> - [Give Your Obsidian Vault a Brain: Full Smart Connections + AI Plugin Setup](https://youtu.be/r_vgw4f9iGY?si=7hLVTohoa11TLzWD) | Brian Petro - the creator of Smart connections introduces the plugin
> - [Revolutionize Your Notes with AI Magic](https://youtu.be/bQ00X1Y6-YQ?si=VZZhEqFdDKrMewYN) | Matt Williams - introduction to Companion plugin.
> - [How to Add AI to Obsidian](https://youtu.be/ce2PVHyuRtA?si=Eucn5h118e2yI7o0) | Wanderloots - highlights the Smart Connections plugin (and discusses his personal philosophy on AI in Obsidian).

> [!Warning]
> The vibe code slop era is here. You don't need to search for long to find an example of an egregious security violation introduced by an LLM and left by unthinking developer. You also don't want to let an AI run wild over your carefully crafted Vault. Be careful when experimenting with any use of AI in your Vault, including community plugins. While it's no guarantee, the best indicator of quality may be the number of downloads. I strongly recommend regularly backing up your Vault if you're not already doing so.

> [!Tip]
> As noted by the creators of **Smart Second Brain**, if you use **Obsidian Sync** the vector store binaries created by these plugins might take up a lot of space due to the version history. Exclude the vector store files found in the relevant `.obsidian/plugins/` folder in the Obsidian Sync settings to avoid this.
## plugins for specific tasks
If you're instead hoping to solve just one pain point without introducing a more general AI integration, you can check out one of the many community plugins that have been developed to support specific workflows with AI. 

For example, the [YouTube Summary Extractor](obsidian://show-plugin?id=yt-video-summarizer) is a community plugin that leverages Gemini to summarize YouTube videos. [Whisper](https://github.com/nikdanilov/whisper-obsidian-plugin) is a community plugin that translates speech to text so you can make notes more quickly. [AI for Templater](https://tfthacker.com/AIT) extends the functionality of the community plugin Templater with AI.

The core plugin [Web Clipper](https://obsidian.md/clipper) has built-in functionality for processing content with an LLM when clipped. Install the extension for your browser, open the options menu, select "Interpreter" and set up your own model.

> [!Example] Watch
> - [Obsidian Web Clipper + AI: Capture & Summarise Web Content](https://youtu.be/DS75Vw4IyoA?si=yC23nFNXBKN0pDi-) | Paul Dickson - how to set up the Obsidian Web Clipper for various workflows.

I won't include a full list here as the number of plugins is vast and growing, but you can probably find what you need in the community plugin browser.
## other tools and approaches
While community plugins are the best way to integrate AI directly in Obsidian for the most streamlined experience, a number of other tools and approaches are worth mentioning to support specific workflows.
### open any GPT as a web page in Obsidian
The core [Web Viewer](https://help.obsidian.md/plugins/web-viewer) plugin allows you to open any web page directly in the app, including your favorite AI chatbot!

Enable the plugin in the Core Plugins menu, then use `Ctrl + P` to open the command palette and start typing to select `Web Viewer: open web viewer`. I have my preferred AI chatbot set up as the default homepage so anytime I open web viewer I'm taken there directly. 

This is more of a convenience than a true integration with Obsidian. You'll still be copy/pasting in and out of your notes, as the AI chatbot does not have any access to your Vault, but at least you don't need to have two applications running.

If you prefer to not share your chats and information with a third party, you can install and run [Open Web UI](https://docs.openwebui.com/) locally to the same effect.

> [!NOTE]
> You may see references to [Custom Frames](https://github.com/Ellpeck/ObsidianCustomFrames) community plugin as an earlier alternative to Web Viewer. Simply use Web Viewer instead.  
### open your Vault in an IDE
Why not open your Vault in an AI-powered [IDE](https://io.eriktuck.com/base/IDE) such as [VS Code](https://io.eriktuck.com/base/VS+Code/VS+Code) with Copilot, [Cursor](https://io.eriktuck.com/), or [Windsurf](https://io.eriktuck.com/base/Windsurf)? Obsidian's ethos proves valuable here again. By storing files locally and using an open-source file format like [Markdown](https://io.eriktuck.com/base/Markdown), you can use any application that also supports Markdown to interact with your notes. 

The primary downside to this approach is that the LLMs included in these IDEs are fine tuned for coding tasks rather than text. You'll probably get better results from a community plugin, but for developers that use Obsidian in their day-to-day work and already subscribe to one of these services, this might prove useful and economical.

> [!Example] Watch
> [Obsidian + Cursor = Magical AI Knowledge Management](https://youtu.be/nxss50uZgE0?si=4FEOsDBYlGkkJnKY) | Stable Discussion

You could also use agent-based, command line tools like [Claude Code](https://io.eriktuck.com/base/Claude+Code) (or similar offerings like [Jules](https://jules.google/)), but I'd instead recommend exploring Claude Desktop as described in the next section.
### Claude Desktop
[Claude Desktop](https://io.eriktuck.com/) can be used with a [Model Context Protocol](https://io.eriktuck.com/) (MCP) for Obsidian to unleash the power of AI agents on your Vault. Use the [Obsidian MCP Server](https://github.com/MarkusPfundstein/mcp-obsidian) that interacts with Obsidian via the [Local REST API](https://github.com/coddingtonbear/obsidian-local-rest-api) community plugin by Adam Coddington.

One disadvantage to this approach is that you are not working within Obsidian, in fact you're not working in a text editor at all. You can work side-by-side with Obsidian or you can enable the Obsidian MCP in Windsurf or Cursor. 

One advantage to this approach is that you can also set up MCPs for other productivity apps like [ToDoist](https://io.eriktuck.com/) to integrate your entire productivity system. For example, you could ask Claude to capture all the tasks you completed this week from ToDoist in your weekly note in Obsidian.

> [!Example] Watch
> - [Let Claude Automate Your Obsidian Notes](https://youtu.be/VeTnndXyJQI?si=Iqj5azpEkDKqNW96) | Zen van Riel
> - [Claude MCP in your Obsidian Vault](https://youtu.be/xBGv4RO39s0?si=22b8XkQYmwdn0RA-) | Professor Synapse 
> - [Claude + Obsidian = Building Your Personal AI Ecosystem](https://youtu.be/fH-ZL6sC_vU?si=7bZiySxk8UURFyqL) | Stable Discussion
> - [Obsidian + MCP + SuperWhisper: Write FASTER with AI](https://youtu.be/oB4sLE0Rry8?si=e8WunXIoebMPwJVz) | Greg + Code
> - [Obsidian MCP Server + VSCode Agent + Claude](https://youtu.be/BPGsl62rV-c?si=6KOlr2TTGMPvPW9r) | glich.stream
### NotebookLM
NotebookLM is an AI-native note making tool. You can manually upload relevant notes from your Vault, alongside other media like YouTube videos and PDFs, to provide context for an LLM. The standout feature of NotebookLM is probably its ability to create an audio overview as a podcast-style conversation between two AIs directly from what you provide it. 

> [!Example] Watch
> - [How I Use NotebookLM With Obsidian](https://youtu.be/STIIO_qUyJs?si=SStWlGX-4VFllOaE) | Wanderloots 
> - [Turn any YouTube Video into your AI Mentor](https://youtu.be/l0cfhGwaAG8?si=kiFHSbvQJedwGYEK) | Zsolt's Visual Personal Knowledge Management
### n8n
For automating complex workflows that integrate with Obsidian, there's [n8n](https://io.eriktuck.com/). There's considerable opportunity to create unmaintainable and overly complex workflows that steal your joy, but it might solve a pain point for you. 

> [!Example] Watch
> [AI Automation Saved My Obsidian Vault](https://youtu.be/3yel0c9yF-c?si=rfV-lTv_60D4iGlT) | I versus AI
### special mention
In researching this article I also discovered a new class of app that leverages generative AI with Obsidian for general purpose support of your personal knowledge management workflows. [Benny Chat](https://benny.stablediscussion.com/) is a personal assistant tool from Ben Hofferber (Stable Discussion) that connects to Obsidian and ToDoist. Instead of being offered as a community plugin, it is offered as an app on Discord.  
## conclusion
Are you inspired to add generative AI to your Obsidian workflow? Or terrified of the potential? Either way, I hope this article helped you consider your options. 

If none of the options I discussed meet your needs, you might use a tool like Claude Code to *develop your own plugin*. According to Nick Milo (creator of the [Linking Your Thinking](https://www.linkingyourthinking.com/) Obsidian community), in his June 13, 2025 newsletter, he was able to create a plugin for Obsidian even though he doesn't know how to code! The possibilities are limited only by your imagination.

I'd love to hear how you are using AI in Obsidian. Let me know in the comments below!