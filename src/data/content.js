/* =====================================================================
   CONTENT.JS: edit all of your site text here.
   ---------------------------------------------------------------------
   • Text marked [PLACEHOLDER] is waiting for your real content.
   • Image paths point to files in /public/assets/. To swap an image,
     drop your own file in with the SAME name (or change the path here).
   • To add an entry (a job, project or step), copy an existing { ... }
     block, paste it below and edit it. Keep the commas between blocks.
   ===================================================================== */

export const site = {
  name: 'Asanda Charmaine Thabethe',
  initials: 'AT',
  role: 'Frontend Developer',
}

/* ── Header navigation ─────────────────────────────────────────────── */
// `target` is the id of the section to scroll to.
export const nav = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Work', target: 'work' },
  { label: 'Contact', target: 'contact' },
  { label: 'CV', target: 'cv' },
]

/* ── 2. Hero ───────────────────────────────────────────────────────── */
export const hero = {
  greeting: "hi there, i'm", // small handwritten note above the name
  name: 'Asanda Charmaine Thabethe',
  // Big tagline: the highlighted word gets the marker-pen highlight.
  tagline: 'Building things',
  highlightWord: 'end to end.',
  subtitle: 'Frontend Developer · Cloud · AI-Integrated Systems',
  image: 'assets/asanda-main.jpg',
  imageAlt: 'Asanda Charmaine Thabethe smiling, seated in a cream knit jumper',
  stickerNote: 'currently shipping ✦', // handwritten note beside the portrait
}

/* ── 3. About This Portfolio ───────────────────────────────────────── */
export const aboutPortfolio = {
  heading: 'About This Portfolio',
  text: 'I built this portfolio with AI-assisted development. It started as a mood board full of pinks, stickers and scrapbook textures, and I brought it to life in React, Tailwind CSS and GSAP with Claude Code as my pair programmer. I made the design decisions, reviewed every component and kept tweaking until it felt like me: playful, warm and a little bit girly, but still clean, fast and accessible.',
}

/* ── 4. About Me ───────────────────────────────────────────────────── */
export const aboutMe = {
  heading: 'About Me',
  image: 'assets/asanda-about.jpg',
  imageAlt: 'Asanda standing in a grey coat and brown dress, wearing an event lanyard',
  paragraphs: [
    "I'm a Frontend Developer and Computer Science Diploma student at Tshwane University of Technology, finishing in December 2026. I love turning complex problems into interfaces that feel simple, clear and a little bit delightful.",
    'At ICEP in Pretoria I helped build the Timetable and Venue Management System for TUT, working side by side with developers, business analysts and product managers. I care about clean, accessible, responsive UI, and I’m always learning, whether that’s at a hackathon or an event on AI and the future of work.',
  ],
}

/* ── 5. Experience (newest first) ──────────────────────────────────── */
export const experience = {
  heading: 'Experience',
  entries: [
    {
      role: 'Frontend Developer',
      date: 'July 2026 — Present',
      company: 'ICEP',
      location: 'Pretoria',
      summary:
        'At ICEP I was part of the team behind one of the strongest systems the company has delivered: the Timetable and Venue Management System for Tshwane University of Technology.',
      bullets: [
        "Built the frontend of TUT's Timetable and Venue Management System, turning complex scheduling and venue information into clear, responsive screens that students and staff can use with ease.",
        'Worked in a cross-functional team of developers, business analysts and product managers, translating requirements and user needs into polished, working features.',
        'Collaborated closely with the backend developers to bring the interface together with the system behind it, and refined the UI through feedback, testing and review.',
        'Helped deliver a system the team counts among the best ICEP has built.',
      ],
    },
    // ── Add more roles below by copying the block above.
  ],
}

/* ── 6. Tech Stack (plain lists, no ratings) ───────────────────────── */
export const skills = {
  heading: 'Tech Stack',
  groups: [
    {
      label: 'Frontend',
      items: [
        'HTML5',
        'CSS3',
        'JavaScript (ES6+)',
        'TypeScript',
        'React',
        'Next.js',
        'Vite',
        'Tailwind CSS',
        'Bootstrap',
        'Sass',
        'Responsive Design',
        'Web Accessibility',
        'REST APIs',
        'JSON',
      ],
    },
    {
      label: 'Backend & Data',
      items: ['Java', 'MySQL', 'SQL'],
    },
    {
      label: 'Tools & Workflow',
      items: ['Git', 'GitHub', 'VS Code', 'Figma', 'npm', 'Chrome DevTools', 'AI-Assisted Development'],
    },
    {
      label: 'Also exploring',
      items: ['Cloud Computing', 'AI Integration'],
    },
  ],
}

