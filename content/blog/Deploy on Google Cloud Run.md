---
date: 2025-12-08
draft: false
image: null
image-credit: null
summary: A full step-by-step walk through to set up a secure web app.
tags:
- GCP
- Docker
title: Deploy your app on Google Cloud Run with Firebase, Firestore and Docker.
---

This guide walks through the full process of deploying an app on Google [Cloud Run](https://io.eriktuck.com/)  using [Firebase](https://io.eriktuck.com/base/Google+Cloud+Platform/Firebase) with a [Firestore](https://io.eriktuck.com/) backend and [Docker](https://io.eriktuck.com/base/Docker) for local debugging. If you have an app you'd like to self-host or share with the world, this tutorial will get you there. By the end, you'll have an app with custom domain running on the web, including user authentication. I also show you how to protect your app secrets like API keys and secure your database so users can only access their own data. 

I've been running my self-hosted finance app [Milkweed](https://github.com/eriktuck/milkweed) on this stack for 6 months now. You can reference my public repo for additional code if you get stuck.

This is a bring-your-own-app tutorial; you'll get maximum benefit if you already have an app built that works locally. Mine is a financial app built on [Flask](https://io.eriktuck.com/).
### create a Google Cloud project
Install [Google Cloud CLI](https://io.eriktuck.com/base/Google+Cloud+Platform/Google+Cloud+CLI).

From the Google Cloud console, [create a project](https://console.cloud.google.com/projectcreate). Attach your billing account (if you haven't already for this billing account, set up budgets and alerts).

From the project picker, select your new project.

> [!NOTE] Picking a backend
> I was originally hoping to use [Cloud SQL](https://io.eriktuck.com/base/Google+Cloud+Platform/Cloud+SQL) to store my relational data in a [Postgres](https://io.eriktuck.com/base/PostgreSQL/Postgres) database, however the cost of even the most basic set up was 7 cents per hour (over \$600 per year!). 
> 
> I had a couple options however: switch to [Supabase](https://io.eriktuck.com/base/Web/Supabase) for data storage and authentication to take advantage of their free tier while still using a Postgres database or use [Firebase](https://io.eriktuck.com/base/Google+Cloud+Platform/Firebase) and [Firestore](https://io.eriktuck.com/) which also offers a generous free tier. I chose Firebase and Firestore because I wanted to stay in Google's ecosystem (and because of the recent buzz around [Firebase Studio](https://io.eriktuck.com/)).
## authentication
We'll start by setting up an authentication workflow with Firebase.
### set up Firebase
We'll use Firebase for authentication. Go to the [Firebase console](https://console.firebase.google.com) and select **Add Firebase to an existing project**.

Set up authentication under *Build > Authentication*. Click **Get Started**. Enable Google as sign in method (you can enable additional later). Slide the **Enable** toggle to on. Click Save. Set the public facing project name and support email.
### downgrade billing
You may want to start with the Spark plan which is the free tier before deciding to jump up to a pay-as-you-go plan. In the bottom left of the Firebase console, you should see the billing plan, select Downgrade if needed.

> [!NOTE]
> I get billed less than $1 per month to use my app a few times a week. It requires a cold start, which means a slower load time, but for my needs this is no problem.
### connect an app
You'll need to connect an app before continuing. For us, it will be a web app. Select **Project Settings** then scroll down to **Your Apps**. Click the `</>` icon for a web app. Give it a name and click **Register**. Leave “Firebase Hosting” unchecked unless you want to serve static files from Firebase. 

Don't worry about the code snippet for now, we'll get to it in a couple steps.
### create a Firebase service account
In Project Settings, go to the **Service accounts** tab, select Firebase Admin SDK (should be selected already), and click **Generate new private key**. A JSON file will be downloaded to your default download location. Move this file to your project's local root directory and rename to `firebase-service-account.json`.
### create a login page
Create a new folder `templates` and a new file `index.html` inside. This will be where unauthenticated users are routed. In the `index.html` file, paste this boilerplate.

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-auth-compat.js"></script>
</head>
<body>
  <h1>Please login with Google to proceed</h1>
  <button onclick="signIn()">Sign in with Google</button>

  <script>
    const firebaseConfig = {
      apiKey: "{{ firebase_api_key }}",
      authDomain: "{{ firebase_auth_domain }}",
      projectId: "{{ firebase_project_id }}",
      appId: "{{ firebase_app_id }}"
    };

    firebase.initializeApp(firebaseConfig);

    function signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(result => {
        return result.user.getIdToken();
      }).then(idToken => {
        fetch("/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken })
        }).then(() => {
          location.href = "/dash";  // redirect to your Dash app
        });
      });
    }
  </script>
</body>
</html>
```

This uses [Jinja](https://io.eriktuck.com/) to safely inject the configuration settings for Firebase. While these details are not secrets *per se*, it's just good practice not to hard code these in. 

This will look a little rough. Just have your favorite GPT add some [Bootstrap](https://io.eriktuck.com/) or custom CSS to make it look better based on the style of your app.
### update entry point to use login page
I'm using the new [Dash Pages](https://dash.plotly.com/urls) to create a multipage application. Dash runs on [Flask](https://io.eriktuck.com/). I'm wrapping my app with a Flask server to handle the new login logic.

My `app.py` now looks like

```python
from flask import Flask, request, session, render_template, redirect, url_for
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, auth
import os
import dash
from dash import Dash, html, dcc
import dash_bootstrap_components as dbc

from navbar import navbar
from config import config

env_path = os.getenv("ENV_PATH", ".env") 
load_dotenv(env_path)

server = Flask(__name__)
server.secret_key = os.getenv("FLASK_SECRET_KEY", "super-secret")

# Init Firebase
cred = credentials.Certificate("firebase-service-account.json")
firebase_admin.initialize_app(cred)

# Init Dash
def protected_layout():
    if "user_id" not in session:
        return html.Div("Unauthorized. Please log in at /")
    
    return html.Div([
        navbar
    ])

app.layout = protected_layout

@server.route("/")
def index():
    return render_template("index.html",
        firebase_api_key=os.environ["FIREBASE_API_KEY"],
        firebase_auth_domain=os.environ["FIREBASE_AUTH_DOMAIN"],
        firebase_project_id=os.environ["FIREBASE_PROJECT_ID"],
        firebase_app_id=os.environ["FIREBASE_APP_ID"]
    )

@server.route("/login", methods=["POST"])
def login():
    id_token = request.json.get("idToken")
    decoded_token = auth.verify_id_token(id_token)
    session["user_id"] = decoded_token["uid"]
    session["email"] = decoded_token.get("email")
    return "OK", 200

@server.route("/dash/")
def redirect_to_dash():
    if "user_id" not in session:
        return redirect(url_for("index"))
    return app.index()  # renders Dash app layout


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)
```

You can move the routes to a `routes.py` file and import if you prefer a cleaner `app.py` file.
### update paths in navbar
Your navigation links in the navbar must also reflect the new extended `url_path_basename`. My navbar is in `navbar.py`, which I update to

```python
navbar = dbc.NavbarSimple(
    id="navbar",
    children=[
        dbc.NavItem(dbc.NavLink("Actual", href="/dash/")),  # Home page
        dbc.NavItem(dbc.NavLink("Budget", href="/dash/budget")),
        dbc.NavItem(dbc.NavLink("CSP", href="/dash/csp")),
        dbc.DropdownMenu(
            children=[
                dbc.DropdownMenuItem("Trends", href="/dash/trends"),
            ],
            nav=True,
            in_navbar=True,
            label="More",
        ),
    ],
    brand="Milkweed",
    brand_href="/dash/",
    color="primary",
    dark=True,
)
```
### create a Flask key
Flask uses a secret key to cryptographically sign session cookies and enable storing the user's Firebase user id securely. It's easy enough to create one in Python. Just start an interactive Python session and use

```python
import secrets
secrets.token_hex(32)
```

Copy and paste the output into your `.env` file with key name `FLASK_SECRET_KEY`.
### test locally
Confirm everything is working by running your app locally. You should be directed to login and that login should be reflected in your Firebase project under *Authentication > Usage*.

```bash
python app.py
```

Note that the library `dotenv` is useful for ensuring the environment file can be accessed both locally and in production. 
## database
We'll use Firestore as our NoSQL database. 
### set up Firestore
Back in the Firebase Console, go to *Build > Firestore Database*. Click **Create database**. Choose **Start in test mode** (for now). Pick the same region as your app. Click **Create**.
### migrate to Firestore
I had already been using a `config.json` file for local development so migration to a key-value database like Firestore was straightforward. I added a `scripts/` directory and included two files:
- `migrate_settings.py`: Migrate the configuration settings and budgets for each household member
- `migrate_transactions.py`: Migrate transactions for each member.

In `migrate_settings.py` I read the `config.json` file and write to a collection. The below script illustrates how to do this.

```python
import firebase_admin
from firebase_admin import credentials, auth, firestore
import json

EMAIL = "<>@google.com"  # UPDATE
CONFIG_FIELDS = []  # UPDATE

# Initialize Firebase Admin SDK
if not firebase_admin._apps:
    cred = credentials.Certificate("secrets/firebase-service-account.json")
    firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()

# Load JSON config file
with open("data/config.json", "r") as f:
    config_data = json.load(f)

# Get User ID from email
uid = auth.get_user_by_email(EMAIL)

# Create user document in collection users
user_ref = db.collection("users").document(uid)

# Write config to user 
config_payload = {k: v for k, v in user_data.items() if k in CONFIG_FIELDS}
user_ref.collection("config").document("settings").set(config_payload)
```

Then I followed suit for the transactions. You'll need to adapt this code for your app's data model.

Returning to Firebase, under Firestore Databse, I could now see the records.
### set security rules
Now that I have potentially sensitive information in my database, I update the rules. Under the Rules tab, overwrite the existing rules with

```json
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;

      match /transactions/{transactionId} {
        allow read, write: if request.auth.uid == userId;
      }

      match /budgets/{budgetId} {
        allow read, write: if request.auth.uid == userId;
      }
    }

    // Households collection
    match /households/{householdId} {
      allow read: if request.auth.uid in resource.data.members;

      match /transactions/{transactionId} {
        allow read: if request.auth.uid in resource.data.members;
      }

      match /budgets/{budgetId} {
        allow read: if request.auth.uid in resource.data.members;
      }
    }
  }
}
```

My finance app stores financial transactions for a user and the user's household. These rules allow only the logged in user to access their transactions and the transactions of the household for which they are a member.

> [!NOTE] Admin SDK vs. Security Rules
It is important to note that the **Firebase Admin SDK** (used in our Python backend) operates with administrative privileges and **bypasses these security rules entirely**.
>
Your Python code is responsible for enforcing data isolation (e.g., by using the `session['user_id']` to only fetch documents belonging to that user). The Security Rules we defined above serve as a secondary layer of protection ("Defense in Depth"), ensuring that no one can bypass your backend and query your database directly using the Client SDK key found in the browser.
### add Firestore to app
I created a new file in my project root to handle all Firebase responsibilities called `firebase.py` with

```python
import firebase_admin
from firebase_admin import credentials, firestore

