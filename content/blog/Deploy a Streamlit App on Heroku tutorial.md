---
title: "Deploy a Streamlit App on Heroku tutorial"
date: 2025-03-13T10:00:00-05:00
draft: true
summary: "ADD A SUMMARY"
tags: 
  - Python
  - Tutorial
  - Streamlit
  - Heroku
---
This tutorial will walk you through the process of deploying a `streamlit` app on Heroku. You'll need to set up a [virtual environment](https://io.eriktuck.com/),  understand the basics of git, and be comfortable working from the command line. You should also review the [Google API tutorial](https://io.eriktuck.com/) to set up Google Sheets as a back-end.

### Step-by-step

1. Create a new project folder

2. Open an Anaconda Prompt window within the project folder

3. Initialize git (`git init`)

4. Create a `.gitignore` file (`code .gitignore`)

5. Add (one per line): `*.pyc`, `secrets/`, and any other files or folders you want ignored (e.g., `notebooks/`, `data/` if you have will be working in jupyter notebooks or with local data while you build your app)

6. Create a virtual environment (`conda create -n <project-name> python`)

7. Activate the environment (`conda activate <project-name>`)

8. Install any packages you'll need using the `conda` package manager

9. Build your project locally, working within the project's environment

10. Create a `requirements.txt` file. To do this, you will first need to install `pip` into your environment (`install pip`). Then use the command `pip freeze > requirements.txt`. As an alternative, you can simply list the top-level libraries you are using (i.e., the packages you import in your script). If, when deploying to Heroku, you get an error that a package cannot be found, delete that package from `requirements.txt`. I've found fewer issues with just listing top-level libraries, but you risk version issues cropping up later.

11. Optionally, create a `runtime.txt` file to tell Heroku which python version to install. Only certain versions are supported by Heroku, so check the documentation first. Use the command `python -V > runtime.txt`, or type in the python version you'd prefer Heroku install. 

12. Create a Procfile, which tells Heroku how to actually run your app. The Procfile is run when the app is initialized in each session. Type `code Profile` to create a new file and add the command Heroku will use to run your app. It's different for each technology, but for a streamlit app the text is `sh setup.sh && streamlit run <my_app.py>`. The app will run from the root folder, so make sure if your script is stored in a folder, you include it in the path (e.g, `sh setup && streamlit run <scripts/my_app.py>`). Also, make sure that the relative paths in your script are relative to the root folder, NOT the script itself. 

13. For a`streamlit` app, you'll need to create a `setup.sh` file. Create a new file `code setup.sh` and paste the below into it (note language is bash):

```bash
mkdir -p ~/.streamlit/

echo "\
[general]\n\
email = \"your-email@domain.com\"\n\
" > ~/.streamlit/credentials.toml

echo "\
[server]\n\
headless = true\n\
enableCORS=false\n\
port = $PORT\n\
" > ~/.streamlit/config.toml
```

14. Create a Procfile for local development, if needed:

    `code Procfile.windows`

    `web: streamlit run scripts/<my_app.py> runserver 0.0.0.0:5000`

15. Commit changes to git (`git add .` , `git commit -m "message"`)

16. Create the Heroku app: `heroku create <app name> ` where `<app name>` will serve as the base of the url and the name of the app on Heroku's dashboard

17. Deploy the code to Heroku: `git push heroku master`

18. Spin up one dyno: `heroku ps:scale web=1` (use `heroku ps:scale web=0`) to shut it down. Use `heroku ps` to see how many dynos are running.

19. Open the app: `heroku open`.

20. If the app isn't up yet, or something looks wrong, check the logs with `heroku logs --tail`. You can close the logs with `ctrl+c`.

21. If you need to run the app locally, you can use the command `heroku local web -f Procfile.windows`.

22. If you make changes to the app, commit everything to git and then push it back up to Heroku. Every time you push to Heroku, it rebuilds the dyno from scratch, which can take some time depending on how many packages you need to load, so try to do that sparingly.

23. If you have API tokens or other sensitive information, you'll need to configure Heroku's configuration variables. This is equivalent to setting an [environment variable](https://io.eriktuck.com/) on your local machine. These variables will only be exposed at runtime, and won't be accessible to your users. Simply type `heroku config:set <VAR_NAME> = <VAR_VALUE>`. For JSON blobs, it's easiest to add them through Heroku's online interface (under the 'Settings' of the app.) You can paste in the prettified JSON as a new variable there. See the [Google API](https://io.eriktuck.com/) page for more info on accessing those variables within your scripts.

Your app should now be up and running on Heroku. If you're on a free tier, it may take 10-20 seconds for the app to load each time because the server needs to spin it up. It will be active for 30 minutes, but will sleep again after that time. You can upgrade to a Hobby license for $7 per dyno per month.