/* ── 7. Notable Projects (shown as the draggable "Work" gallery) ───── */
// imageFit: 'cover' fills the frame (good for website screenshots);
//           'contain' shows the whole image (good for covers / portrait shots).
// link: leave '' to hide the link, or add a live URL / GitHub repo.
export const projects = {
  heading: 'Notable Projects',
  note: 'things i’ve helped bring to life',
  items: [
    {
      title: 'ARMS',
      subtitle: 'Academic Resource Management System',
      category: 'Web System · TUT',
      year: '2026',
      description:
        "ARMS is Tshwane University of Technology's Academic Resource Management System: a web platform that helps the university plan and manage its academic resources. It's built around one simple idea from its landing page: when we manage time better, we make room for success.",
      roleLabel: 'My role: Frontend Developer',
      highlights: [
        'Developed responsive, user-friendly interfaces, from the public landing page through to the signed-in experience.',
        'Built the landing experience: a full-width hero image carousel, clear navigation (Home, About, FAQs, Terms, Privacy) and a prominent sign-in entry point.',
        'Implemented light and dark mode so the system is comfortable to use at any time of day.',
        'Worked with backend developers, business analysts and product managers to turn requirements into consistent, polished UI.',
      ],
      image: 'assets/projects/arms.jpg',
      imageAlt: 'ARMS landing page: "Academic Resource Management System" over a photo of students working together',
      imageFit: 'cover',
      imagePosition: 'left center',
      link: 'https://arms-frontend-roji.onrender.com/',
      linkLabel: 'View project',
    },
    {
      title: 'Unify Tech',
      subtitle: 'The Developers Handbook',
      category: 'Publication · Team project',
      year: '2026',
      description:
        'The Developers Handbook is a guide written by the Unify Tech team: five developers (Vhugala Mathivha, Boitumelo Magashula, Hlulani Ndlovu, Asanda Thabethe and Nyiko Tsonani) sharing what we’ve learned about building software together. Like the puzzle on its cover, each of us brought a different piece.',
      roleLabel: 'My role: Co-author & Frontend Developer',
      highlights: [
        'Co-authored the handbook as one of its five writers.',
        'Brought the frontend perspective: how we approach UI, user experience and turning designs into working interfaces.',
        'Collaborated on structure and reviews so the handbook reads as one clear, unified guide.',
      ],
      image: 'assets/projects/unify-tech.jpg',
      imageAlt: 'Cover of Unify Tech: The Developers Handbook, showing the five authors as puzzle pieces',
      imageFit: 'contain',
      link: 'https://unify-tech-developers-handbook.onrender.com/',
      linkLabel: 'View project',
    },
    // ── More projects coming soon: copy a block above to add one.
  ],
}

/* ── 8. Education ──────────────────────────────────────────────────── */
export const education = {
  heading: 'Education',
  entries: [
    {
      qualification: 'Diploma in Computer Science',
      date: 'Expected completion: 31 December 2026',
      institution: 'Tshwane University of Technology',
      description: '',
    },
    {
      qualification: 'Grade 10 – Grade 12',
      date: '2018 — 2020',
      institution: 'Hlabangemehlo Secondary School',
      description: '',
    },
  ],
}

