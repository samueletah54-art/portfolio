import { Arrow, BarberQr, BrowserMock, DraftPage, Flower, IdCard, PaperStar, Photo, Pill, Scallop, Scribble } from "@/components/bits";
import { ContactForm, RevealOnScroll, StickyNav } from "@/components/client";

/* ------------------------------------------------------------------
   EDIT ME — everything personal lives here.
   Photos: drop files in /public/photos and set the paths below.
------------------------------------------------------------------- */
const ME = {
  whatsappDisplay: "+237 656 147 565",
  whatsapp: "237656147565",
  instagram: "samuelisco22",
  x: "samuel_izko",
  email: "", // ← add the email you want public; the email button and link appear automatically
  uniYears: "", // ← e.g. "2018 – 2021"; hidden while empty
  photos: {
    me: undefined as string | undefined, // e.g. "/photos/samuel.jpg" or the clay avatar
    barberHome: undefined as string | undefined,
    barberBooking: undefined as string | undefined,
    examina: "/photos/examina-1200.webp" as string | undefined,
    writes: undefined as string | undefined,
    theLine: "/photos/theline-1200.webp" as string | undefined,
  },
};

const NAV = [
  { id: "intro", label: "Intro" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const TOP = "SAMUEL".split("");
const BOTTOM = "ETAH".split("");

export default function Home() {
  return (
    <main id="top">
      <RevealOnScroll />

      {/* ============ COVER ============ */}
      <header className="cover">
        <div className="collage" aria-hidden="true">
          <div className="scrap scrap--1">
            <p>Yaoundé, le 3 mars — mon cher ami, je t&apos;écris enfin depuis la colline, les manguiers sont en fleur…</p>
          </div>
          <div className="scrap scrap--2">
            <p>remember to call mum on sunday · buy ink · the letters came late again this week</p>
          </div>
          <div className="scrap scrap--3">
            <p>14 rue des Palmiers — reçu avec mille remerciements, à bientôt, S.</p>
          </div>
          <div className="scrap scrap--sky" />
          <div className="scrap scrap--marble scrap--marble-a" />
          <div className="scrap scrap--marble scrap--marble-b" />
          <div className="scrap scrap--gingham" />
        </div>

        <div className="notebook" data-reveal>
          <div className="notebook__rings" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => (
              <i key={i} />
            ))}
          </div>

          <h1 className="ransom" aria-label="Samuel Etah">
            <span className="ransom__row" aria-hidden="true">
              {TOP.map((l, i) => (
                <span key={i} className={`tear tear--${i % 2 ? "pink" : "blue"} tear--r${i % 4}`}>
                  {l}
                </span>
              ))}
            </span>
            <span className="sticker" aria-hidden="true">Creative</span>
            <span className="ransom__row ransom__row--2" aria-hidden="true">
              {BOTTOM.map((l, i) => (
                <span key={i} className={`tear tear--${i % 2 ? "blue" : "pink"} tear--r${(i + 2) % 4}`}>
                  {l}
                </span>
              ))}
            </span>
          </h1>

          <p className="tagline">
            <span className="tagline__pill">Code. Secure. Create.</span>
          </p>

          <PaperStar className="deco deco--star-big" />
          <PaperStar className="deco deco--star-red" color="#C45A4C" />
          <PaperStar className="deco deco--star-tan" color="#E3C99A" />
        </div>

        <Flower className="deco deco--flower" />
        <Flower className="deco deco--flower-sm" color="#E7B6DA" />
        <Flower className="deco deco--flower-xs" color="#3E4B8C" />

        <a href="#intro" className="cover__hint">
          scroll, it gets better
          <Arrow className="cover__arrow" />
        </a>
      </header>

      <StickyNav items={NAV} />

      {/* ============ MANIFESTO — Code. Secure. Create. ============ */}
      <section className="sec sec--yellow manifesto" aria-label="Code. Secure. Create.">
        <div className="sec__meta">
          <span>@{ME.instagram}</span>
          <span>{ME.whatsappDisplay}</span>
        </div>
        <ol className="manifesto__list">
          <li className="mf mf--1" data-reveal>
            <span className="mf__num">01</span>
            <span className="mf__word">Code.</span>
            <span className="mf__note">websites for people who&apos;d rather be running their business</span>
          </li>
          <li className="mf mf--2" data-reveal>
            <span className="mf__num">02</span>
            <span className="mf__word">Secure.</span>
            <span className="mf__note">learning to break things before someone else does</span>
          </li>
          <li className="mf mf--3" data-reveal>
            <span className="mf__num">03</span>
            <span className="mf__word">Create.</span>
            <span className="mf__note">explainer videos, and words that sound like a person</span>
          </li>
        </ol>
      </section>
      <Scallop to="pink" />

      {/* ============ HELLO ============ */}
      <section id="intro" className="sec sec--pink hello" aria-labelledby="hello-h">
        <div className="hello__text" data-reveal>
          <h2 id="hello-h" className="mega">Hello!</h2>
          <p className="lead">
            I build websites for small businesses, cut explainer videos, and write things people actually finish
            reading. I&apos;m based in Yaoundé, Cameroon, and I work with clients anywhere with an internet connection.
          </p>
          <p className="lead">
            Lately I&apos;ve also been learning security: breaking things on purpose in Kali so the sites I ship
            don&apos;t break by accident.
          </p>
          <aside className="postit" aria-label="What I'm doing right now">
            <p className="postit__h">currently →</p>
            <ul>
              <li>building Examina</li>
              <li>German A1 (lent, très lent)</li>
              <li>breaking things in Kali</li>
            </ul>
          </aside>
        </div>

        <div className="hello__photo" data-reveal>
          {ME.photos.me ? (
            <Photo src={ME.photos.me} alt="Samuel Etah" label="" className="frame--portrait" />
          ) : (
            <IdCard />
          )}
          <div className="bubble">
            I&apos;m
            <br />
            Samuel
            <br />
            Etah
          </div>
        </div>
        <div className="hello__bumps" aria-hidden="true" />
      </section>

      {/* ============ EDUCATION ============ */}
      <section id="education" className="sec sec--blue edu" aria-labelledby="edu-h">
        <h2 id="edu-h" className="mega mega--center mega--white" data-reveal>
          Where I
          <br />
          learned
        </h2>
        <div className="edu__cards">
          <article className="cloudcard notch-r" data-reveal>
            <h3>University of Yaoundé&nbsp;I</h3>
            <p className="cloudcard__when">{ME.uniYears || "Licence"}</p>
            <p>
              International Relations. Years of reading, arguing and writing to deadlines. It turns
              out that&apos;s most of what client work is.
            </p>
          </article>
          <article className="cloudcard notch-l" data-reveal>
            <h3>Courses &amp; certificates</h3>
            <p className="cloudcard__when">ongoing</p>
            <p>
              Cybersecurity on hackpath.dev, with Kali Linux in VirtualBox. Claude 101 at Anthropic Academy. German
              A1, in progress.
            </p>
          </article>
        </div>
      </section>
      <Scallop to="yellow" />

      {/* ============ EXPERIENCE — pinned index cards ============ */}
      <section id="experience" className="sec sec--yellow exp" aria-labelledby="exp-h">
        <h2 id="exp-h" className="mega" data-reveal>
          What I
          <br />
          do
        </h2>
        <p className="exp__aside" data-reveal>
          three jobs, one person
          <Arrow className="exp__arrow" />
        </p>
        <div className="exp__list">
          <article className="card card--r1" data-reveal>
            <i className="pin pin--red" aria-hidden="true" />
            <p className="card__when">now</p>
            <h3>Freelance web developer</h3>
            <p>
              Websites for local businesses in Yaoundé, plus cafés, barbers and trades abroad that never got round to
              having one. I design, build and launch, and you deal with one person the whole way through.
            </p>
          </article>
          <article className="card card--r2" data-reveal>
            <i className="pin pin--blue" aria-hidden="true" />
            <p className="card__when">now</p>
            <h3>Video editor</h3>
            <p>
              Vox-style motion explainers in CapCut: maps, moving type, archive footage. Good for turning a dense topic
              into three minutes someone will watch to the end.
            </p>
          </article>
          <article className="card card--r3" data-reveal>
            <i className="pin pin--yellow" aria-hidden="true" />
            <p className="card__when">2025</p>
            <h3>Ghostwriter</h3>
            <p>
              Wrote under other people&apos;s names. I can&apos;t show you that work, which is the point. These days
              I write website copy too, so the words and the design get built together.
            </p>
          </article>
        </div>
      </section>
      <Scallop to="pink" />

      {/* ============ SKILLS — stickers on a laptop lid ============ */}
      <section id="skills" className="sec sec--pink skills" aria-labelledby="skills-h">
        <h2 id="skills-h" className="mega mega--center" data-reveal>
          My
          <br />
          toolbox
        </h2>
        <div className="laptop" data-reveal>
          <ul className="laptop__lid" aria-label="Skills">
            <li className="stk stk--pill stk--blue" style={{ ["--r" as string]: "-6deg" }}>HTML</li>
            <li className="stk stk--round stk--yellow" style={{ ["--r" as string]: "8deg" }}>CSS</li>
            <li className="stk stk--pill stk--paper" style={{ ["--r" as string]: "3deg" }}>JavaScript</li>
            <li className="stk stk--rect stk--ink" style={{ ["--r" as string]: "-4deg" }}>Next.js</li>
            <li className="stk stk--pill stk--pink" style={{ ["--r" as string]: "5deg" }}>WordPress</li>
            <li className="stk stk--star" style={{ ["--r" as string]: "-10deg" }}>CapCut</li>
            <li className="stk stk--rect stk--yellow" style={{ ["--r" as string]: "2deg" }}>Copywriting</li>
            <li className="stk stk--pill stk--blue" style={{ ["--r" as string]: "-3deg" }}>Ghostwriting</li>
            <li className="stk stk--round stk--ink stk--small" style={{ ["--r" as string]: "12deg" }}>Kali Linux</li>
            <li className="stk stk--rect stk--pink" style={{ ["--r" as string]: "-7deg" }}>Security basics</li>
            <li className="stk stk--pill stk--paper" style={{ ["--r" as string]: "4deg" }}>Claude Code</li>
          </ul>
          <div className="laptop__base" aria-hidden="true" />
        </div>
        <p className="handnote" data-reveal>
          no progress bars, sorry. nobody is &ldquo;87% at CSS&rdquo;
          <Scribble className="handnote__line" />
        </p>
      </section>
      <Scallop to="blue" />

      {/* ============ PROJECT 1 — feature (blue, two photos) ============ */}
      <section id="projects" className="sec sec--blue projA" aria-labelledby="p1-h">
        <div className="sec__meta sec__meta--light">
          <span>05 / Things I&apos;ve built</span>
          <span>1 of 4</span>
        </div>
        <div className="projA__top">
          <h2 id="p1-h" className="mega mega--white" data-reveal>
            Fresh
            <br />
            cut
          </h2>
          <div className="projA__copy" data-reveal>
            <Pill tone="yellow" className="pill--lg">B&amp;W Barbershop</Pill>
            <p>
              A website for a barbershop here in Yaoundé. You see the cuts, pick one, and book straight through
              WhatsApp, which is where the clients already are. There&apos;s a QR code on the shop wall that opens the
              booking form, so walk-ins can book their next cut on the spot.
            </p>
            <a className="visit visit--light" href="https://bw-barbershop.vercel.app" target="_blank" rel="noopener">
              see it live ↗
            </a>
          </div>
        </div>
        <div className="projA__photos">
          <div className="projA__shot" data-reveal>
            {ME.photos.barberHome ? (
              <Photo src={ME.photos.barberHome} alt="B&W Barbershop homepage" label="" tape />
            ) : (
              <BrowserMock url="bw-barbershop.vercel.app" title="B&W Barbershop" note="cuts · prices · book on WhatsApp" />
            )}
            <Pill tone="pink" className="pill--lg pill--overlap">The website</Pill>
          </div>
          <div className="projA__shot projA__shot--qr" data-reveal>
            <BarberQr />
            <Pill tone="pink" className="pill--lg pill--overlap">The QR on the wall</Pill>
          </div>
        </div>
        <div className="projA__hill" aria-hidden="true" />
      </section>

      {/* ============ PROJECT 2 — Examina (yellow, cloud panel) ============ */}
      <section className="sec sec--yellow projC" aria-labelledby="p2-h">
        <div className="projC__left">
          <h2 id="p2-h" className="mega" data-reveal>
            My own
            <br />
            thing
          </h2>
          <div className="projC__panel notch-lr" data-reveal>
            <p>
              <strong>Global Examina</strong> is an exam-prep platform I&apos;m building for Cameroonian students
              sitting the GCE Ordinary and Advanced Levels.
            </p>
            <p>
              Right now most GCE prep lives in scattered PDFs and WhatsApp forwards, and Examina is my attempt to put
              it all in one place that works.
            </p>
          </div>
        </div>
        <div className="projC__shot" data-reveal>
          <Pill tone="blue" className="pill--lg pill--tab">Global Examina</Pill>
          <Photo src={ME.photos.examina} alt="Global Examina platform" label="Global Examina screenshot" className="frame--tall" />
        </div>
      </section>
      <Scallop to="blue" />

      {/* ============ PROJECTS 3–6 — scrapbook board ============ */}
      <section className="sec sec--blue board" aria-labelledby="board-h">
        <h2 id="board-h" className="mega mega--white" data-reveal>
          And the
          <br />
          rest
        </h2>
        <p className="board__note" data-reveal>still glued in, some still drying</p>
        <div className="board__grid">

          <article className="snap snap--b" data-reveal>
            <div className="snap__polaroid snap__polaroid--tape">
              {ME.photos.writes ? (
                <Photo src={ME.photos.writes} alt="Samuel Etah Writes blog" label="" className="frame--snap" />
              ) : (
                <DraftPage
                  title="Samuel Etah Writes"
                  lines={["my writing, in my own name", "built in WordPress", "going online soon"]}
                />
              )}
              <p className="snap__cap">Samuel Etah Writes</p>
            </div>
            <p>
              My ghostwriting blog, built in WordPress. It&apos;s where I write in my own name, so anyone thinking of
              hiring me to write in theirs can read first and decide.
            </p>
            <Pill tone="pink">blog · writing</Pill>
          </article>

          <article className="snap snap--c" data-reveal>
            <div className="snap__polaroid">
              <Photo src={ME.photos.theLine} alt="The Line website" label="The Line screenshot" className="frame--snap" />
              <p className="snap__cap">The Line</p>
            </div>
            <p>
              A digital history of partition, reunification and colonial memory in Cameroon, from 1884 to today.
              Archive material sits next to interviews with family elders and a historian. I&apos;m also cutting vertical shorts for it in a paper-collage style.
            </p>
            <Pill tone="yellow">website · video</Pill>
            <a className="visit" href="https://the-line-eight.vercel.app" target="_blank" rel="noopener">
              see it live ↗
            </a>
          </article>

        </div>
      </section>
      <Scallop to="pink" />

      {/* ============ CONTACT / THANK YOU ============ */}
      <section id="contact" className="sec sec--pink contact" aria-labelledby="contact-h">
        <h2 id="contact-h" className="mega" data-reveal>
          Got an
          <br />
          idea?
        </h2>
        <div className="contact__grid">
          <div className="contact__links" data-reveal>
            <p className="lead">Thanks for scrolling this far. Tell me what you&apos;re working on and I&apos;ll tell you honestly if I can help.</p>
            <a className="pill pill--yellow pill--lg" href={`https://wa.me/${ME.whatsapp}`} target="_blank" rel="noopener">
              WhatsApp · {ME.whatsappDisplay}
            </a>
            <a className="pill pill--blue pill--lg" href={`https://instagram.com/${ME.instagram}`} target="_blank" rel="noopener">
              Instagram · @{ME.instagram}
            </a>
            <a className="pill pill--white pill--lg" href={`https://x.com/${ME.x}`} target="_blank" rel="noopener">
              X · @{ME.x}
            </a>
            {ME.email && (
              <a className="pill pill--yellow pill--lg" href={`mailto:${ME.email}`}>
                {ME.email}
              </a>
            )}
          </div>
          <div className="contact__form" data-reveal>
            <ContactForm whatsapp={ME.whatsapp} email={ME.email} />
          </div>
        </div>
        <footer className="foot">
          <span className="foot__sig">— Sam</span>
          <span>© {new Date().getFullYear()} Samuel Etah · made by hand in Yaoundé, mostly at night</span>
          <a href="#top">back to the top ↑</a>
        </footer>
      </section>
    </main>
  );
}
