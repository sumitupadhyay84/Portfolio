# Portfolio Recreation (Next.js 15)

A production-ready 1:1-style recreation of [portfolio-alpha-lime-53.vercel.app](https://portfolio-alpha-lime-53.vercel.app/) with editable placeholder content for **Sumit Upadhyay**.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- GSAP (installed, ready for extension)
- Lenis smooth scrolling
- React Three Fiber (hero portrait + skills scene)
- React Icons / Lucide

## Project Structure

```txt
app/
components/
sections/
hooks/
lib/
constants/
public/
styles/
```

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Customize Content

Edit `constants/site.ts` for:

- Name, role, bio
- Email, phone, location
- Social links
- Skills, education, projects

Replace assets in `public/images/` and `public/svgs/`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repo in [Vercel](https://vercel.com/).
3. Framework preset: **Next.js**
4. Deploy with default settings.

## Notes

- Original site sections recreated: Hero, About, Skills, Certificates, Education, Projects, Contact.
- Loading screen, custom cursor, magnetic interactions, tilt cards, and scroll progress are included.
- Placeholder resume path: `public/pdfs/resume.pdf` (add your PDF before deploy).
