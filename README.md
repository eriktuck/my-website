This is the repository for my personal portfolio website, hosted at [eriktuck.com](https://eriktuck.com).

## Built With

- [Hugo](https://gohugo.io/) - Static site generator
- Vanilla CSS with custom properties for theming
- Vanilla JavaScript for interactive elements
- GitHub Actions for CI/CD
- GitHub Pages for hosting

## Environment

Install Hugo.

```bash
sudo apt update
sudo apt install hugo
```

Create a new environment with `uv`.

```
uv init --python 3.11
```

Add local fork of obsidiantools.

```bash
uv add - e ../obsidiantools
```

This project depends on the package `obsidiantools` by `mfarragher`. While the package is being maintained, PRs are accepted slowly and so I had to fork the project and make some changes myself (of course I should just contribute back). Install `obsidiantools` as an editable package in the website environment.

```
# from local repo
uv add - e ../obsidiantools

# from GitHub fork
uv pip install git+https://github.com/YOUR_USERNAME/obsidiantools.git

```

Tip: you can use `pip show obsidiantools` to see the path to the editable install.

## Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions whenever changes are pushed to the main branch.

## Local Development

1. Clone this repository

2. Install Hugo (if not already installed):

    ```bash
    sudo apt update
    sudo apt install hugo
    ```

3. Start the development server:

    ```bash
    hugo server -D --bind=0.0.0.0
    ```

4. Visit `http://localhost:1313/` in your browser

## Publishing

Push changes to the Obsidian `dev_notes` vault with Obsidian publish (`Alt + P`), available at `io.eriktuck.com` and by interacting with the graph visual on the home page.

### **Graph Visual**

-   Update the graph visual on the homepage by running the script `scripts/copy_graph.py`. The script creates a JSON file `cytoscape_data.json` in the `./data` directory.
-    Push changes to GitHub to deploy.


### Projects

-   Project summaries are drafted in `./content/projects`. Create a new project page from the template (`./archetypes/default.md`) with hugo using `hugo new default`??? Use Claude to quickly review a project and summarize, or draft yourself.
-   Create an image for the project card on the homepage. Use ChatGPT with prompt like "create a high resolution image of ...". Request a natural pattern to conform to the look and feel of the blog, preferably one that makes sense for the post. Upload to GCP storage using ShareX. Populate the `image` property with the link to the image and the `image-credit` property with "Image created by the author using GPT-5" or credit appropriately.

-   Ensure all properties are present and populated.
-   If `draft` is set to `false`, the project will be published on the next commit to GitHub.

#### Blog

1.   Draft new blog posts in the Obsidian `dev_notes` vault under `guides/`. While draft, ensure the property `draft` is `true`.  When ready to publish, set `draft` to `false`. 

2.   Upload an image for the blog post to GCP storage using ShareX. Populate the `image` property with the link to the image and the `image-credit` property with "Screen capture by author" or credit as appropriate.
3.   Add 2-4 tags to be displayed with the post under the `tags` property (it's ok if the tags are multiple words and don't conform to Obsidian's tag validation).
4.   Make sure all other properties, including `title`, `date`, and `summary` are complete.
5.   Run the script `scripts.copy_guides.py`. Any guides not already present and not marked draft will be copied to the `./content/blog` directory of the web project.
6.   Push changes to GitHub to deploy.



Note: Add property `featured` and set to `false` to exclude any blog post from the home page and the blog page. Do this, for example, with multi-part series where you only want the first post shown.

 