/* ── 8b. Events ────────────────────────────────────────────────────── */
export const events = {
  heading: 'Events',
  entries: [
    {
      title: '8th Annual Tshwane Varsity Hackathon (TVH)',
      date: '20 — 22 September 2026',
      place: 'Ga-Rankuwa Campus',
      tag: 'Hackathon',
      // Photos shown as a shuffleable stack. The first one starts on top.
      // Add portrait: true for tall photos so their card is the right shape.
      photos: [
        { src: 'assets/events/tvh-1.jpg', alt: 'Black "HACKER" T-shirt printed with #8thAnnualTVH', portrait: true },
        { src: 'assets/events/tvh-2.jpg', alt: 'Asanda in a bucket hat taking a playful selfie in the hackathon hall', portrait: true },
        { src: 'assets/events/tvh-3.jpg', alt: 'Asanda holding a camera and smiling at the hackathon', portrait: true },
        { src: 'assets/events/tvh-4.jpg', alt: 'Selfie with fellow participants around a table in the hackathon hall' },
        { src: 'assets/events/tvh-5.jpg', alt: 'Group photo of all the hackathon participants on stage' },
      ],
      paragraphs: [
        'My team and I were handed a real problem statement and a tight deadline to solve it. We planned our work in sprints, completed every sprint on time and presented a working final project to the judges.',
        "We didn't make it to the finals, but I left with something just as valuable: hands-on experience building at speed alongside other developers, making decisions under pressure and shipping as a team.",
      ],
    },
    {
      title: 'IFOW: Institute for the Future of Work',
      date: '30 September — 1 October 2026',
      place: 'Menlyn Maine, Pretoria',
      tag: 'Networking & Learning',
      photos: [
        { src: 'assets/events/ifow-1.jpg', alt: 'Large group photo of attendees outside the venue at Menlyn Maine' },
        { src: 'assets/events/ifow-2.jpg', alt: 'Attendees gathered around a table during the event' },
      ],
      paragraphs: [
        "I connected with business owners and fellow attendees, and learned about small-business start-ups and how they shape (and are shaped by) South Africa's economy.",
        'I also learned how AI actually works, and how to use it responsibly and effectively, something I now bring into the way I build.',
      ],
    },
  ],
}

/* ── 9. Contact ────────────────────────────────────────────────────── */
export const contact = {
  heading: 'Contact',
  intro: "Open to opportunities, collaborations and good conversations. Say hello!",
  email: 'asandacharmaine465@gmail.com',
  linkedin: 'https://www.linkedin.com/in/asanda-charmaine-thabethe-952a22405/',
  github: 'https://github.com/asanda-charmaine',
  phone: '+27 82 541 5729', // shown as text
  phoneHref: '+27825415729', // digits only, used for the tel: link
}

/* ── 9b. CV ─────────────────────────────────────────────────────────── */
// When the CV is ready: put the PDF in /public/assets/ (e.g. assets/asanda-thabethe-cv.pdf)
// and set `file` to that path. While `file` is '', the button shows the message below.
export const cv = {
  heading: 'CV',
  intro: 'Want the full picture? Grab a copy of my CV.',
  buttonLabel: 'Download my CV',
  file: '', // e.g. 'assets/asanda-thabethe-cv.pdf'
  unavailableTitle: 'CV coming soon',
  unavailableMessage: 'Oops, I will attach my updated CV soon. Thank you for Viewing. Please contact me.',
  contactLabel: 'Contact me',
}

