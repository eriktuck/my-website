---
date: 2025-04-11 10:00:00-05:00
draft: false
image: https://storage.googleapis.com/ei-dev-assets/assets/0_ocB2-shoqNeEClvq.webp
image-credit: Screen capture by author
summary: Step-by-step from a fresh install of Windows 11
tags:
- Tutorial
- Claude
- AI
title: The definitive guide to installing Claude Code on Windows
---

**Step-by-step from a fresh install of Windows 11**

[Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) is the new agentic coding assistant from Anthropic. You can develop entire applications just by typing natural language instructions into your command line. (Watch Joel Grus [code a word ladder game](https://www.youtube.com/watch?v=7nLjHldVhF4) with Claude Code to see it in action.)

Claude Code promises to be easy to install, but if you're on Windows you'll find out that isn't exactly the case. To use Claude Code with Windows, you'll need to enable WSL on your machine, install Node.js, install Python (if you haven't already), install Claude Code, and set up a billing account.

You may be seeing `npm: command found`, or `the term 'npm' is not recognized...` or you might have even gotten to `Claude Code is not supported on Windows`. If so, this article is for you.

I booted a brand new Windows machine and installed Claude Code from scratch so you Windows users can follow along. 

> You must be running Windows 10 version 2004 and higher (Build 19041 and higher) or Windows 11 with admin privileges to install Claude Code.
## set up a billing account
Start by setting up a billing account. Head over to the [Billing page](https://console.anthropic.com/settings/billing) at the Anthropic Console, provide a credit card, and buy some credits. You'll need to buy at least $5 in credits to get started, which should be plenty for testing it out. 
## enable WSL
WSL is easy enough to enable from a PowerShell terminal.

Open the Terminal app (open the Start Menu and start typing `Terminal` to find it).

You might see red text that warns you that the execution policy is restricted, like below. 

![img](https://storage.googleapis.com/ei-dev-assets/assets/WindowsTerminal_Em6hAUHYBW.png)

If so, you simply need to enable the execution of scripts for the current user with 

```powershell
Set-ExecutionPolicy -Scope CurrentUser Unrestricted
```

Next, install WSL with the command

```PowerShell
wsl --install
```

This will install the default Linux distribution Ubuntu (you can select different distributions if you prefer, see the [documentation](https://learn.microsoft.com/en-us/windows/wsl/install)). 

To set up WLS account, run the command

```PowerShell
wsl.exe -d Ubuntu
```

A prompt will say `Create a default Unix user account:` and suggest an account name. Accept the default by hitting enter or pick a different account name. Then enter a password (note the password will not show when typing). You'll be asked to retype your password to confirm.

You should be looking at a screen like this

![img](https://storage.googleapis.com/ei-dev-assets/assets/WindowsTerminal_jmtRCi5Gwm.png)

Confirm your password (press Enter) and you are now in WSL!
## switch into Linux
Let's switch over from the mounted Windows drive to our Linux drive so that we install Node.js in our Linux filesystem instead of in our Windows filesystem. Simply type

```bash
cd ~
```

You can also switch to Linux by restarting the Terminal application and opening the Ubuntu shell. Click the dropdown arrow to open a new terminal tab and select **Ubuntu**. If you want to use this as your default shell, adjust your Terminal settings (`Ctrl + ,`).
## install Node.js
[Node.js](https://nodejs.org/en/download) version 18 or above is required for Claude Code. We'll install the latest version of Node.js for Windows using the node version manager `nvm`.

In your open PowerShell or Ubuntu terminal use this command to update the package list (you'll be prompted for your password).

```bash
sudo apt update
```

Next, upgrade the system packages (confirm with `Y`).

```bash
sudo apt upgrade
```

Then install Node.js using `nvm` with

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

In lieu of restarting the shell, run

```bash
\. "$HOME/.nvm/nvm.sh"
```

followed by

```bash
nvm install 22
```

to install Node.js version 22.

> See the [installation instructions](https://nodejs.org/en/download) if you run into any issues, selecting Get Node.js v...(LTS) for Linux using nvm with npm.
## install Python (if needed)
I tried asking Claude Code to install Python for me. No dice. It's probably a good thing it doesn't have that level of privileges on my computer. If you have already installed Python, you're likely good to move on to install Claude Code. If not, follow along to get Python installed.

To install Python and `pip` (a package manager for Python), run

```bash
sudo apt install python3 python3-pip
```
## install Claude Code
Now you are ready to install Claude Code.

Following the instructions [here](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview), simply run the command

```bash
npm install -g @anthropic-ai/claude-code
```

You may be prompted to upgrade your version of `npm`. If so, just follow the instructions provided on screen. For me, I needed to run

```bash
npm install -g npm@11.3.0
```
## run Claude Code
Finally! Let's run Claude Code.

First, `cd` into the project directory you want to work on. Claude Code will only have access to the files in this directory. You can create a new folder in your Linux filesystem with `mkdir <name>` followed by `cd <name>`. If you want to work in a folder on your Windows filesystem, `cd` into the mounted drive with `cd /mnt/c/Users/...` where you replace the `...` with the path to your folder (you can find the path to your folder in Windows Explorer, but note the `/mnt/c/` part of the path is specific to WSL).

To run Claude Code, simply type

```bash
claude
```

For your first time running Claude Code, you will be asked to choose a text style for your console. Pick whatever works best for you (use up and down arrow keys to cycle through options).

![img](https://storage.googleapis.com/ei-dev-assets/assets/WindowsTerminal_1MtqJaNzFT.png)
Then it will ask you to log in to your Anthropic account (which will set up and connect your API key). We've already set up billing, but you can take care of that now if you haven't yet. You should see a screen like this:

![img](https://storage.googleapis.com/ei-dev-assets/assets/WindowsTerminal_IIrLmN7Qnl.png)
Click Enter to be taken to the Anthropic Console (`Ctrl + Click` the URL that pops up on the screen if your browser doesn't open automatically).

You'll be taken to a page in your browser like this.

![img](https://storage.googleapis.com/ei-dev-assets/assets/Arc_NsWZHR1ogj.png)

You will be presented with a code. Copy it to your clipboard, return to your terminal running Claude Code, paste in the code, and click Enter to confirm.

One last step. Claude will ask you whether you trust the files in the folder from which you launched Claude Code. In the screenshot below, you'll see that I launched Claude Code from a mounted Windows file directory called `/mnt/c/users/erikt/_dev/claude_test`.

I'll select **Yes, proceed** (switch selections with your up or down arrows) and hit Enter to proceed.

![img](https://storage.googleapis.com/ei-dev-assets/assets/WindowsTerminal_3pGbZXelQR.png)
## let Claude code!
Now you're ready to whisper sweet directives to Claude and let it make your app dreams come true. Dream big! Let's see...how about get the answer to 2+2? 

I type 

```
Use python to get the sum of 2 and 2
```

and let Claude do it's thing. Before executing any command, it will ask me for permission to run any Bash commands or change any code. 

![img](https://storage.googleapis.com/ei-dev-assets/assets/WindowsTerminal_Lmj0mpYm0h.png)
You can authorize Claude for the entire project or after each command. I strongly recommend you start with per-command authorization so you can keep a close eye on your new junior developer.

Use `/cost` to check the cost of the session so far. Checking the sum of 2 and 2 cost me fourteen cents. Ouch.

When you're done (or out of money), type `\exit` to exit.
## conclusion
If you haven't already, I'd recommend again watching Joel Grus [code a word ladder game](https://www.youtube.com/watch?v=7nLjHldVhF4) with Claude Code to see it in action. 

I was impressed by its ability to take the code I had in a Jupyter Notebook and turn it into a Plotly Dash app in just a single command (which only cost 39 cents btw). Claude did struggle with debugging an error I had buried in some code to read the data and convert it into a Pandas Dataframe. It wanted to run Python code in Bash commands to debug, and ultimately suggested that I had a data entry error, when I did not in fact have a data entry error.

I still see agentic coding tools like Claude Code as a helpful pair programmer and useful for setting up boilerplate code for apps like Dash; however I am somewhat relieved to find out that my coding skills are not obsolete yet.
## bonus: restrict PowerShell
It's best practice to restrict the execution policy on PowerShell again. In your open PowerShell terminal, first exit WSL by typing `exit` and then run the command

```PowerShell
Set-ExecutionPolicy -Scope CurrentUser Restricted
```

Then close the terminal.