import Link from "next/link";

const coffees = [
  ["Indian Monsoon Malabar", "coffee-india"],
  ["Colombian Excels European Preparation", "coffee-colombia"],
  ["Honduras Mist Valley SHG", "coffee-honduras"],
  ["Tanzanian Velaris Noir", "coffee-tanzania"],
  ["Brasilia Santos", "coffee-brazil"],
];

export default function HomePage() {
  return <div className="sia-home">
    <section className="sia-hero" id="home"><div className="sia-container sia-hero-grid">
      <div><div className="sia-eyebrow">Small-batch specialty coffee</div><h1>Wake up to coffee that actually tastes alive.</h1>
      <p className="sia-lead">Distinctive origins. Thoughtful sourcing. Hand-roasted in small batches to bring out the character of every coffee.</p>
      <div className="sia-actions"><Link href="/shop" className="sia-button sia-button-light">Explore our coffees</Link><Link href="/about" className="sia-button sia-button-outline">Our story</Link></div></div>
      <img className="sia-hero-image" src="/assets/design/hero.png" alt="SIA Coffee bag, beans and branded cup" />
    </div></section>
    <div className="sia-facts"><div className="sia-container sia-fact-grid"><div><b>Small batch</b><span>Roasted with care</span></div><div><b>Five origins</b><span>Distinctive coffees</span></div><div><b>Traceable</b><span>Thoughtful sourcing</span></div><div><b>Freshness</b><span>Crafted for the cup</span></div></div></div>
    <section className="sia-section sia-container" id="coffee"><div className="sia-eyebrow">Explore our coffees</div><h2>Five coffees. Five distinct origins.</h2><p className="sia-intro">Explore five distinctive coffees, each with its own origin and character. SIA roasts light to medium to highlight what makes each coffee unique.</p>
      <div className="sia-coffee-grid">{coffees.map(([name,image])=><article className="sia-coffee-card" key={name}><img src={`/assets/design/${image}.png`} alt={`${name} coffee bag`} /><div className="sia-tag">Single origin</div><h3>{name}</h3><p>Discover this coffee in the SIA Coffee collection.</p><Link href="/shop" className="sia-card-link">Explore coffee</Link></article>)}</div>
    </section>
    <div className="sia-banner"><img src="/assets/design/coffee-range.png" alt="SIA Coffee range" /></div>
    <section className="sia-section sia-story" id="story"><div className="sia-container sia-story-grid"><img src="/assets/design/story.png" alt="SIA Coffee latte in a branded cup" /><div><div className="sia-eyebrow">Our story & sourcing</div><h2>Quality over quantity.</h2><h3>Why SIA Coffee?</h3><p>SIA Coffee started with one simple thing: a genuine love for coffee. What began as a personal passion grew through countless hours of learning, experimenting and refining the craft.</p><p>Today that spirit lives in every batch. The beans are hand roasted in small batches with care and precision to bring out the unique flavours of every origin.</p><h3>Impact & transparency</h3><p>A commitment to thoughtful sourcing, relationships with producers and a more transparent coffee journey.</p><h3>Roasting philosophy</h3><p>Light to medium roasting that respects the character of each origin.</p><Link href="/about" className="sia-button sia-button-outline">Read our story</Link></div></div></section>
    <section className="sia-section sia-container"><div className="sia-eyebrow">From farm to cup</div><h2>Every step matters.</h2><p className="sia-intro">SIA focuses on transparent sourcing and roasts in tiny batches so each coffee keeps the character of its origin.</p><div className="sia-process"><article><span>01 — Source</span><h3>Traceable origins</h3><p>Carefully selected coffees with distinctive origins.</p></article><article><span>02 — Roast</span><h3>Small-batch craft</h3><p>Roasting tuned to reveal clarity, sweetness and origin character.</p></article><article><span>03 — Brew</span><h3>Freshness first</h3><p>Coffee enjoyed as close to roast day as possible.</p></article></div></section>
    <section className="sia-section sia-wholesale"><div className="sia-container sia-wholesale-grid"><div><div className="sia-eyebrow">Trade & wholesale</div><h2>Serving SIA Coffee in your space.</h2><p>SIA works with cafés, offices and creative studios who want coffee that starts conversations.</p><Link href="/contact" className="sia-button sia-button-dark">Talk wholesale</Link></div><div className="sia-wholesale-panel"><h3>A straightforward roasting partner.</h3><p>Support can include dial-in help, staff training and brew recipes. Tell us about your venue for a tailored offer.</p><p>Dial-in support · Staff training · Brew recipes</p></div></div></section>
    <section className="sia-section sia-contact"><div className="sia-container"><div className="sia-eyebrow">SIA Coffee</div><h2>Great coffee. Clear sourcing. Small-batch craft.</h2><p>For general and wholesale enquiries, get in touch with SIA Coffee.</p><Link href="/contact" className="sia-button sia-button-light">Contact SIA Coffee</Link></div></section>
  </div>;
}
