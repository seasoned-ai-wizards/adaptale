import { RevealSlides } from "./Reveal";
import RevealNotes from "reveal.js/plugin/notes/notes";
import RevealZoom from "reveal.js/plugin/zoom/zoom";
import "./App.css";

function App() {
  return (
    <RevealSlides
      plugins={[RevealNotes, RevealZoom]}
      theme="sky"
      transition="slide"
      transitionSpeed="fast"
      controlsLayout="edges"
      minScale={1}
      maxScale={1}
      margin={0.04}
      width={"100%"}
    >
      {/* Title Slide */}
      <section>
        <h1 style={{color: "#205379", marginBottom: "0.7em"}}>DORA Security Framework</h1>
        <h3 style={{color: "#3179b0"}}>Digital Operational Resilience for the Enterprise</h3>
        <p style={{marginTop: "2em", color: "#3a3a3a"}}>Presented for Enterprise Customers</p>
      </section>

      {/* What is DORA? */}
      <section>
        <h2>What is DORA?</h2>
        <ul style={{fontSize: "1.22em", marginTop: "2em"}}>
          <li>
            <b>Digital Operational Resilience Act</b> (DORA) is an EU regulation for financial sector ICT risk.
          </li>
          <li>
            Focuses on <b>resilience</b>: preventing, withstanding, and recovering from ICT disruptions and attacks.
          </li>
          <li>
            Applies to banks, insurers, investment firms, and critical third-parties.<br />
            Takes effect: <b>January 2025</b>
          </li>
        </ul>
      </section>

      {/* Pillars Overview */}
      <section>
        <h2>DORA's Five Core Pillars</h2>
        <ol style={{fontSize: "1.15em", marginTop: "2em"}}>
          <li>ICT Risk Management</li>
          <li>ICT-Related Incident Management</li>
          <li>Digital Operational Resilience Testing</li>
          <li>ICT Third-Party Risk Management</li>
          <li>Information Sharing</li>
        </ol>
      </section>

      {/* ICT Risk Management */}
      <section>
        <section data-auto-animate>
          <h3>1. ICT Risk Management</h3>
          <img
            src="/dora/dora-ict-risk-management.png"
            alt="ICT Risk Management"
            // className="r-stretch"
            style={{maxHeight: "35vh", borderRadius: "1rem", margin: "1.2em 0"}}
          />
          <ul>
            <li>Identify, assess, and mitigate ICT & cyber risks</li>
            <li>Establish policies, controls, and continuous monitoring</li>
            <li>Integrate ICT into enterprise risk management</li>
          </ul>
        </section>
        <section data-auto-animate>
          <h4>Effective ICT Risk Management</h4>
          <ul>
            <li>Asset and dependency mapping</li>
            <li>Proactive vulnerability management</li>
            <li>Board-level oversight</li>
          </ul>
        </section>
      </section>

      {/* Incident Management */}
      <section>
        <section data-auto-animate>
          <h3>2. ICT Incident Management</h3>
          <img
            src="/dora/dora-incident-response.png"
            alt="Incident Response"
            // className="r-stretch"
            style={{maxHeight: "32vh", borderRadius: "1rem", margin: "1.2em 0"}}
          />
          <ul>
            <li>Detect, classify, and respond to ICT incidents</li>
            <li>Timely notifications to supervisors & stakeholders</li>
            <li>Ongoing incident recording & post-incident learning</li>
          </ul>
        </section>
        <section data-auto-animate>
          <h4>Incident Lifecycle</h4>
          <ul>
            <li>Prompt alerting on critical events</li>
            <li>Structured reporting workflow</li>
            <li>Use feedback for continual improvement</li>
          </ul>
        </section>
      </section>

      {/* Digital Operational Resilience Testing */}
      <section>
        <section data-auto-animate>
          <h3>3. Digital Operational Resilience Testing</h3>
          <img
            src="/dora/dora-operational-testing.png"
            alt="Operational Resilience Testing"
            // className="r-stretch"
            style={{maxHeight: "36vh", borderRadius: "1rem", margin: "1.2em 0"}}
          />
          <ul>
            <li>Simulated cyberattacks & scenario-based testing</li>
            <li>Demonstrate ability to withstand ICT disruptions</li>
            <li>Annual advanced testing for critical systems</li>
          </ul>
        </section>
        <section data-auto-animate>
          <h4>Why Resilience Testing Matters</h4>
          <ul>
            <li>Identify hidden weaknesses</li>
            <li>Improve response time and readiness</li>
            <li>Meet regulatory expectations and build trust</li>
          </ul>
        </section>
      </section>

      {/* Third-Party Risk Management */}
      <section>
        <section data-auto-animate>
          <h3>4. ICT Third-Party Risk Management</h3>
          <img
            src="/dora/dora-ict-risk-management.png"
            alt="Third-party Risk"
            // className="r-stretch"
            style={{maxHeight: "36vh", borderRadius: "1rem", margin: "1.2em 0"}}
          />
          <ul>
            <li>Identify & monitor critical suppliers</li>
            <li>Contractual controls for security & resilience</li>
            <li>Plan for exit/transition & concentration risks</li>
          </ul>
        </section>
        <section data-auto-animate>
          <h4>Supply Chain Security</h4>
          <ul>
            <li>Visibility across the ecosystem</li>
            <li>Joint incident response preparation</li>
            <li>Ongoing assurance and audits</li>
          </ul>
        </section>
      </section>

      {/* Information Sharing */}
      <section>
        <h3>5. Information Sharing</h3>
        <img
          src="/dora/dora-collaboration.png"
          alt="Information Sharing"
          // className="r-stretch"
          style={{maxHeight: "33vh", borderRadius: "1rem", margin: "1.2em 0"}}
        />
        <ul>
          <li>Participate in sector-specific intelligence groups</li>
          <li>Share threat information & best practices</li>
          <li>Enhances preparedness for all participants</li>
        </ul>
      </section>

      {/* Governance and Control */}
      <section>
        <h2>Governance & Control</h2>
        <img
          src="/dora/dora-governance.png"
          alt="Governance and DORA Compliance"
          // className="r-stretch"
          style={{maxHeight: "33vh", borderRadius: "1rem", margin: "1.2em 0"}}
        />
        <ul>
          <li>Board oversight of ICT and security risk</li>
          <li>Clear assignment of roles & responsibilities</li>
          <li>Document, test, and continuously review processes</li>
        </ul>
      </section>

      {/* Preparing for DORA */}
      <section>
        <h2>Preparing for DORA</h2>
        <ol style={{fontSize: "1.15em"}}>
          <li>Assess current ICT, risk, and third-party management maturity</li>
          <li>Update policies, procedures, and contracts</li>
          <li>Train teams and run realistic simulations</li>
          <li>Engage and monitor suppliers for compliance</li>
          <li>Regularly report risks & readiness to leadership</li>
        </ol>
      </section>

      {/* Summary & Benefits */}
      <section>
        <h2 style={{marginBottom: ".8em"}}>DORA: Enterprise Benefits</h2>
        <ul>
          <li>Boosts regulatory compliance and trust</li>
          <li>Reduces operational and financial risk</li>
          <li>Improves detection and response for cyber threats</li>
          <li>Strengthens resilience—protecting your organization and customers</li>
        </ul>
      </section>
    </RevealSlides>
  );
}

export default App;