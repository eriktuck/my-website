---
date: 2025-02-26 10:00:00-05:00
draft: false
image: https://storage.googleapis.com/ei-dev-assets/assets/1_7tdU3bdEW3brjdvAKorVMQ.webp
image-credit: Made by author with ChatGPT
summary: Install Python with miniforge3 and mamba
tags:
- Python
- Tutorial
title: How to set up your laptop for data science in 2025 (Windows edition)
---

> [!NOTE] TL;DR
> I install Python with the miniforge3 distribution and manage packages with  `mamba`.  I write code in VS Code and Jupyter Notebooks. Version control provided by Git for Windows and backed up on GitHub. If you want to jump straight in, scroll down to the installation instructions. 

The first data scientist to never install Python (or any other programming language) on a laptop has probably already been born. 

The "big data" datasets of today are far too large to store on a typical laptop's hard drive. The complex algorithms used for today's machine learning and AI tasks require massive amounts of compute, available only in large data centers owned by companies like Google, Amazon and Microsoft. 

Many students of data science (and other analytic disciplines) will be able to complete their degree entirely without setting up a development environment on their laptop--learning platforms like Coursera offer cloud-based notebooks for students to use when completing coding assignments. 

Data science competition platforms like Kaggle now host notebooks to level the playing field for competitors with less access to advanced hardware. 

You can (and probably should) write your first lines of Python or R on the Google's free cloud-based notebooks available on [Colab](https://colab.research.google.com/).

> [!NOTE] What is a Notebook?
> A notebook is an important tool for data scientists. Notebooks combine code with Markdown (a type of text with simple formatting). Data scientists can execute code, see the outputs of the code, and describe what is happening all in one document. Notebooks are useful for exploring data, testing algorithms, creating data visuals and sharing code with other data scientists.

I think it is a huge disservice to students of data science (and yourself) to never learn the skills of setting up and maintaining development environments. Even if you never code on your own laptop, at some point you will need these skills to deploy one of your models, dashboards or interactive web applications. 