# Prevent multiple initializations
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase-service-account.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()
```

Then I could import the Firestore `db` as `import db from firebase`.
### read from Firestore
Next I needed to rewrite each function that had previously read/write responsibility to work with Firestore. Importantly, all references to Flask "session" must be within a callback.

For example, I read the configuration settings for a user from Firestore and store them in a Dash `dcc.Store` object, as below. 

```python
@callback(
    Output('config-store', 'data'),
    Input('navbar', 'id')  # dummy input to fire on load
)
def store_config(dummy):
    """
    Store config file for selected user in browser memory.

    Parameters
    ----------
    dummy: str
        dummy input to fire callback on page load 

    Returns
    -------
    str
        JSON-serialized config file
    """
    uid = session.get("user_id")
    if not uid:
        raise ValueError("Error: User not found")

    session_cache = SessionData.from_firestore(uid)

    return session_cache.serialize()
```

My custom class `SessionData` handles the logic of loading from Firestore or (for development) my local files. You can inspect the code [here](https://github.com/eriktuck/milkweed/blob/main/core/models/session.py).

To limit read/write on my database, I read once from Firestore to get all data for the user and then store it in the browser session. The tradeoff is that storing large amounts of data in-browser will slow the session down, but for now performance is better this way.
## deploy to Docker (local testing)
Before we fully deploy to Google Cloud, we can spin up a Docker container to see how the app will perform and allow for easier debugging at this stage.
### create a Dockerfile
Use [Docker](https://io.eriktuck.com/base/Docker) to create a [Dockerfile](https://io.eriktuck.com/). You can use your favorite GPT to help you with the boilerplate. For a Flask app, it might look like

```Dockerfile
# Use official slim Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y gcc

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Environment variables
ENV PYTHONUNBUFFERED=1