/* ── 10. "Play" notebook (personal editorial section) ──────────────── */
// A recipe-style page about how Asanda builds websites.
export const notebook = {
  eyebrow: 'a recipe from my desk',
  title: 'A Lovely Website',
  subtitleNote: 'the way i build things:\nwith care, colour and a lot of coffee',
  marginNote: 'no shortcuts.\njust good code.',
  intro:
    "Every website I build starts the same way: with people, not pixels. This is the recipe I picked up building TUT's Timetable and Venue Management System at ICEP, sprinting through the Tshwane Varsity Hackathon and making this very portfolio. Follow it loosely, and taste as you go.",
  listHeading: "What you'll need:",
  list: [
    { qty: '1 cup', item: 'HTML & CSS', aside: '(the foundation)' },
    { qty: '2 tbsp', item: 'JavaScript & React', aside: '' },
    { qty: 'a handful', item: 'of Tailwind CSS', aside: '(for speed)' },
    { qty: '1 scoop', item: 'Java & MySQL', aside: '(for the backend bits)' },
    { qty: 'a pinch', item: 'of GSAP', aside: '(for the sparkle)' },
    { qty: 'lots', item: 'of curiosity, teamwork & coffee', aside: '' },
  ],
  listScribble: '^ the curiosity is not optional. neither is the coffee.',
  stepsHeading: 'How it goes:',
  // Each step shows a real photo of Asanda. imagePosition (optional) picks which
  // part of the photo stays in the square frame, e.g. 'center top'.
  steps: [
    {
      heading: 'Start with the people',
      body: 'Before writing any code, I listen. I sit with business analysts, product managers and the people who’ll actually use the system, and turn what they need into a clear plan.',
      aside: 'a great feature starts with a good question',
      image: 'assets/events/tvh-4.jpg',
      imageAlt: 'A selfie with fellow participants around a table at the hackathon',
      imagePosition: 'center',
    },
    {
      heading: 'Sketch the look',
      body: 'Next comes the fun part: layouts, colours and the little details. I sketch the screens and flows first, so everyone can see the idea before it’s built.',
      aside: 'pink is always an option',
      image: 'assets/events/tvh-3.jpg',
      imageAlt: 'Asanda holding a camera and smiling at the hackathon',
      imagePosition: 'center 30%',
    },
    {
      heading: 'Build it piece by piece',
      body: 'I build the interface in small, reusable React components, styled with Tailwind CSS and connected to the data behind them. Clean code now means fewer headaches later.',
      aside: 'headphones on, playlist loaded',
      image: 'assets/asanda-about.jpg',
      imageAlt: 'Asanda standing in a grey coat and brown dress, wearing an event lanyard',
      imagePosition: 'center 20%',
    },
    {
      heading: 'Add the colour & care',
      body: 'Then I polish: smooth animations, light and dark mode, and making sure it works for everyone, on every screen size, keyboard and screen reader included.',
      aside: 'accessibility is part of the design, not an extra',
      image: 'assets/events/tvh-2.jpg',
      imageAlt: 'Asanda in a bucket hat taking a playful selfie',
      imagePosition: 'center 30%',
    },
    {
      heading: 'Test, ship & celebrate',
      body: 'Finally I test, fix and review with the team, then ship it on time, sprint by sprint, the way we did at the hackathon. And then I celebrate, of course.',
      aside: 'the best part? celebrating together',
      image: 'assets/events/tvh-5.jpg',
      imageAlt: 'Hackathon participants celebrating together on stage',
      imagePosition: 'center',
    },
  ],
  closing: 'A website is never just code. It’s care you can click on.',
  sign: '— Asanda',
}

/* ── Play board: draggable stickers above the notebook ─────────────── */
// `color` is one of: pink, butter, sage, blush, sky, sand
export const stickers = [
  { text: 'hello!', color: 'butter', shape: 'blob', x: 8, y: 10, rotate: -8 },
  { text: '</>', color: 'pink', shape: 'circle', x: 30, y: 52, rotate: 6 },
  { text: 'ship it', color: 'sage', shape: 'pill', x: 46, y: 8, rotate: -4 },
  { text: 'cloud', color: 'sky', shape: 'blob', x: 68, y: 62, rotate: 9 },
  { text: 'AI + me', color: 'blush', shape: 'pill', x: 10, y: 72, rotate: 5 },
  { text: 'AT', color: 'sand', shape: 'circle', x: 80, y: 34, rotate: -10 },
]

/* ── Intro loader: cartoon stickers placed one by one ─────────────── */
// Put the original images in /sticker-originals and run `npm run stickers`
// (it also runs automatically with npm run dev / build). Backgrounds are
// removed and a white sticker outline is added for you.
export const intro = {
  enabled: true,
  shuffle: true, // random order on every visit; set false to keep A→Z file order
  minSeconds: 5, // the whole sequence takes between minSeconds…
  maxSeconds: 10, // …and maxSeconds, depending on how many images there are
  skipLabel: 'Skip intro',
}

