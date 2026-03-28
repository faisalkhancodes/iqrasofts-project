const fs = require('fs');
const path = require('path');

const file = path.join('c:\\Users\\hp\\Desktop\\IqraSofts\\all html', 'team.html');
let content = fs.readFileSync(file, 'utf-8');

const styleBlock = `
    <!-- Dedicated Responsive Fixes for Team Page -->
    <style>
        @media (max-width: 992px) {
            .team-member.featured {
                flex-direction: column !important;
                padding: 2rem !important;
                text-align: center !important;
                gap: 2rem !important;
            }
            .team-grid {
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
            }
        }
        @media (max-width: 768px) {
            .team-member.featured {
                padding: 1.5rem !important;
                gap: 1.5rem !important;
            }
            .team-grid {
                display: flex !important;
                flex-direction: column !important;
                gap: 1.5rem !important;
            }
            .team-member {
                padding: 1.5rem !important;
                width: 100% !important;
                box-sizing: border-box !important;
            }
            .page-hero {
                padding: 120px 20px 60px !important;
            }
            .page-hero-content h1 {
                font-size: 2.2rem !important;
            }
            .member-image {
                margin: 0 auto !important;
                display: flex;
                justify-content: center;
            }
            .member-image img {
                width: 140px !important;
                height: 140px !important;
            }
            .container {
                padding: 0 15px !important;
                width: 100% !important;
                box-sizing: border-box !important;
                overflow-x: hidden !important;
            }
            body {
                overflow-x: hidden !important;
            }
        }
        @media (max-width: 480px) {
            .member-achievements ul {
                padding-left: 1rem;
                text-align: left;
            }
            .member-skills {
                justify-content: center;
            }
            .member-stats {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                align-items: center;
            }
            .btn-primary {
                width: 100%;
                text-align: center;
                box-sizing: border-box;
            }
            .section {
                padding: 60px 0 !important;
            }
        }
    </style>
</head>`;

if (!content.includes('Dedicated Responsive Fixes for Team Page')) {
    content = content.replace('</head>', styleBlock);
    fs.writeFileSync(file, content, 'utf-8');
    console.log("Injected responsive style block into team.html");
} else {
    // Overwrite the block
    const updatedContent = content.replace(/<!-- Dedicated Responsive Fixes for Team Page -->[\s\S]*?<\/head>/, styleBlock);
    fs.writeFileSync(file, updatedContent, 'utf-8');
    console.log("Updated existing responsive style block in team.html");
}

// Add an overall overflow hidden to the body just in case elements cause scroll
const styleCss = path.join('c:\\Users\\hp\\Desktop\\IqraSofts', 'style.css');
let css = fs.readFileSync(styleCss, 'utf-8');
if (!css.includes('body { overflow-x: hidden; max-width: 100%; }')) {
    css += `\n/* Global Overflow Prevention */\nhtml, body { overflow-x: hidden; max-width: 100%; }\n`;
    fs.writeFileSync(styleCss, css, 'utf-8');
}
