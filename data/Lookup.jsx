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
            '/index.php': {
                code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WordPress Theme Preview</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header -->
    <header class="site-header">
        <div class="container">
            <h1 class="site-title">
                <a href="#home">My WordPress Site</a>
            </h1>
            <nav class="main-navigation">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <main class="site-main">
        <div class="container">
            <!-- Sample Blog Posts -->
            <article class="post">
                <h2 class="post-title">
                    <a href="#post1">Welcome to WordPress</a>
                </h2>
                <div class="post-meta">
                    <span class="post-date">Posted on January 15, 2024</span>
                    <span class="post-author">by Admin</span>
                </div>
                <div class="post-content">
                    <p>This is a sample blog post to demonstrate the WordPress theme layout. The theme is designed to be clean, modern, and fully responsive.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <a href="#post1" class="read-more">Read More</a>
            </article>

            <article class="post">
                <h2 class="post-title">
                    <a href="#post2">Getting Started with WordPress</a>
                </h2>
                <div class="post-meta">
                    <span class="post-date">Posted on January 10, 2024</span>
                    <span class="post-author">by Admin</span>
                </div>
                <div class="post-content">
                    <p>Learn how to customize your WordPress theme and make it your own. This theme provides a solid foundation for your website.</p>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <a href="#post2" class="read-more">Read More</a>
            </article>

            <!-- Sidebar -->
            <aside class="sidebar">
                <div class="widget">
                    <h3 class="widget-title">Recent Posts</h3>
                    <ul>
                        <li><a href="#post1">Welcome to WordPress</a></li>
                        <li><a href="#post2">Getting Started with WordPress</a></li>
                        <li><a href="#post3">Customizing Your Theme</a></li>
                    </ul>
                </div>
                
                <div class="widget">
                    <h3 class="widget-title">Categories</h3>
                    <ul>
                        <li><a href="#category1">WordPress Tips</a></li>
                        <li><a href="#category2">Web Design</a></li>
                        <li><a href="#category3">Development</a></li>
                    </ul>
                </div>
            </aside>
        </div>
    </main>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="container">
            <p>&copy; 2024 My WordPress Site. All rights reserved.</p>
            <p>Powered by WordPress | Theme by AI Website Builder</p>
        </div>
    </footer>
</body>
</html>`
            },
            '/style.css': {
                code: `/*
Theme Name: AI Generated WordPress Theme
Description: A modern, responsive WordPress theme generated by AI
Version: 1.0
Author: AI Website Builder
*/

/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header Styles */
.site-header {
    background: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.site-header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.site-title {
    font-size: 1.8rem;
    font-weight: bold;
}

.site-title a {
    color: #2c3e50;
    text-decoration: none;
}

.main-navigation ul {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.main-navigation a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
}

.main-navigation a:hover {
    color: #3498db;
}

/* Main Content */
.site-main {
    padding: 2rem 0;
}

.site-main .container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
}

/* Post Styles */
.post {
    background: #fff;
    padding: 2rem;
    margin-bottom: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.post-title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
}

.post-title a {
    color: #2c3e50;
    text-decoration: none;
}

.post-title a:hover {
    color: #3498db;
}

.post-meta {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
}

.post-meta span {
    margin-right: 1rem;
}

.post-content {
    margin-bottom: 1.5rem;
}

.post-content p {
    margin-bottom: 1rem;
}

.read-more {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    display: inline-block;
    padding: 0.5rem 1rem;
    border: 2px solid #3498db;
    border-radius: 4px;
    transition: all 0.3s;
}

.read-more:hover {
    background: #3498db;
    color: #fff;
}

/* Sidebar */
.sidebar {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    height: fit-content;
}

.widget {
    margin-bottom: 2rem;
}

.widget:last-child {
    margin-bottom: 0;
}

.widget-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.5rem;
}

.widget ul {
    list-style: none;
}

.widget li {
    margin-bottom: 0.5rem;
}

.widget a {
    color: #666;
    text-decoration: none;
    transition: color 0.3s;
}

.widget a:hover {
    color: #3498db;
}

/* Footer */
.site-footer {
    background: #2c3e50;
    color: #fff;
    text-align: center;
    padding: 2rem 0;
    margin-top: 3rem;
}

.site-footer p {
    margin-bottom: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .site-header .container {
        flex-direction: column;
        gap: 1rem;
    }
    
    .main-navigation ul {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .site-main .container {
        grid-template-columns: 1fr;
    }
    
    .post {
        padding: 1.5rem;
    }
    
    .sidebar {
        padding: 1.5rem;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 15px;
    }
    
    .post {
        padding: 1rem;
    }
    
    .post-title {
        font-size: 1.5rem;
    }
    
    .sidebar {
        padding: 1rem;
    }
}`
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
    <header class="site-header">
        <div class="container">
            <h1 class="site-title">
                <a href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?></a>
            </h1>
            <nav class="main-navigation">
                <?php wp_nav_menu(array('theme_location' => 'primary')); ?>
            </nav>
        </div>
    </header>`
            },
            '/footer.php': {
                code: `    <footer class="site-footer">
        <div class="container">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
            <p>Powered by WordPress | Theme by AI Website Builder</p>
        </div>
    </footer>
    <?php wp_footer(); ?>
</body>
</html>`
            },
            '/functions.php': {
                code: `<?php
// Theme setup
function ai_theme_setup() {
    // Add theme support for various features
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Register navigation menu
    register_nav_menus(array(
        'primary' => 'Primary Menu',
    ));
}
add_action('after_setup_theme', 'ai_theme_setup');

// Enqueue styles and scripts
function ai_theme_scripts() {
    wp_enqueue_style('ai-theme-style', get_stylesheet_uri());
    
    // Add custom JavaScript if needed
    wp_enqueue_script('ai-theme-script', get_template_directory_uri() . '/js/theme.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'ai_theme_scripts');

// Register widget areas
function ai_theme_widgets_init() {
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
add_action('widgets_init', 'ai_theme_widgets_init');

// Custom excerpt length
function ai_theme_excerpt_length($length) {
    return 30;
}
add_filter('excerpt_length', 'ai_theme_excerpt_length');

// Custom excerpt more
function ai_theme_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'ai_theme_excerpt_more');

// Add custom post types (example)
function ai_theme_custom_post_types() {
    // Portfolio post type
    register_post_type('portfolio', array(
        'labels' => array(
            'name' => 'Portfolio',
            'singular_name' => 'Portfolio Item',
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-portfolio',
    ));
}
add_action('init', 'ai_theme_custom_post_types');

// Theme customizer
function ai_theme_customize_register($wp_customize) {
    // Add custom color scheme
    $wp_customize->add_section('ai_theme_colors', array(
        'title' => 'Theme Colors',
        'priority' => 30,
    ));
    
    $wp_customize->add_setting('primary_color', array(
        'default' => '#3498db',
        'sanitize_callback' => 'sanitize_hex_color',
    ));
    
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'primary_color', array(
        'label' => 'Primary Color',
        'section' => 'ai_theme_colors',
    )));
}
add_action('customize_register', 'ai_theme_customize_register');
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