The best way to learn these skills is to get started on your laptop!
## software you need for data science today
As a data scientist you will need a few basics to write code, run code, manage packages (other people's code your code depends on), control versions, and backup your code to the cloud. These are the absolute minimum requirements for data science (and coding of all types in fact).

**Programming language(s)**: You will need to install any programming languages you intend to use. Today we'll install Python and R, the two most used languages for data scientists. 

**Interactive Development Environment (IDE)**: An IDE is the software through which you will write code. It's like a text editor, but supercharged for coding.

**Package manager**: packages (or libraries) are other people's code that your code depends on. The great thing about the open source community is that people and organizations share code freely with each other. Package managers help you access it. As a data scientist, you'll grow very familiar with packages like `pandas` and `scikit-learn` for Python and `tidyr` and `ggplot2` for R.

**Version control**: version control helps you avoid having a folder full of files like `project_code_FINAL_FINAL_USE_THIS_ONE_2.py`. 

**Notebooks**: You don't *need* to install notebooks as a data scientist, but you probably should. There are some who dislike notebooks ([for good reasons](https://www.youtube.com/watch?v=7jiPeIFXb6U)), but they have become a mainstay in the data science community and for that reason I include them.
## what I use (and some alternatives)
Tools and technologies come and go. I have adopted and discarded an array of different software over the years. The options continue to evolve, and quickly. What I use is a perfectly sufficient setup. If you want to get started quickly, just follow the installation instructions below. If you want to explore other options, I'll include a few suggestions on what might be the next best thing.

**Programming languages:** I use Python and R locally. Rust is growing in popularity for its fast performance but I don't use it (yet!). I install Python with the distribution miniforge3. I install R with r-essentials for use in notebooks, however many data scientist prefer [RStudio](https://posit.co/download/rstudio-desktop/). We won't install R today, instead install R in a dedicated environment for a project that requires it.

**IDE:** VS Code exploded in popularity over the past few years and it is the IDE I use. You'll likely want to use an AI "pair programmer" when writing code and Copilot is VS Code's integrated AI, but you can add [Gemini Code Assist](https://marketplace.visualstudio.com/items?itemName=Google.geminicodeassist) as an extension. Another AI-powered IDE that is growing in popularity is [Cursor](https://www.cursor.com/en). 

**Package manager**: `mamba` is the fast package manager I use. It is a drop in replacement for very popular package manager called `conda`. There is a big buzz right now around a third option called `uv` (see its GitHub repo [here](https://github.com/astral-sh/uv) if you're interested). There are multiple other options tailored to different use cases.

**Version control:** there is really no alternative to Git for version control, but you do have options for where to host your version controlled code including GitHub, which I use, and [GitLab](https://about.gitlab.com/) or [Bitbucket](https://bitbucket.org/product/).

**Notebooks:** Jupyter Notebooks are the most common notebook available. Jupyter (the parent company) also offers a more fully-featured environment for data science called [JupyterLab](https://jupyter.org/). If you prefer to work on cloud-hosted notebooks, try [Google Colab](https://colab.research.google.com/) or the AI-powered [Deepnote](https://deepnote.com/). More advanced users may want to check out [Marimo](https://docs.marimo.io/).

> [!NOTE] A note on generative AI
> There is no doubt that generative AI will deeply affect the way data science is done in the next few years. I recommend you look for software options that support generative AI so you can benefit from its many advantages, but avoid relying too much on AI while you are learning.   
## installation instructions
Follow these installation instructions in order for the best experience. Click through the header links to see screen-by-screen installation instructions.
### [install VS Code](https://io.eriktuck.com/base/VS+Code/install+VS+Code)
Start with VS Code so that we can set it as our default editor when downloading other software.
- Download the VS Code installer (available [here](https://code.visualstudio.com/download)) and install VS Code.

VS Code has a wealth of extensions that you can explore depending on your use case. Install these three in the 'Extensions' button in the left sidebar.
- Python extension
- Jupyter extension (optional if you want to use Jupyter Notebooks in VS Code, but I highly recommend it)
- r-editors extension (to use R in VS Code).
- Gemini Code Assist for AI support

You may need to select the miniforge3 interpreter before you use VS Code for the first time. 
- Use `Ctrl+Shift+P` to open the command palette 
- Begin typing to find `Python: Select Interpreter`.
- Select miniforge3. 
- Restart VS Code to take effect.
### [install git](https://io.eriktuck.com/base/Git/install+git)
- Download the Git installer (available [here](https://git-scm.com/downloads)). 

> [!Tip]
> To check whether your system is 32- or 64-bit, hit the windows key and type "system", open the "System" in the Control Panel, and check the "System type" field in the Device specifications table.

- Run the Git Installer. I recommend adjusting a few default options on installation, specifically
	- in *Select Components*, ensure **Git Bash Here** is selected.
	- in *Change the default editor...* select **VS Code** instead of Vim.
	- in *Ajdusting the name of the default branch...* switch from the default branch name to "main", which is the [new industry standard](https://github.com/github/renaming) and, more importantly, supports a more inclusive industry.
	- in *Configuring the terminal emulator...* select **Window's default console window** (rather than MinTTY, which doesn't play as nicely with some of my go-to uses of the command line, such as launching an interactive Python session).

> [!tip] Learn Git
> Git's [reference manual](https://git-scm.com/docs) is a great resource. The Pro Git book is available online for free [here](https://git-scm.com/book/en/v2). When I started with Git, I took a [short course on Udemy](https://www.udemy.com/share/10210a3@-Yb4fpF6NyipgnlqAy7GnnrHSPvF8OZeLO-_WbE24v1R-fkLQwUfYMc75smpE-4u/). Git isn't hard to use, but to use well you'll need some additional instruction.
### [configure git](https://io.eriktuck.com/base/Git/configure+git)
To get the most from git, you can configure a few of its global settings. We'll use the newly installed Git Bash (installed with git) to run commands that configure git. If this is your first time using a command line interface, don't worry! 

- Open Git Bash (installed with git), and type the following commands, running one line at a time:

```bash
git config --global user.name <name>   
git config --global user.email <email>
```

Replace `<name>` and `<email>` with your name and email. Your name and email will be associated with any commits you make (i.e., when you save and publish edits to code). Use `git config --list` to see all settings available to you.

- Finally, set up the default editor as VS Code with this command:

```bash
git config --global core.editor "code --wait"
```

Use command `git config --global -e` to confirm this worked. VS Code should open and display the contents of Git's configuration file. You can now close VS Code and Git Bash.
### [install miniforge3](https://io.eriktuck.com/base/miniforge/install+miniforge3)
- Download the [installer](https://github.com/conda-forge/miniforge?tab=readme-ov-file) for your operating system (scroll down to the Install section of the README) and run the installer. I recommend a few changes to the default settings: 
	- In *Advanced Installation Options* check the boxes for 
		- **Create shortcuts**  
		- **Register Miniforge3 as my default Python**
		- Do not select the option to add minforge3 to your PATH variable.
### [add conda and mamba to Bash PATH](https://io.eriktuck.com/base/Bash/add+conda+and+mamba+to+Bash+PATH)
- Navigate to the miniforge3 directory using your File Explorer. 
- Navigate to the subdirectory `miniforge3/etc/profile.d` . 
- Right-click and select **Git Bash Here** from the context menu. 
- In the prompt, type:

```bash
echo ". '${PWD}'/conda.sh" >> ~/.bashrc
echo ". '${PWD}'/mamba.sh" >> ~/.bashrc
```

- Restart Git Bash for the changes to take effect.

>[!INFO] 
>With this command, you are writing (`echo`) the file path to the `conda.sh` file by replacing `PWD` with the path to the current working directory to a file called `.bashrc` that is stored in your home directory (denoted by the `~`).
### [enable conda and mamba on Bash](https://io.eriktuck.com/base/Bash/enable+conda+and+mamba+on+Bash)
The first time you use `mamba` or `conda` in any shell you need to initialize it.

- Run the following command with Git Bash:

```bash
conda init bash
```

- Restart Git Bash for the changes to take effect.

Now, when you open Git Bash you can use `conda` or `mamba` commands like `mamba env list` to list all available environments.
### [install Jupyter Notebook](https://io.eriktuck.com/base/Jupyter+Notebooks/install+Jupyter+Notebook)
Install Jupyter Notebook in the`base` environment (more on environments later). 

-  In Git Bash, ensure the `base` environment is activated by running the command:

```bash
mamba activate base
```

- With the `base` environment active, run the command:

```bash
mamba install notebook
```

- When prompted, input `y` to continue.
- Also install [nb_conda_kernels](https://github.com/Anaconda-Platform/nb_conda_kernels) and [nbconvert](https://nbconvert.readthedocs.io/en/latest/index.html).

```
mamba install nb_conda_kernels
mamba install nbconvert
```

To access the Jupyter Notebook in any new environment, simply install the [iPython kernel](https://io.eriktuck.com/base/Jupyter+Notebooks/iPython+kernel) in that environment. 

> [!warning] Avoid installing packages in the base environment
> It's considered bad practice to pollute the base environment with a bunch of packages. You'll want to set up a dedicated environment for each project. If you simply use the base environment for everything, you'll inevitably run into version conflicts that prevent one or another of your projects' code from running. Jupyter Notebook is the exception to this rule.
## confirm set up
To confirm that everything is set up correctly, let's run some Python!
- Open Git Bash
- Activate the base environment

```bash
mamba activate base
```

- Start a Python interactive session (which allows you to write Python directly in Git Bash)

```bash
python
```

- You should now see your cursor blinking behind the characters `>>>`. Now run the command:

```python
import this
```

You should see the [Zen of Python](https://peps.python.org/pep-0020/) by Tim Peters printed to the screen. Very Zen! Feel free to play around (try `2 + 2` or `import antigravity`).

- Type `quit()` to exit the interactive session.

> [!Warning]
> Be careful when copying and pasting code from the internet into your command prompt. It's possible to do very bad things very quickly. I have yet to see an instance of someone posting malicious code masquerading as help, but just know it's possible. Even helpful code, when run in the wrong context, can be destructive.
## how to install R
My preferred way to access R is to install it within a project environment and run it in a Jupyter Notebook.

- Create an environment for the project
- Install `r-essentials`
- Open VS Code

```bash
mamba create -n R-env
mamba activate R-env
mamba install r-essentials
code .
```

- Create a new Jupyter Notebook using the R kernel in the environment you just created: 
	- in VS Code, use `Ctrl+Shift+P` to open the command palette
	- begin typing to select `Create: New Jupyter Notebook` 
	- in the top right corner, click **Select Kernel** and select the R kernel in the environment you just created.

`r-essentials` is a package available through conda-forge with over 200 commonly used R packages, including `ir-kernel`. The package `ir-kernel` will allow you to run R in a Jupyter Notebook.
## next steps
You now have Python installed on your laptop and can use VS Code to create your first script or Notebook using base Python.

> [!Info] What is base Python?
> Base Python includes Python and the standard library that contains core functionality. While you can start learning the ins and outs of Python with base Python, you will quickly want to create your own environments and install packages like `pandas`.

I recommend you head over to GitHub and set up an account. Follow the [Quickstart](https://docs.github.com/en/get-started) guide to get started by creating your first repository.

Find a cool project you want to work on. If you're new to Python, I recommend enrolling in a course on a platform like Coursera or Udemy. Bonus points if the course requires you to run code on your own machine! 

Create a folder on your laptop to store everything related to the project. Create a new environment with mamba by typing the command

```bash
mamba env create -n <env-name>
```

Replace `<env-name>` with the name you'd like to give your environment.

Activate the environment and install packages you need with

```
mamba activate <env-name>
mamba install pandas
```

Install `ipykernel` if you plan to run code in a Notebook. (Use the second line below to register the kernel if you have not installed `nb_conda_kernels` in you `base` environment.)

```
mamba install ipykernel
python -m ipykernel install --user --name=<env_name>
```

Open VS Code and use `Ctrl + Shift + P` to open the command palette. Begin typing to select `Create: New Jupyter Notebook`. In the top right corner, use the kerel picker to select the environment you just created. See [here](https://code.visualstudio.com/docs/datascience/jupyter-notebooks) for more details. 

Happy coding!