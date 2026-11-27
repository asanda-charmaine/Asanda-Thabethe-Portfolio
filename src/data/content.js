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
  { label: 'Work', target: 'work' },
  { label: 'Play', target: 'play' },
  { label: 'About', target: 'about' },
  { label: 'Contact', target: 'contact' },
]

/* ── 2. Hero ───────────────────────────────────────────────────────── */
export const hero = {
  greeting: "hi there, i'm", // small handwritten note above the name
  name: 'Asanda Charmaine Thabethe',
  // Big tagline: the highlighted word gets the marker-pen highlight.
  tagline: 'Building things',
  highlightWord: 'end to end.',
  subtitle: 'Frontend Developer · Cloud · AI-Integrated Systems',
  image: 'assets/profile.png',
  imageAlt: 'Illustrated portrait of Asanda Charmaine Thabethe',
  stickerNote: 'currently shipping ✦', // handwritten note beside the portrait
}

/* ── 3. About This Portfolio ───────────────────────────────────────── */
export const aboutPortfolio = {
  heading: 'About This Portfolio',
  text: "[PLACEHOLDER] I built this portfolio with AI-assisted development. I started from a mood board and a list of sections, then worked in React, Tailwind CSS and GSAP alongside Claude Code, writing, reviewing and refining every component myself. It was a good test of how AI tools can speed up a developer's workflow without taking over the decisions. Edit this paragraph in src/data/content.js.",
}

/* ── 4. About Me ───────────────────────────────────────────────────── */
export const aboutMe = {
  heading: 'About Me',
  image: 'assets/about.png',
  imageAlt: 'Asanda at work, illustration placeholder',
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
      date: '[Month YYYY] — [Month YYYY]', // [PLACEHOLDER] add your dates
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
      year: '[YYYY]', // [PLACEHOLDER]
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
      link: '',
      linkLabel: 'View project',
    },
    {
      title: 'Unify Tech',
      subtitle: 'The Developers Handbook',
      category: 'Publication · Team project',
      year: '[YYYY]', // [PLACEHOLDER]
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
      link: '',
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
      date: '[Month YYYY]', // [PLACEHOLDER]
      place: 'Ga-Rankuwa Campus',
      tag: 'Hackathon',
      paragraphs: [
        'My team and I were handed a real problem statement and a tight deadline to solve it. We planned our work in sprints, completed every sprint on time and presented a working final project to the judges.',
        "We didn't make it to the finals, but I left with something just as valuable: hands-on experience building at speed alongside other developers, making decisions under pressure and shipping as a team.",
      ],
    },
    {
      title: 'IFOW: Institute for the Future of Work',
      date: '[Month YYYY]', // [PLACEHOLDER]
      place: 'Menlyn Maine, Pretoria',
      tag: 'Networking & Learning',
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
  phone: '+27 00 000 0000', // [PLACEHOLDER] shown as text
  phoneHref: '+27000000000', // [PLACEHOLDER] digits only, used for tel: link
}

/* ── 10. "Play" notebook (personal editorial section) ──────────────── */
// Pick any topic you like: a recipe, a ritual, a how-I-work guide…
export const notebook = {
  eyebrow: 'a page from my notebook',
  title: '[Placeholder Title]',
  subtitleNote: 'a short, warm line\nabout why this matters to you',
  marginNote: 'no shortcuts.\njust vibes.',
  intro:
    "[PLACEHOLDER] A short, personal intro. Tell people where this comes from and why you love it. Two or three sentences is plenty.",
  listHeading: "What you'll need:",
  list: [
    { qty: '1', item: 'placeholder item', aside: '' },
    { qty: '2', item: 'placeholder items', aside: '(or to taste)' },
    { qty: 'a pinch', item: 'of something', aside: '' },
    { qty: '1 cup', item: 'placeholder item', aside: '(the good stuff)' },
    { qty: 'lots', item: 'of patience', aside: '' },
  ],
  listScribble: '^ a little handwritten aside about one of the items',
  stepsHeading: 'How it goes:',
  steps: [
    {
      heading: 'Step one placeholder',
      body: '[PLACEHOLDER] A short description of the first step. Keep it to two or three sentences.',
      aside: 'a lowercase side note, like a scribble in the margin',
      image: 'assets/illustrations/step-1.png',
      imageAlt: 'Illustration for step one',
    },
    {
      heading: 'Step two placeholder',
      body: '[PLACEHOLDER] A short description of the second step.',
      aside: 'another little aside goes here',
      image: 'assets/illustrations/step-2.png',
      imageAlt: 'Illustration for step two',
    },
    {
      heading: 'Step three placeholder',
      body: '[PLACEHOLDER] A short description of the third step.',
      aside: "seriously, don't skip this one",
      image: 'assets/illustrations/step-3.png',
      imageAlt: 'Illustration for step three',
    },
    {
      heading: 'Step four placeholder',
      body: '[PLACEHOLDER] A short description of the fourth step.',
      aside: "you'll know it's right when it feels right",
      image: 'assets/illustrations/step-4.png',
      imageAlt: 'Illustration for step four',
    },
    {
      heading: 'Step five placeholder',
      body: '[PLACEHOLDER] A short description of the final step.',
      aside: 'best enjoyed with good company',
      image: 'assets/illustrations/step-5.png',
      imageAlt: 'Illustration for step five',
    },
  ],
  closing: '[PLACEHOLDER] A one-line closing thought.',
  sign: '— Asanda',
}

/* ── Play board: draggable stickers above the notebook ─────────────── */
// `color` is one of: terracotta, butter, sage, blush, sky, sand
export const stickers = [
  { text: 'hello!', color: 'butter', shape: 'blob', x: 8, y: 10, rotate: -8 },
  { text: '</>', color: 'terracotta', shape: 'circle', x: 30, y: 52, rotate: 6 },
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
  madeWith: 'made with React, GSAP, Lenis & a little help from Claude',
  copyright: `© ${new Date().getFullYear()} Asanda Charmaine Thabethe`,
}
