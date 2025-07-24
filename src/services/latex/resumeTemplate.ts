// LaTeX template generator for professional resumes

export const generateLatexTemplate = (formData: any, templateId: string): string => {
  // Get current date for the "Last updated" text
  const currentDate = new Date();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const lastUpdated = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  
  // Extract data
  const {
    personalInfo,
    education,
    experience,
    skills,
    projects,
    certifications
  } = formData;

  // Generate different templates based on templateId
  switch (templateId) {
    case 'modern':
      return generateModernTemplate(formData, personalInfo, education, experience, skills, projects, certifications, lastUpdated);
    case 'creative':
      return generateCreativeTemplate(formData, personalInfo, education, experience, skills, projects, certifications, lastUpdated);
    case 'professional':
    default:
      return generateProfessionalTemplate(formData, personalInfo, education, experience, skills, projects, certifications, lastUpdated);
  }
};

const generateProfessionalTemplate = (formData: any, personalInfo: any, education: any, experience: any, skills: any, projects: any, certifications: any, lastUpdated: string): string => {
  // Generate LaTeX document
  let latex = `\\documentclass[10pt, letterpaper]{article}

% Packages:
\\usepackage[
    ignoreheadfoot, % set margins without considering header and footer
    top=2 cm, % seperation between body and page edge from the top
    bottom=2 cm, % seperation between body and page edge from the bottom
    left=2 cm, % seperation between body and page edge from the left
    right=2 cm, % seperation between body and page edge from the right
    footskip=1.0 cm, % seperation between body and footer
]{geometry} % for adjusting page geometry
\\usepackage{titlesec} % for customizing section titles
\\usepackage{tabularx} % for making tables with fixed width columns
\\usepackage{array} % tabularx requires this
\\usepackage[dvipsnames]{xcolor} % for coloring text
\\definecolor{primaryColor}{RGB}{0, 79, 144} % define primary color
\\usepackage{enumitem} % for customizing lists
\\usepackage{fontawesome5} % for using icons
\\usepackage{amsmath} % for math
\\usepackage[
    pdftitle={${personalInfo.fullName}'s Resume},
    pdfauthor={${personalInfo.fullName}},
    pdfcreator={LaTeX with ResumeAI},
    colorlinks=true,
    urlcolor=primaryColor
]{hyperref} % for links, metadata and bookmarks
\\usepackage[pscoord]{eso-pic} % for floating text on the page
\\usepackage{calc} % for calculating lengths
\\usepackage{bookmark} % for bookmarks
\\usepackage{lastpage} % for getting the total number of pages
\\usepackage{changepage} % for one column entries (adjustwidth environment)
\\usepackage{paracol} % for two and three column entries
\\usepackage{ifthen} % for conditional statements
\\usepackage{needspace} % for avoiding page brake right after the section title
\\usepackage{iftex} % check if engine is pdflatex, xetex or luatex

% Ensure that generate pdf is machine readable/ATS parsable:
\\ifPDFTeX
    \\input{glyphtounicode}
    \\pdfgentounicode=1
    % \\usepackage[T1]{fontenc}
    \\usepackage[utf8]{inputenc}
    \\usepackage{lmodern}
\\fi

% Some settings:
\\AtBeginEnvironment{adjustwidth}{\\partopsep0pt} % remove space before adjustwidth environment
\\pagestyle{empty} % no header or footer
\\setcounter{secnumdepth}{0} % no section numbering
\\setlength{\\parindent}{0pt} % no indentation
\\setlength{\\topskip}{0pt} % no top skip
\\setlength{\\columnsep}{0cm} % set column seperation
\\makeatletter
\\let\\ps@customFooterStyle\\ps@plain % Copy the plain style to customFooterStyle
\\patchcmd{\\ps@customFooterStyle}{\\thepage}{
    \\color{gray}\\textit{\\small ${personalInfo.fullName} - Page \\thepage{} of \\pageref*{LastPage}}
}{}{} % replace number by desired string
\\makeatother
\\pagestyle{customFooterStyle}

\\titleformat{\\section}{\\needspace{4\\baselineskip}\\bfseries\\large}{}{0pt}{}[\\vspace{1pt}\\titlerule]

\\titlespacing{\\section}{
    % left space:
    -1pt
}{
    % top space:
    0.3 cm
}{
    % bottom space:
    0.2 cm
} % section title spacing

\\renewcommand\\labelitemi{$\\circ$} % custom bullet points
\\newenvironment{highlights}{
    \\begin{itemize}[
        topsep=0.10 cm,
        parsep=0.10 cm,
        partopsep=0pt,
        itemsep=0pt,
        leftmargin=0.4 cm + 10pt
    ]
}{
    \\end{itemize}
} % new environment for highlights

\\newenvironment{highlightsforbulletentries}{
    \\begin{itemize}[
        topsep=0.10 cm,
        parsep=0.10 cm,
        partopsep=0pt,
        itemsep=0pt,
        leftmargin=10pt
    ]
}{
    \\end{itemize}
} % new environment for highlights for bullet entries

\\newenvironment{onecolentry}{
    \\begin{adjustwidth}{
        0.2 cm + 0.00001 cm
    }{
        0.2 cm + 0.00001 cm
    }
}{
    \\end{adjustwidth}
} % new environment for one column entries

\\newenvironment{twocolentry}[2][]{
    \\onecolentry
    \\def\\secondColumn{#2}
    \\setcolumnwidth{\\fill, 4.5 cm}
    \\begin{paracol}{2}
}{
    \\switchcolumn \\raggedleft \\secondColumn
    \\end{paracol}
    \\endonecolentry
} % new environment for two column entries

\\newenvironment{header}{
    \\setlength{\\topsep}{0pt}\\par\\kern\\topsep\\centering\\linespread{1.5}
}{
    \\par\\kern\\topsep
} % new environment for the header

\\newcommand{\\placelastupdatedtext}{% \\placetextbox{<horizontal pos>}{<vertical pos>}{<stuff>}
  \\AddToShipoutPictureFG*{% Add <stuff> to current page foreground
    \\put(
        \\LenToUnit{\\paperwidth-2 cm-0.2 cm+0.05cm},
        \\LenToUnit{\\paperheight-1.0 cm}
    ){\\vtop{{\\null}\\makebox[0pt][c]{
        \\small\\color{gray}\\textit{Last updated in ${lastUpdated}}\\hspace{\\widthof{Last updated in ${lastUpdated}}}
    }}}%
  }%
}%

% save the original href command in a new command:
\\let\\hrefWithoutArrow\\href

% new command for external links:
\\renewcommand{\\href}[2]{\\hrefWithoutArrow{#1}{\\ifthenelse{\\equal{#2}{}}{}{#2 }\\raisebox{.15ex}{\\footnotesize \\faExternalLink*}}}

\\begin{document}
    \\newcommand{\\AND}{\\unskip
        \\cleaders\\copy\\ANDbox\\hskip\\wd\\ANDbox
        \\ignorespaces
    }
    \\newsavebox\\ANDbox
    \\sbox\\ANDbox{}

    \\placelastupdatedtext
    \\begin{header}
        \\textbf{\\fontsize{24 pt}{24 pt}\\selectfont ${personalInfo.fullName}}

        \\vspace{0.3 cm}

        \\normalsize`;

  // Build contact info dynamically
  const contactInfo = [];
  
  if (personalInfo.address) {
    contactInfo.push(`\\mbox{{\\color{black}\\footnotesize\\faMapMarker*}\\hspace*{0.13cm}${personalInfo.address}}`);
  }
  
  contactInfo.push(`\\mbox{\\hrefWithoutArrow{mailto:${personalInfo.email}}{{\\color{black}{\\footnotesize\\faEnvelope[regular]}}\\hspace*{0.13cm}${personalInfo.email}}}`);
  
  if (personalInfo.phone) {
    contactInfo.push(`\\mbox{\\hrefWithoutArrow{tel:${personalInfo.phone}}{{\\color{black}{\\footnotesize\\faPhone*}}\\hspace*{0.13cm}${personalInfo.phone}}}`);
  }
  
  if (personalInfo.website) {
    const cleanWebsite = personalInfo.website.replace(/^https?:\/\//, '');
    contactInfo.push(`\\mbox{\\hrefWithoutArrow{${personalInfo.website}}{{\\color{black}{\\footnotesize\\faLink}}\\hspace*{0.13cm}${cleanWebsite}}}`);
  }
  
  if (personalInfo.linkedin) {
    const cleanLinkedin = personalInfo.linkedin.replace(/^https?:\/\/(?:www\.)?linkedin\.com\/in\//, '');
    contactInfo.push(`\\mbox{\\hrefWithoutArrow{${personalInfo.linkedin}}{{\\color{black}{\\footnotesize\\faLinkedinIn}}\\hspace*{0.13cm}${cleanLinkedin}}}`);
  }
  
  if (personalInfo.github) {
    const cleanGithub = personalInfo.github.replace(/^https?:\/\/(?:www\.)?github\.com\//, '');
    contactInfo.push(`\\mbox{\\hrefWithoutArrow{${personalInfo.github}}{{\\color{black}{\\footnotesize\\faGithub}}\\hspace*{0.13cm}${cleanGithub}}}`);
  }

  latex += `
        ${contactInfo.join('%\n        \\kern 0.25 cm%\n        \\AND%\n        \\kern 0.25 cm%\n        ')}%
    \\end{header}

    \\vspace{0.3 cm - 0.3 cm}
`;

  // Professional Summary
  if (personalInfo.summary) {
    const cleanSummary = personalInfo.summary
      .replace(/&/g, '\\&')
      .replace(/%/g, '\\%')
      .replace(/#/g, '\\#')
      .replace(/\n/g, '\\\\\\\\');
    
    latex += `
    \\section{Professional Summary}
        
        \\begin{onecolentry}
            ${cleanSummary}
        \\end{onecolentry}
`;
  }

  // Education
  const validEducation = education.filter(edu => edu.institution);
  if (validEducation.length > 0) {
    latex += `
    \\section{Education}`;
    
    validEducation.forEach((edu, index) => {
      if (index > 0) {
        latex += '\n        \\vspace{0.2 cm}';
      }
      
      const dateRange = edu.startDate && edu.endDate ? `\\textit{${edu.startDate} – ${edu.endDate}}` : '';
      const institution = edu.institution.replace(/&/g, '\\&').replace(/%/g, '\\%');
      const degree = edu.degree ? `\\textit{${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}}` : '';
      
      latex += `
        \\begin{twocolentry}{
            ${dateRange}
        }
            \\textbf{${institution}}

            ${degree}
        \\end{twocolentry}`;
        
      if (edu.gpa || edu.description) {
        latex += `
        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}`;
            
        if (edu.gpa) {
          latex += `
                \\item GPA: ${edu.gpa}`;
        }
        
        if (edu.description) {
          const cleanDesc = edu.description
            .replace(/&/g, '\\&')
            .replace(/%/g, '\\%')
            .replace(/#/g, '\\#')
            .replace(/\n/g, '\\\\\\\\');
          latex += `
                \\item ${cleanDesc}`;
        }
        
        latex += `
            \\end{highlights}
        \\end{onecolentry}`;
      }
    });
  }

  // Experience
  const validExperience = experience.filter(exp => exp.company);
  if (validExperience.length > 0) {
    latex += `
    \\section{Experience}`;
    
    validExperience.forEach((exp, index) => {
      if (index > 0) {
        latex += '\n        \\vspace{0.2 cm}';
      }
      
      const location = exp.location ? `\\textit{${exp.location}}` : '';
      const dateRange = `\\textit{${exp.startDate}${exp.current ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : ''}}`;
      const position = exp.position.replace(/&/g, '\\&').replace(/%/g, '\\%');
      const company = exp.company.replace(/&/g, '\\&').replace(/%/g, '\\%');
      
      latex += `
        \\begin{twocolentry}{
        ${location}    
            
        ${dateRange}}
            \\textbf{${position}}
            
            \\textit{${company}}
        \\end{twocolentry}`;
        
      if (exp.description) {
        const highlights = exp.description
          .split('\n')
          .filter(line => line.trim())
          .map(line => `\\item ${line.trim().replace(/&/g, '\\&').replace(/%/g, '\\%').replace(/#/g, '\\#')}`)
          .join('\n                ');
          
        latex += `
        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}
                ${highlights}
            \\end{highlights}
        \\end{onecolentry}`;
      }
    });
  }

  // Skills
  const validSkills = skills.filter(skill => skill);
  if (validSkills.length > 0) {
    latex += `
    \\section{Skills}
        
        \\begin{onecolentry}
            ${validSkills.filter(s => s.trim()).join(', ')}
        \\end{onecolentry}
`;
  }

  // Projects
  const validProjects = projects.filter(proj => proj.title);
  if (validProjects.length > 0) {
    latex += `
    \\section{Projects}`;
    
    validProjects.forEach((proj, index) => {
      if (index > 0) {
        latex += '\n        \\vspace{0.2 cm}';
      }
      
      const projectLink = proj.link ? 
        `\\textit{\\href{${proj.link}}{${proj.link.replace(/^https?:\/\/(?:www\.)?github\.com\//, 'github.com/').replace(/&/g, '\\&').replace(/%/g, '\\%')}}}` : '';
      const title = proj.title.replace(/&/g, '\\&').replace(/%/g, '\\%');
      
      latex += `
        \\begin{twocolentry}{
            ${projectLink}
        }
            \\textbf{${title}}
        \\end{twocolentry}`;
        
      if (proj.description || proj.technologies.some(t => t)) {
        latex += `
        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}`;
            
        if (proj.description) {
          const cleanDesc = proj.description
            .replace(/&/g, '\\&')
            .replace(/%/g, '\\%')
            .replace(/#/g, '\\#')
            .replace(/\n/g, '\\\\\\\\');
          latex += `
                \\item ${cleanDesc}`;
        }
        
        if (proj.technologies.some(t => t)) {
          const techs = proj.technologies.filter(t => t.trim()).join(', ').replace(/&/g, '\\&').replace(/%/g, '\\%');
          latex += `
                \\item \\textbf{Technologies:} ${techs}`;
        }
        
        latex += `
            \\end{highlights}
        \\end{onecolentry}`;
      }
    });
  }

  // Certifications
  const validCertifications = certifications.filter(cert => cert.name);
  if (validCertifications.length > 0) {
    latex += `
    \\section{Certifications}`;
    
    validCertifications.forEach((cert, index) => {
      if (index > 0) {
        latex += '\n        \\vspace{0.2 cm}';
      }
      
      const dateRange = `${cert.date}${cert.expiration ? ` - ${cert.expiration}` : ''}`;
      const name = cert.name.replace(/&/g, '\\&').replace(/%/g, '\\%');
      const issuer = cert.issuer.replace(/&/g, '\\&').replace(/%/g, '\\%');
      
      latex += `
        \\begin{twocolentry}{
            ${dateRange}
        }
            \\textbf{${name}}
            
            \\textit{${issuer}}
        \\end{twocolentry}`;
    });
  }

  latex += `

\\end{document}`;

  return latex;
};

const generateModernTemplate = (formData: any, personalInfo: any, education: any, experience: any, skills: any, projects: any, certifications: any, lastUpdated: string): string => {
  let latex = `\\documentclass[11pt, a4paper]{article}

% Modern template with sidebar layout
\\usepackage[left=1.5cm, top=1.5cm, right=6cm, bottom=1.5cm, footskip=1cm]{geometry}
\\usepackage{titlesec}
\\usepackage{tabularx}
\\usepackage{array}
\\usepackage[dvipsnames]{xcolor}
\\definecolor{modernBlue}{RGB}{52, 152, 219}
\\definecolor{darkGray}{RGB}{44, 62, 80}
\\definecolor{lightGray}{RGB}{236, 240, 241}
\\usepackage{enumitem}
\\usepackage{fontawesome5}
\\usepackage{amsmath}
\\usepackage[colorlinks=true, urlcolor=modernBlue]{hyperref}
\\usepackage[pscoord]{eso-pic}
\\usepackage{calc}
\\usepackage{tikz}
\\usepackage{changepage}

\\pagestyle{empty}
\\setcounter{secnumdepth}{0}
\\setlength{\\parindent}{0pt}

% Modern section styling
\\titleformat{\\section}{\\Large\\bfseries\\color{modernBlue}}{}{0pt}{}[\\vspace{2pt}\\color{modernBlue}\\hrule\\vspace{8pt}]

% Custom sidebar
\\newcommand{\\sidebar}{
\\begin{tikzpicture}[remember picture,overlay]
\\fill[lightGray] (current page.north east) rectangle +(-4.5cm,-\\paperheight);
\\end{tikzpicture}
}

\\begin{document}
\\sidebar

% Main content area
\\begin{minipage}[t]{0.6\\textwidth}
\\vspace{1cm}

% Header
{\\Huge\\bfseries\\color{darkGray}${personalInfo.fullName}}\\\\[0.5cm]
{\\Large\\color{modernBlue}Professional Resume}\\\\[1cm]`;

  // Professional Summary
  if (personalInfo.summary) {
    const cleanSummary = personalInfo.summary
      .replace(/&/g, '\\&')
      .replace(/%/g, '\\%')
      .replace(/#/g, '\\#')
      .replace(/\n/g, '\\\\\\\\');
    
    latex += `
\\section{Professional Summary}
${cleanSummary}\\\\[0.5cm]`;
  }

  // Experience
  const validExperience = experience.filter(exp => exp.company);
  if (validExperience.length > 0) {
    latex += `
\\section{Professional Experience}`;
    
    validExperience.forEach((exp, index) => {
      const position = exp.position.replace(/&/g, '\\&').replace(/%/g, '\\%');
      const company = exp.company.replace(/&/g, '\\&').replace(/%/g, '\\%');
      const dateRange = `${exp.startDate}${exp.current ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : ''}`;
      
      latex += `
{\\large\\bfseries\\color{darkGray}${position}}\\\\
{\\textit{${company}} \\hfill \\textit{${dateRange}}}\\\\[0.3cm]`;
      
      if (exp.description) {
        const highlights = exp.description
          .split('\n')
          .filter(line => line.trim())
          .map(line => `\\item ${line.trim().replace(/&/g, '\\&').replace(/%/g, '\\%').replace(/#/g, '\\#')}`)
          .join('\n');
          
        latex += `
\\begin{itemize}[leftmargin=1cm]
${highlights}
\\end{itemize}\\\\[0.3cm]`;
      }
    });
  }

  // Projects
  const validProjects = projects.filter(proj => proj.title);
  if (validProjects.length > 0) {
    latex += `
\\section{Key Projects}`;
    
    validProjects.forEach((proj) => {
      const title = proj.title.replace(/&/g, '\\&').replace(/%/g, '\\%');
      
      latex += `
{\\large\\bfseries\\color{darkGray}${title}}\\\\[0.2cm]`;
      
      if (proj.description) {
        const cleanDesc = proj.description
          .replace(/&/g, '\\&')
          .replace(/%/g, '\\%')
          .replace(/#/g, '\\#')
          .replace(/\n/g, '\\\\\\\\');
        latex += `${cleanDesc}\\\\[0.2cm]`;
      }
      
      if (proj.technologies.some(t => t)) {
        const techs = proj.technologies.filter(t => t.trim()).join(', ').replace(/&/g, '\\&').replace(/%/g, '\\%');
        latex += `\\textbf{Technologies:} ${techs}\\\\[0.4cm]`;
      }
    });
  }

  latex += `
\\end{minipage}
\\hfill
% Sidebar content
\\begin{minipage}[t]{0.35\\textwidth}
\\vspace{1.5cm}
\\color{darkGray}`;

  // Contact Info in sidebar
  latex += `
\\section*{\\color{white}\\faUser\\ Contact}
\\color{white}`;

  if (personalInfo.email) {
    latex += `\\faEnvelope\\ ${personalInfo.email}\\\\[0.3cm]`;
  }
  if (personalInfo.phone) {
    latex += `\\faPhone\\ ${personalInfo.phone}\\\\[0.3cm]`;
  }
  if (personalInfo.address) {
    latex += `\\faMapMarker\\ ${personalInfo.address}\\\\[0.3cm]`;
  }
  if (personalInfo.linkedin) {
    const cleanLinkedin = personalInfo.linkedin.replace(/^https?:\/\/(?:www\.)?linkedin\.com\/in\//, '');
    latex += `\\faLinkedin\\ ${cleanLinkedin}\\\\[0.3cm]`;
  }
  if (personalInfo.github) {
    const cleanGithub = personalInfo.github.replace(/^https?:\/\/(?:www\.)?github\.com\//, '');
    latex += `\\faGithub\\ ${cleanGithub}\\\\[0.3cm]`;
  }

  // Skills in sidebar
  const validSkills = skills.filter(skill => skill);
  if (validSkills.length > 0) {
    latex += `
\\section*{\\color{white}\\faCogs\\ Skills}
\\color{white}`;
    validSkills.forEach(skill => {
      latex += `• ${skill}\\\\[0.2cm]`;
    });
  }

  // Education in sidebar
  const validEducation = education.filter(edu => edu.institution);
  if (validEducation.length > 0) {
    latex += `
\\section*{\\color{white}\\faGraduationCap\\ Education}
\\color{white}`;
    
    validEducation.forEach((edu) => {
      const institution = edu.institution.replace(/&/g, '\\&').replace(/%/g, '\\%');
      const degree = edu.degree ? `${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}` : '';
      const dateRange = edu.startDate && edu.endDate ? `${edu.startDate} – ${edu.endDate}` : '';
      
      latex += `\\textbf{${institution}}\\\\
${degree}\\\\
${dateRange}\\\\[0.4cm]`;
    });
  }

  latex += `
\\end{minipage}

\\end{document}`;

  return latex;
};

const generateCreativeTemplate = (formData: any, personalInfo: any, education: any, experience: any, skills: any, projects: any, certifications: any, lastUpdated: string): string => {
  let latex = `\\documentclass[11pt, a4paper]{article}

% Creative template with colorful design
\\usepackage[margin=1.5cm]{geometry}
\\usepackage{titlesec}
\\usepackage{tabularx}
\\usepackage{array}
\\usepackage[dvipsnames]{xcolor}
\\definecolor{creativeOrange}{RGB}{230, 126, 34}
\\definecolor{creativePurple}{RGB}{155, 89, 182}
\\definecolor{creativeGreen}{RGB}{46, 204, 113}
\\definecolor{creativeDark}{RGB}{52, 73, 94}
\\usepackage{enumitem}
\\usepackage{fontawesome5}
\\usepackage{amsmath}
\\usepackage[colorlinks=true, urlcolor=creativeOrange]{hyperref}
\\usepackage{tikz}
\\usepackage{tcolorbox}

\\pagestyle{empty}
\\setcounter{secnumdepth}{0}
\\setlength{\\parindent}{0pt}

% Creative section styling
\\titleformat{\\section}{\\Large\\bfseries\\color{creativeOrange}}{}{0pt}{}[\\vspace{5pt}]

\\begin{document}

% Creative header with background
\\begin{tcolorbox}[colback=creativeDark, colframe=creativeDark, text=white, arc=5pt]
\\centering
{\\Huge\\bfseries ${personalInfo.fullName}}\\\\[0.3cm]
{\\Large Creative Professional}\\\\[0.2cm]`;

  // Contact info in header
  const contactItems = [];
  if (personalInfo.email) contactItems.push(`\\faEnvelope\\ ${personalInfo.email}`);
  if (personalInfo.phone) contactItems.push(`\\faPhone\\ ${personalInfo.phone}`);
  if (personalInfo.linkedin) {
    const cleanLinkedin = personalInfo.linkedin.replace(/^https?:\/\/(?:www\.)?linkedin\.com\/in\//, '');
    contactItems.push(`\\faLinkedin\\ ${cleanLinkedin}`);
  }
  
  latex += contactItems.join(' \\quad ');
  latex += `
\\end{tcolorbox}

\\vspace{0.5cm}`;

  // Two column layout
  latex += `
\\begin{minipage}[t]{0.65\\textwidth}`;

  // Professional Summary
  if (personalInfo.summary) {
    const cleanSummary = personalInfo.summary
      .replace(/&/g, '\\&')
      .replace(/%/g, '\\%')
      .replace(/#/g, '\\#')
      .replace(/\n/g, '\\\\\\\\');
    
    latex += `
\\section{\\faUser\\ About Me}
\\begin{tcolorbox}[colback=creativeOrange!10, colframe=creativeOrange, arc=3pt]
${cleanSummary}
\\end{tcolorbox}`;
  }

  // Experience with creative styling
  const validExperience = experience.filter(exp => exp.company);
  if (validExperience.length > 0) {
    latex += `
\\section{\\faBriefcase\\ Experience}`;
    
    validExperience.forEach((exp, index) => {
      const position = exp.position.replace(/&/g, '\\&').replace(/%/g, '\\%');
      const company = exp.company.replace(/&/g, '\\&').replace(/%/g, '\\%');
      const dateRange = `${exp.startDate}${exp.current ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : ''}`;
      
      latex += `
\\begin{tcolorbox}[colback=creativePurple!10, colframe=creativePurple, arc=3pt]
{\\large\\bfseries\\color{creativeDark}${position}}\\\\
\\textit{${company}} \\hfill \\textbf{${dateRange}}`;
      
      if (exp.description) {
        const highlights = exp.description
          .split('\n')
          .filter(line => line.trim())
          .map(line => `\\item ${line.trim().replace(/&/g, '\\&').replace(/%/g, '\\%').replace(/#/g, '\\#')}`)
          .join('\n');
          
        latex += `
\\begin{itemize}[leftmargin=0.5cm]
${highlights}
\\end{itemize}`;
      }
      
      latex += `
\\end{tcolorbox}\\\\[0.3cm]`;
    });
  }

  // Projects
  const validProjects = projects.filter(proj => proj.title);
  if (validProjects.length > 0) {
    latex += `
\\section{\\faRocket\\ Projects}`;
    
    validProjects.forEach((proj) => {
      const title = proj.title.replace(/&/g, '\\&').replace(/%/g, '\\%');
      
      latex += `
\\begin{tcolorbox}[colback=creativeGreen!10, colframe=creativeGreen, arc=3pt]
{\\large\\bfseries\\color{creativeDark}${title}}`;
      
      if (proj.description) {
        const cleanDesc = proj.description
          .replace(/&/g, '\\&')
          .replace(/%/g, '\\%')
          .replace(/#/g, '\\#')
          .replace(/\n/g, '\\\\\\\\');
        latex += `\\\\[0.2cm]${cleanDesc}`;
      }
      
      if (proj.technologies.some(t => t)) {
        const techs = proj.technologies.filter(t => t.trim()).join(', ').replace(/&/g, '\\&').replace(/%/g, '\\%');
        latex += `\\\\[0.2cm]\\textbf{\\color{creativeGreen}Tech Stack:} ${techs}`;
      }
      
      latex += `
\\end{tcolorbox}\\\\[0.3cm]`;
    });
  }

  latex += `
\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.3\\textwidth}`;

  // Skills with progress bars
  const validSkills = skills.filter(skill => skill);
  if (validSkills.length > 0) {
    latex += `
\\section{\\faCogs\\ Skills}`;
    validSkills.forEach(skill => {
      latex += `
\\begin{tcolorbox}[colback=creativeOrange!20, colframe=creativeOrange, arc=2pt, height=0.8cm]
\\centering\\textbf{${skill}}
\\end{tcolorbox}\\\\[0.2cm]`;
    });
  }

  // Education
  const validEducation = education.filter(edu => edu.institution);
  if (validEducation.length > 0) {
    latex += `
\\section{\\faGraduationCap\\ Education}`;
    
    validEducation.forEach((edu) => {
      const institution = edu.institution.replace(/&/g, '\\&').replace(/%/g, '\\%');
      const degree = edu.degree ? `${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}` : '';
      const dateRange = edu.startDate && edu.endDate ? `${edu.startDate} – ${edu.endDate}` : '';
      
      latex += `
\\begin{tcolorbox}[colback=creativePurple!20, colframe=creativePurple, arc=2pt]
\\textbf{${institution}}\\\\
\\textit{${degree}}\\\\
\\small ${dateRange}
\\end{tcolorbox}\\\\[0.3cm]`;
    });
  }

  // Certifications
  const validCertifications = certifications.filter(cert => cert.name);
  if (validCertifications.length > 0) {
    latex += `
\\section{\\faCertificate\\ Certifications}`;
    
    validCertifications.forEach((cert) => {
      const name = cert.name.replace(/&/g, '\\&').replace(/%/g, '\\%');
      const issuer = cert.issuer.replace(/&/g, '\\&').replace(/%/g, '\\%');
      
      latex += `
\\begin{tcolorbox}[colback=creativeGreen!20, colframe=creativeGreen, arc=2pt]
\\textbf{${name}}\\\\
\\textit{${issuer}}\\\\
\\small ${cert.date}
\\end{tcolorbox}\\\\[0.2cm]`;
    });
  }

  latex += `
\\end{minipage}

\\end{document}`;

  return latex;
};