# Expose the port that Gunicorn will use
EXPOSE 8080

# Start Gunicorn server with 2 workers
CMD ["gunicorn", "--workers=2", "--bind=0.0.0.0:8080", "app:server"]
```

Make sure the port and command `CMD` are consistent between your app code and the Dockerfile. For example with this Flask app, the app should run with

```python
app.run(host="0.0.0.0", port=8080)
```

Next, make sure you have a [requirements.txt](https://io.eriktuck.com/base/Python/requirements.txt) file (as required by your Dockerfile to install dependencies) and include `gunicorn`, `python-dotenv` and `firebase-admin`.
### create a .dockerignore file
The `.dockerignore` file should exclude everything that is not strictly required at runtime. Importantly, exclude all secrets. We'll mount the secrets at runtime with `-v` and `--env-file`. At a minimum, the `.dockerignore` file should have

```
.git
.gitignore
.env
firebase-service-account.json
*.pyc
__pycache__/
*.md
.vscode/
tests/
notebooks/
secrets/
```
### test locally with Docker
Make sure Docker Desktop is running. Now build the docker image.

```bash
docker build -t my-app .
```

Then launch.

The best way to do this is by creating a `docker-compose.yml` file in the root directory.

```yml
version: '3.9'

services:
  budgetbaby:
    build: .
    container_name: budgetbaby
    ports:
      - "8080:8080"
    env_file:
      - secrets/.env
    volumes:
      - ./secrets:/app/secrets
    restart: unless-stopped