/* ── Decorative stickers around the page ───────────────────────────── */
// Cartoon stickers that sit in the page margins (click them: they dance!).
//   sticker: file name in /public/assets/stickers (without .webp)
//   section: id of the section it sits beside
//   side:    'left' or 'right' margin
//   at:      how far down the section, 0 = top, 1 = bottom
//   size:    width in px on wide screens
//   mobile:  true = also show a small one beside the section title on phones
export const decorStickers = [
  { sticker: 'aesthetic-pink-laptop-coffee-png-sticker', section: 'about-portfolio', side: 'left', at: 0.15, size: 170, rotate: -8, mobile: true },
  { sticker: 'pink-aesthetic-printable-sticker-in-my-t', section: 'about-portfolio', side: 'right', at: 0.55, size: 160, rotate: 7 },
  { sticker: 'a-cute-die-cut-sticker-illustration-of-a', section: 'about', side: 'left', at: 0.35, size: 150, rotate: 6, mobile: true },
  { sticker: 'download-6', section: 'about', side: 'right', at: 0.45, size: 120, rotate: -10 },
  { sticker: 'cute-die-cut-sticker-illustration-with-b', section: 'experience', side: 'right', at: 0.15, size: 170, rotate: 6, mobile: true },
  { sticker: 'download-5', section: 'experience', side: 'left', at: 0.6, size: 160, rotate: -7 },
  { sticker: 'isolated-die-cut-sticker-illustration-of-4', section: 'skills', side: 'left', at: 0.2, size: 160, rotate: -5, mobile: true },
  { sticker: 'download-7', section: 'skills', side: 'right', at: 0.6, size: 130, rotate: 9 },
  { sticker: 'a-charming-die-cut-sticker-illustration', section: 'work', side: 'left', at: 0.05, size: 170, rotate: -6 },
  { sticker: 'isolated-die-cut-sticker-illustration-of', section: 'education', side: 'right', at: 0.2, size: 165, rotate: 6, mobile: true },
  { sticker: 'a-cute-die-cut-sticker-illustration-of-a-2', section: 'events', side: 'left', at: 0.12, size: 140, rotate: -6, mobile: true },
  { sticker: 'download-4', section: 'events', side: 'right', at: 0.5, size: 110, rotate: 12 },
  { sticker: 'isolated-die-cut-sticker-illustration-of-3', section: 'contact', side: 'right', at: 0.25, size: 170, rotate: 5, mobile: true },
  { sticker: 'a-cute-die-cut-sticker-illustration-of-a-3', section: 'cv', side: 'left', at: 0.1, size: 120, rotate: -7, mobile: true },
  { sticker: 'isolated-die-cut-sticker-illustration-of-2', section: 'play', side: 'right', at: 0.45, size: 160, rotate: 6 },
]

/* ── Cursor flowers ────────────────────────────────────────────────── */
// Three pink flowers that trail the mouse (desktop only). Set enabled: false to turn off.
export const cursorFlowers = {
  enabled: true,
  sizes: [36, 27, 19], // closest to the cursor first
  colors: ['#EC5C93', '#F48FB1', '#F7B6CF'],
}

/* ── 11. Footer ────────────────────────────────────────────────────── */
// Dock icons are built in (LinkedIn, GitHub, Gmail) and use the links
// from `contact` above. Tool logos: replace the PNGs in /public/assets/tools/.
export const tools = [
  { name: 'VS Code', image: 'assets/tools/vscode.png' },
  { name: 'React', image: 'assets/tools/react.png' },
  { divider: true },
  { name: 'Java', image: 'assets/tools/java.png' },
  { name: 'GitHub', image: 'assets/tools/github.png' },
  { divider: true },
  { name: 'Claude', image: 'assets/tools/claude.png' },
]

export const footer = {
  kicker: 'thanks for stopping by, lovely',
  heading: 'Let’s build something',
  highlight: 'beautiful',
  note: 'say hi, send a project, or just share a cute dog photo',
  madeWith: 'made with love, React, GSAP & a little help from Claude',
  // Moving stickers in the footer (file names in /public/assets/stickers, without .webp).
  // motion: 'sway' | 'bob' | 'wobble' | 'hop'. Click them and they dance too.
  stickers: [
    { sticker: 'pink-aesthetic-printable-sticker-in-my-t', motion: 'sway', size: 190, x: '11%', y: '18%', rotate: -8 },
    { sticker: 'download-4', motion: 'bob', size: 120, x: '10%', y: '64%', rotate: 10 },
    { sticker: 'aesthetic-pink-laptop-coffee-png-sticker', motion: 'wobble', size: 190, x: '80%', y: '16%', rotate: 7 },
    { sticker: 'a-cute-die-cut-sticker-illustration-of-a-2', motion: 'hop', size: 140, x: '84%', y: '56%', rotate: -6 },
  ],
  copyright: `© ${new Date().getFullYear()} Asanda Charmaine Thabethe`,
}
