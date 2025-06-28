export default {
    SUGGSTIONS: ['Create Todo App', 'Create a Budget Track App', 'Create a Login and Signup page',
    "Develop a Task Management App",
    "Create a Fully Responsive Blog Platform",
    "Design a Minimalistic Note-Taking App",
    "Develop a Customizable Landing Page",
    "Develop a Recipe Sharing Platform",
    "Create a Fitness Tracking App",
    "Develop a Personal Finance Management Tool",
    "Create a Language Learning App",
    "Build a Virtual Event Platform",
    "Create a Music Streaming Service"
  ],

    // Environment-specific suggestions
    ENVIRONMENT_SUGGESTIONS: {
        react: [
            'Create a React Todo App with hooks',
            'Build a React Dashboard with charts',
            'Create a React E-commerce store',
            'Develop a React Social Media App',
            'Build a React Weather App',
            'Create a React Portfolio Website'
        ],
        wordpress: [
            'Create a WordPress Blog Theme',
            'Build a WordPress Business Website',
            'Create a WordPress E-commerce Site',
            'Develop a WordPress Portfolio Theme',
            'Build a WordPress News Website',
            'Create a WordPress Restaurant Website'
        ],
        html: [
            'Create a Static Landing Page',
            'Build a HTML Portfolio Website',
            'Create a HTML Business Card',
            'Develop a HTML Documentation Site',
            'Build a HTML Email Template',
            'Create a HTML Coming Soon Page'
        ]
    },

    ENVIRONMENTS: {
        react: {
            name: 'React',
            description: 'Modern React applications with components',
            icon: '⚛️',
            color: 'from-blue-500 to-cyan-500'
        },
        wordpress: {
            name: 'WordPress',
            description: 'WordPress themes and plugins',
            icon: '📝',
            color: 'from-blue-600 to-blue-800'
        },
        html: {
            name: 'HTML/CSS',
            description: 'Static websites with HTML, CSS & JS',
            icon: '🌐',
            color: 'from-orange-500 to-red-500'
        }
    },

    DEFAULT_FILE: {
        '/public/index.html':
        {
            code: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
              <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body>
              <div id="root"></div>
            </body>
            </html>`
        },
        '/App.css': {
            code: `@tailwind base;
            @tailwind components;
            @tailwind utilities;`
        },
        '/tailwind.config.js': {
            code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
        },
        '/postcss.config.js': {
  code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
`
}

        },

    // Environment-specific default files
    DEFAULT_FILES: {
        react: {
            '/public/index.html': {
                code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React App</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`
            },
            '/App.css': {
                code: `@tailwind base;
@tailwind components;
@tailwind utilities;`
            },
            '/tailwind.config.js': {
                code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
            }
        },
        wordpress: {
            '/style.css': {
                code: `/*
Theme Name: Custom WordPress Theme
Description: A custom WordPress theme
Version: 1.0
*/

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

header {
    background: #333;
    color: white;
    padding: 1rem 0;
}

.site-title {
    margin: 0;
    font-size: 2rem;
}

main {
    padding: 2rem 0;
}

.post {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.post-title {
    color: #333;
    margin-bottom: 0.5rem;
}

.post-meta {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 1rem 0;
    margin-top: 2rem;
}`
            },
            '/index.php': {
                code: `<?php get_header(); ?>

<main class="container">
    <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
            <article class="post">
                <h2 class="post-title">
                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </h2>
                <div class="post-meta">
                    Posted on <?php the_date(); ?> by <?php the_author(); ?>
                </div>
                <div class="post-content">
                    <?php the_excerpt(); ?>
                </div>
                <a href="<?php the_permalink(); ?>">Read More</a>
            </article>
        <?php endwhile; ?>
    <?php else : ?>
        <p>No posts found.</p>
    <?php endif; ?>
</main>

<?php get_footer(); ?>`
            },
            '/header.php': {
                code: `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <header>
        <div class="container">
            <h1 class="site-title">
                <a href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?></a>
            </h1>
            <nav>
                <?php wp_nav_menu(array('theme_location' => 'primary')); ?>
            </nav>
        </div>
    </header>`
            },
            '/footer.php': {
                code: `    <footer>
        <div class="container">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
        </div>
    </footer>
    <?php wp_footer(); ?>
</body>
</html>`
            },
            '/functions.php': {
                code: `<?php
// Theme setup
function theme_setup() {
    // Add theme support for various features
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    
    // Register navigation menu
    register_nav_menus(array(
        'primary' => 'Primary Menu',
    ));
}
add_action('after_setup_theme', 'theme_setup');

// Enqueue styles and scripts
function theme_scripts() {
    wp_enqueue_style('theme-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'theme_scripts');

// Register widget areas
function theme_widgets_init() {
    register_sidebar(array(
        'name'          => 'Sidebar',
        'id'            => 'sidebar-1',
        'description'   => 'Add widgets here.',
        'before_widget' => '<section class="widget">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'theme_widgets_init');
?>`
            }
        },
        html: {
            '/index.html': {
                code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Static Website</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav>
            <div class="container">
                <h1 class="logo">My Website</h1>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>

    <main>
        <section id="home" class="hero">
            <div class="container">
                <h2>Welcome to My Website</h2>
                <p>This is a beautiful static website built with HTML, CSS, and JavaScript.</p>
                <button class="cta-button">Get Started</button>
            </div>
        </section>

        <section id="about" class="about">
            <div class="container">
                <h2>About Us</h2>
                <p>We create amazing web experiences.</p>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2024 My Website. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`
            },
            '/styles.css': {
                code: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

header {
    background: #333;
    color: white;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: #007bff;
}

main {
    margin-top: 80px;
}

.hero {
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: white;
    padding: 4rem 0;
    text-align: center;
}

.hero h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.cta-button {
    background: white;
    color: #007bff;
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.3s;
}

.cta-button:hover {
    transform: translateY(-2px);
}

.about {
    padding: 4rem 0;
    text-align: center;
}

.about h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
}

footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 2rem 0;
}

@media (max-width: 768px) {
    .nav-links {
        flex-direction: column;
        gap: 1rem;
    }
    
    .hero h2 {
        font-size: 2rem;
    }
}`
            },
            '/script.js': {
                code: `// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(51, 51, 51, 0.95)';
    } else {
        header.style.background = '#333';
    }
});

// Button click animation
document.querySelector('.cta-button')?.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'translateY(-2px)';
    }, 150);
});

console.log('Website loaded successfully!');`
            }
        }
    },

    DEPENDANCY: {
            "@google/generative-ai": "^0.21.0",
            "@heroicons/react": "^1.0.6",
    "@headlessui/react": "^1.7.17",
    "autoprefixer": "^10.0.0",
    "firebase": "^11.1.0",
    "framer-motion": "^10.0.0",
    "lucide-react": "latest",
    "postcss": "^8",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^5.0.0",
    "react-router-dom": "latest",
    "react-toastify": "^10.0.0",
    "tailwind-merge": "^2.4.0",
    "tailwindcss": "^3.4.1",
    "tailwindcss-animate": "^1.0.7",
    "uuid4": "^2.0.3",
    "uuidv4": "^6.2.13",
    "uuid": "^11.1.0",
    "@mui/material": "^6.4.6"
        }
    }