```

Then build and run the app with

```bash
docker-compose up --build
```

Alternatively, you can run the below (mounting secrets during launch).

```bash
docker run -p 8080:8080 \
  --env-file secrets/.env \
  -v C:/Users/erikt/_dev/milkweed/secrets:/app/secrets \
  budgetbaby
```

> [!Tip]
> If you're working on Windows, you may encounter problems copying the `firestore-service-account.json` file correctly. Try specifying the full path name to resolve.
## commit to GitHub
We'll set up our app to deploy directly from GitHub so make sure you have set up a repo and committed your changes.
## deploy to Google Cloud

> [!Warning]
> If I were to do this again, I would try Firebase Hosting instead of Cloud Run. Firebase Hosting takes care of most of these concerns and has a generous free tier (starting June 2025).

> [!Tip]
> Run these commands from Windows Powershell unless you configure gcloud on Bash.
### authenticate and configure gcloud

```powershell
# Login to your Google account
gcloud auth login

# Set your default project
gcloud config set project YOUR_PROJECT_ID

# Set your default region (where your service will run, e.g., us-central1)
gcloud config set run/region us-central1
```
### load secrets to Secret Manager
Enable the Secret Manager API

```powershell
gcloud services enable secretmanager.googleapis.com
```

Alternatively, in the Google Cloud Console, enable the Secret Manager API (it will require a billing account but shouldn't cost anything for our app).

Upload the `.env` file as a secret (make sure you are running the command from the project directory).

```powershell
gcloud secrets create env-file --data-file=.env --replication-policy="automatic"
```

and do the same for the firebase service account

```powershell
gcloud secrets create firebase-service-account --data-file=firebase-service-account.json --replication-policy="automatic"
```

Cloud Run uses a **service account** (usually the default compute one) to access resources. 

The simple way 

```powershell
gcloud secrets add-iam-policy-binding env-file --member="serviceAccount:YOUR_CLOUD_RUN_SERVICE_ACCOUNT" --role="roles/secretmanager.secretAccessor"
```

```powershell
gcloud secrets add-iam-policy-binding firebase-service-account --member="serviceAccount:YOUR_CLOUD_RUN_SERVICE_ACCOUNT" --role="roles/secretmanager.secretAccessor"
```

Gemini wrote me a `setup-cloudbuild-sa.ps1` file for creating a dedicated service account for cloud build.

```Powershell
# Create a new service account for Cloud Build
$ProjectID = "YOUR_PROJECT_ID" # Replace with your actual Project ID
$ServiceAccountName = "cloudbuild-sa"
$DisplayName = "Cloud Build Service Account"
$ServiceAccountEmail = "$ServiceAccountName@$ProjectID.iam.gserviceaccount.com"

