---
title: "Building a Portfolio with Hugo"
date: 2025-04-23T10:00:00-05:00
draft: true
summary: "How I built this portfolio website using Hugo and vanilla CSS"
tags: ["Hugo", "Web Development", "Tutorial"]
image: "https://storage.googleapis.com/eriktuck-blog-images/hugo-blog.jpg"
# To exclude from listings, uncomment: featured: false
---

# Building a Portfolio with Hugo

In this post, I'll walk through how I built this portfolio website using Hugo, a powerful static site generator, and vanilla CSS without any frameworks.

## Why Hugo?

When I decided to redesign my portfolio, I had a few requirements:

1. **Speed**: The site needed to load quickly
2. **Simplicity**: No complex build processes or dependencies
3. **Flexibility**: Easy to customize and extend
4. **Markdown Support**: Write content in Markdown for simplicity

Hugo fits all these requirements perfectly. It's incredibly fast, has a straightforward templating system, and natively supports Markdown content.

## Getting Started with Hugo

Setting up a Hugo site is straightforward:

```bash
# Install Hugo
sudo apt install hugo

# Create a new site
hugo new site my-portfolio
cd my-portfolio

# Initialize git repository
git init
```

## Building a Custom Theme

Rather than using a pre-built theme, I decided to create my own from scratch. This gave me complete control over the design and helped me deepen my CSS skills.

Hugo's theme structure is well-organized:

```
themes/portfolio-theme/
├── assets/
│   ├── css/
│   └── js/
└── layouts/
    ├── _default/
    ├── partials/
    └── shortcodes/
```

## Adding Dark Mode Support

One of my favorite features is the dark/light mode toggle. Here's how I implemented it:

1. Define CSS variables for both themes
2. Create a toggle switch in HTML
3. Use JavaScript to switch between themes and save the preference

The theme toggle uses `localStorage` to remember the user's preference across visits.

## Deployment with GitHub Actions

For deployment, I set up a GitHub Actions workflow that automatically builds and deploys the site to GitHub Pages whenever I push changes to the main branch.

## Conclusion

Building a portfolio with Hugo has been a rewarding experience. The result is a fast, clean, and easy-to-maintain website that effectively showcases my work.

If you're looking to build your own portfolio, I highly recommend giving Hugo a try!



# Portfolio Website

This is my personal portfolio website built with Hugo, a fast and flexible static site generator. The site features a clean design with both light and dark modes, and is fully responsive for all device sizes.

> [!Tip]- Additional Resources
> -[Luke Smith | Hugo Actually Explained](https://youtu.be/ZFL09qhKi5I?si=seTAhxL_lI5QnLsx)

## Features

- Responsive design that works on mobile, tablet, and desktop
- Custom theme built from scratch with vanilla CSS
- Dark mode toggle with localStorage to remember user preferences
- Project portfolio with filterable categories
- Blog section for tutorials and articles
- Fast loading times thanks to Hugo's static site generation

## Technical Details

The site is built with:

- **Hugo** for static site generation
- **Vanilla CSS** with custom properties for theming
- **Vanilla JavaScript** for the theme toggle functionality
- **GitHub Actions** for continuous deployment
- **GitHub Pages** for hosting

## Development Process

I designed this site with a focus on simplicity and performance. By avoiding heavy frameworks and libraries, the site loads quickly and provides a great user experience.

The dark/light mode toggle uses CSS custom properties (variables) to switch the color scheme without any page reload or flicker. User preferences are stored in localStorage to persist their choice.

## Lessons Learned

Building this site helped me deepen my understanding of Hugo's templating system and the power of CSS custom properties for theming. I also learned more about GitHub Actions for automated deployment.