gcloud iam service-accounts create $ServiceAccountName `
    --project=$ProjectID `
    --display-name="$DisplayName"

Write-Host "Created Cloud Build service account: $ServiceAccountEmail"

# Grant necessary permissions to the Cloud Build service account
$Roles = @(
    "roles/cloudbuild.builds.builder",
    "roles/containerregistry.writer",
    "roles/run.developer",
    "roles/secretmanager.secretAccessor",
    "roles/iam.serviceAccountUser"
    # Add "roles/storage.objectViewer" if needed
)

foreach ($Role in $Roles) {
    gcloud projects add-iam-policy-binding $ProjectID `
        --member="serviceAccount:$ServiceAccountEmail" `
        --role="$Role"
    Write-Host "Granted role '$Role' to service account '$ServiceAccountEmail'"
}

Write-Host "Successfully granted necessary permissions to the Cloud Build service account."

# (Optional) Create a new service account for Cloud Run
$CloudRunSA = "budgetbaby-runtime" # Replace with your desired name
$CloudRunSADisplayName = "Cloud Run Runtime Service Account"
$CloudRunSAEmail = "$CloudRunSA@$ProjectID.iam.gserviceaccount.com"

gcloud iam service-accounts create $CloudRunSA `
    --project=$ProjectID `
    --display-name="$CloudRunSADisplayName"

Write-Host "Created Cloud Run runtime service account: $CloudRunSAEmail"

# (Optional) Grant necessary runtime permissions to the Cloud Run service account
# Replace with the actual roles your application needs
$CloudRunRoles = @(
    # Example roles - adjust based on your application's needs
    # "roles/datastore.user",
    # "roles/cloudsql.client",
    # "roles/storage.objectViewer"
)

foreach ($CloudRunRole in $CloudRunRoles) {
    gcloud projects add-iam-policy-binding $ProjectID `
        --member="serviceAccount:$CloudRunSAEmail" `
        --role="$CloudRunRole"
    Write-Host "Granted role '$CloudRunRole' to Cloud Run service account '$CloudRunSAEmail'"
}

if ($CloudRunRoles.Count -gt 0) {
    Write-Host "Successfully granted necessary runtime permissions to the Cloud Run service account."
} else {
    Write-Host "No runtime permissions specified for the Cloud Run service account."
}

Write-Host "Remember to update your Cloud Build trigger to use the Cloud Build service account: '$ServiceAccountEmail'."
Write-Host "You can also configure your Cloud Run deployment in cloudbuild.yaml to use the Cloud Run service account: '$CloudRunSAEmail'."
```


Replace `YOUR_CLOUD_RUN_SERVICE_ACCOUNT` with the real service account. Find it under IAM & Admin/IAM. It should be the Compute Engine default service account and might look like `#######-compute@developer.gserviceaccount.com`.


> [!Warning] Still not working?
> I had to manually add Cloud Run Admin and Secret Manager Secret Accessor to my compute account.

### add `.gcloudignore`
Add a `.gcloudignore` file that has the same contents as the `.dockerignore` file.
### create a cloud build service account
You need a service account with cloud build privileges. Using the principle of least privileges, you can create a fresh account and add Run Admin access (preferred). Alternatively, you can just add Run Admin access to the `projectid-compute` account.
### set up trigger
In Google Cloud Console, go to **Cloud Build > Triggers > Create Trigger**. 

Now connect  your GitHub account when prompted. You can provide access to your entire account or just the project repo.

Use these settings 
- give it a unique project name
- pick the same region as your project
- provide a description
- Select "Push to a branch" as event trigger
- Source is a 1st gen repo (select the one you provided access to)
- Configuration is Cloud Build configuration file located in the root of the repository and called `/cloubuild.yaml`

### create a `cloudbuild.yaml` file
The easiest way to deploy an app on Cloud Run is with a `cloudbuild.yaml` file.

Mine looks like

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'gcr.io/$PROJECT_ID/budgetbaby', '.']

- name: 'gcr.io/cloud-builders/docker'
  args: ['push', 'gcr.io/$PROJECT_ID/budgetbaby']

- name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
  entrypoint: gcloud
  args:
    - run
    - deploy
    - budgetbaby
    - --image=gcr.io/$PROJECT_ID/budgetbaby
    - --region=us-central1
    - --platform=managed
    - --allow-unauthenticated
    - --set-secrets=/secrets/.env=env-file:latest
    - --set-secrets=/app/firebase-service-account.json=firebase-service-account:latest
    - --set-env-vars=GOOGLE_CLOUD_PROJECT=$PROJECT_ID,ENV_PATH=/secrets/.env

options:
  logging: CLOUD_LOGGING_ONLY
```

The first two steps build and push the docker image as we had done locally but from `gcr.io` (you cans see this in your project's **Artifact Registry**). The next step deploys the app. Here we set secrets we need and then also uncover the `env_path`. If you don't include cloud logging only, you'll throw an error.
### finalize app code
- First turn off debugging for your app if it is on. Leaving it in debugging mode can expose secrets.
- add code to handle secrets and environment file between local and Cloud Run (see below)

When you commit these changes, the trigger will be fired for Cloud Build to build and deploy your app. This took about 5 minutes for me. The benefit of setting up this more complex workflow from the beginning is that if you run into errors (I sure did) you can easily patch and deploy by just editing your code and pushing it to GitHub. 
#### debugging
If you do find errors, go to Cloud Run, select your project, and open the Logs tab. You'll see any logging in your app (including standard python error tracebacks) to help you debug.
### set uptime
You can adjust several settings related to uptime and cost optimization:
- **`min-instances` and `max-instances`:** Control the minimum and maximum number of container instances that Cloud Run will maintain.  
- **`idle-timeout`:** Configures how long an instance remains active after the last request.
- **Concurrency:** Set the maximum number of concurrent requests an instance can handle. Optimizing this can affect scaling behavior and resource utilization.  
- **CPU Allocation:** Choose whether CPU is always allocated to instances or only during request processing. "Always allocated" can improve responsiveness but increases costs when idle.  
- **Resource Limits (`--memory`, `--cpu`):** Control the memory and CPU allocated to each container instance.
## map to custom domain
You can use Firebase for custom domain hosting at a low cost, but I already own a domain and wanted to use the Cloud Run Domain Mapping feature (cheaper than a Load Balancer). [Read the instructions](https://cloud.google.com/run/docs/mapping-custom-domains) for full details.

In Google Cloud Console, open Cloud Run and (before selecting your service) open Domain Mappings (it's just a small icon on the top ribbon). You'll need to verify your base domain (eriktuck.com for me). Click the verify in Search option, input your base domain (eriktuck.com) and wait for it to be verified. Mine was instant but it could take 24 hours. Once done, you can select it from the **Select a verified domain** and then provide the subdomain (budget.eriktuck.com for me) or leave blank to map to the sub domain.

A screen will show the mapping you need to update your DNS records. Go to your DNS provider (I use Cloudflare) and create a new DNS record with that mapping. Note the target is something like `ghs.googlehosted.com.` not your app URL (and yes, that trailing period is important). Google will handle the redirect. Save the new DNS record.

Return to the Domain Mapping screen to confirm that the certificate is provisioned (you'll see a green checkmark but it might take 15 minutes or more). Once that's done, your app is ready to go.

If you get stuck, read this [tutorial](https://dev.to/timdowd19/how-to-point-your-domain-to-google-cloud-run-with-cloudflare-in-2024-1c3g) on Dev.to (although the instructions differ from what I had to do).

> [!Tip]
> I had to disable Automatic HTTPS Rewrites in Cloudflare (SSL/TLS Edge Certificates) to resolve a 525 error. 

For deeper debugging, paste the results of this command into your favorite GPT

```bash
curl -v path.to.my.app
```
## conclusion
Whew! That was a lot. I know that even as I write this, AI-assisted platforms (like Firebase Studio) are getting better at abstracting away the deployment stack to save us trouble. However, real-world enterprise environments rarely rely on 'black box' deployment. They require granular control, security, and predictability.

If you are interested in working in the field, understanding the plumbing—Docker, IAM, and Cloud Run—is what separates a hobbyist from an engineer. I hope this tutorial helped demystify the process of building a secure, scalable production environment. If you were able to get an app up and running, let me know! Happy coding!