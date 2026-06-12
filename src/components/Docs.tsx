import { motion } from "framer-motion";
import {
  ArrowLeft, Book, Download, MonitorSmartphone, Layers, Maximize2, Grid3X3,
  HelpCircle, AlertTriangle, FileText, Ruler, Settings2, Shirt, Spline,
  TextCursorInput, Copy, Image, ListTree, History, ShieldCheck, SunMoon,
  EqualApproximately, ChevronRight, CheckCircle2, Tags
} from 'lucide-react';

interface DocsProps {
  onBack: () => void;
}

const sections = [
  { id: "getting-started", label: "Getting Started", icon: Book },
  { id: "installation", label: "Installation", icon: Download },
  { id: "system-requirements", label: "System Requirements", icon: MonitorSmartphone },
  { id: "scripts", label: "Scripts", icon: Layers },
  { id: "utilities", label: "Utilities", icon: Settings2 },
  { id: "tools", label: "Tools", icon: Grid3X3 },
  { id: "config", label: "Configuration", icon: Ruler },
  { id: "general", label: "General", icon: SunMoon },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "troubleshooting", label: "Troubleshooting", icon: AlertTriangle },
];

const featureCard = (title: string, desc: string, Icon: any) => (
  <div className="glass-panel rounded-xl p-5 flex items-start gap-4">
    <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center shrink-0">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  </div>
);

export default function Docs({ onBack }: DocsProps) {
  return (
    <div className="w-full min-h-screen bg-background text-foreground selection:bg-accent/50 dark overflow-x-hidden font-sans">
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-3">
            <img src="/sublify_logo.png" alt="Sublify Logo" className="w-8 h-8 object-contain" />
            <span className="font-black text-xl leading-none italic tracking-tight" style={{ fontFamily: "'Monument Extended Black Italic', sans-serif" }}>SUBLIFY</span>
            <span className="text-xs text-muted-foreground ml-1 hidden sm:inline">Docs</span>
          </div>
        </div>
      </header>

      <div className="flex pt-20">
        <aside className="hidden lg:block w-64 shrink-0 border-r border-border h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto">
          <nav className="p-6 space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <a key={id} href={`#${id}`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-all">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </aside>

        <div className="lg:hidden w-full overflow-x-auto border-b border-border bg-surface/50">
          <div className="flex gap-1 p-3 min-w-max">
            {sections.map(({ id, label, icon: Icon }) => (
              <a key={id} href={`#${id}`} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface whitespace-nowrap transition-all border border-border/50">
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <main className="flex-1 min-w-0 max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-20">

            {/* Getting Started */}
            <section id="getting-started">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Getting Started</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Sublify is a Windows desktop application that connects directly to Adobe Photoshop to automate sublimation print workflows. It takes your roster data, fills it into your open PSD, and outputs the finished files — all without manual layout work.
              </p>
              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  { step: "1", title: "Install", desc: "Download and run the Sublify installer on Windows." },
                  { step: "2", title: "Connect", desc: "Launch Photoshop, open Sublify, and connect via the built-in bridge." },
                  { step: "3", title: "Automate", desc: "Import a roster CSV and batch generate your designs in seconds." },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="glass-panel rounded-xl p-5 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center shrink-0">{step}</div>
                    <div>
                      <h3 className="font-semibold mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Installation */}
            <section id="installation">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center"><Download className="w-5 h-5 text-primary" /></div>
                <h2 className="text-3xl md:text-4xl font-bold">Installation</h2>
              </div>
              <div className="glass-panel rounded-xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Step 1: Download</h3>
                  <p className="text-muted-foreground">Click <strong>Download for Windows</strong> on the Sublify homepage. The installer (.exe) will be downloaded to your computer.</p>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">Step 2: Install</h3>
                  <p className="text-muted-foreground">Double-click the installer and follow the on-screen prompts. Sublify installs as a standalone application on your system.</p>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">Step 3: Launch & Connect</h3>
                  <p className="text-muted-foreground">Open Sublify from your Start Menu or desktop shortcut. The app will detect your Photoshop installation. Click <strong>Initialize Photoshop Connection</strong> in Settings to install the Sublify Bridge Runner — this allows Sublify to send commands to Photoshop.</p>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">Step 4: Activate License</h3>
                  <p className="text-muted-foreground">Enter your product key (format: XXXX-XXXX-XXXX-XXXX) in the Settings page. Online activation verifies your license via Keygen. Once activated, all features are unlocked.</p>
                </div>
              </div>
            </section>

            {/* System Requirements */}
            <section id="system-requirements">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center"><MonitorSmartphone className="w-5 h-5 text-primary" /></div>
                <h2 className="text-3xl md:text-4xl font-bold">System Requirements</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { title: "Operating System", items: ["Windows 10 (64-bit)", "Windows 11 (64-bit)"] },
                  { title: "Adobe Photoshop", items: ["Photoshop CC 2021 or later"] },
                  { title: "Hardware", items: ["Intel or AMD processor", "8 GB RAM (16 GB recommended)", "500 MB free disk space"] },
                  { title: "Additional", items: ["Internet connection (for activation)", "Active Adobe Photoshop license"] },
                ].map(({ title, items }) => (
                  <div key={title} className="glass-panel rounded-xl p-5">
                    <h3 className="font-semibold mb-3">{title}</h3>
                    <ul className="space-y-2">
                      {items.map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Scripts */}
            <section id="scripts">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center"><Layers className="w-5 h-5 text-primary" /></div>
                <h2 className="text-3xl md:text-4xl font-bold">Scripts</h2>
              </div>
              <p className="text-muted-foreground mb-6">The Scripts group contains Sublify's core automation features — these are the workhorses that batch-process your open Photoshop documents.</p>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {featureCard("Jersey Lineup", "Batch-generate personalized jerseys from a CSV roster. Supports single or dual numbers, size mapping, JPG/PSD output, and advanced layer controls.", Shirt)}
                {featureCard("Sleeves Lineup", "Automate sleeve production with per-player name, number, size, and position data. Same output and sizing options as Jersey Lineup.", Spline)}
                {featureCard("Shorts Lineup", "Batch shorts with pocket layer preservation. Features crop-to-two-parts mode, pocket action support, and skip-resize toggle.", Tags)}
                {featureCard("Auto Resize", "Scale the active Photoshop document into multiple standardized garment sizes simultaneously. Toggle individual sizes, choose export format (JPG/PSD/Both), and customize naming.", Maximize2)}
              </div>

              <div className="glass-panel rounded-xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">How Lineup Automation Works</h3>
                  <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                    <li>Prepare a CSV with columns like Player, Number, Size (and optionally Pocket, Position, etc.).</li>
                    <li>Open your PSD in Photoshop with properly named layers (NAME, NUMBER, SIZE, FRONT, BACK).</li>
                    <li>In Sublify, paste or import the CSV into the editable spreadsheet grid.</li>
                    <li>Select a size mapping and configure output settings (JPG quality, PSD save, naming template).</li>
                    <li>Click <strong>Run</strong> — Sublify sends each row to Photoshop, fills in the layers, and saves the output.</li>
                  </ol>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">Output Options</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> JPG quality slider (8-High, 10-Maximum, 12-Ultimate)</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Save as JPG, PSD, or both</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Custom file naming: <code className="bg-surface px-1.5 py-0.5 rounded text-xs">{`{player}_{num}_{size}`}</code>, <code className="bg-surface px-1.5 py-0.5 rounded text-xs">{`{num}_{player}_{size}`}</code>, and more</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Subfolder sorting for organized output</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Max player name width/height limits, layer size lock, strict layer checking</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Optional note text layer added to each document</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Utilities */}
            <section id="utilities">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center"><Settings2 className="w-5 h-5 text-primary" /></div>
                <h2 className="text-3xl md:text-4xl font-bold">Utilities</h2>
              </div>
              <p className="text-muted-foreground mb-6">Utility tools that help prepare, clean up, and enhance your Photoshop files for automation.</p>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {featureCard("Auto Naming", "Scans text layers in the active PSD and renames them by content — detects names, numbers, and sizes automatically. Can merge unrecognized layers into a single flat layer.", TextCursorInput)}
                {featureCard("Smooth Text", "Two tools in one: forces all text layers to Smooth Anti-Aliasing for crisp sublimation output, and injects a size label layer with configurable text, font, color, and position.", EqualApproximately)}
                {featureCard("Copy to Small", "Migrates layers from a large PSD to a small-size PSD with automatic proportional downscaling. Uses the bundled Small_Size.psd or a custom PSD.", Copy)}
                {featureCard("Team Banner", "Combines all visible layers from the active PSD into a target banner PSD for team display graphics. Supports custom output naming and subfolder sorting.", Image)}
              </div>
            </section>

            {/* Tools */}
            <section id="tools">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center"><Grid3X3 className="w-5 h-5 text-primary" /></div>
                <h2 className="text-3xl md:text-4xl font-bold">Tools</h2>
              </div>
              <p className="text-muted-foreground mb-6">Advanced tools for multi-document batch runs, data preparation, and PSD generation.</p>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {featureCard("Set Autolineup", "Process up to 3 PSDs (Jersey, Shorts, Sleeves) in a single batch run with global settings. Each product type can have its own size mapping.", ListTree)}
                {featureCard("Lineup Formatter", "Converts messy raw text (from emails or messages) into clean CSV data. Parses garment type, size, number, and name automatically.", Grid3X3)}
                {featureCard("Assorted PSDs", "Generates blank PSD files for all sizes at once. Select target sizes and generate Jersey or Shorts sets in one click.", FileText)}
                {featureCard("Layer Scanner", "Scans the active Photoshop document and displays a table with layer names, counts, and dimensions in inches for inspection.", Spline)}
              </div>

              <div className="glass-panel rounded-xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Set Autolineup — Multi-Document Batch</h3>
                  <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                    <li>Open your Jersey PSD (required), Shorts PSD (optional), and Sleeves PSD (optional) in Photoshop.</li>
                    <li>Choose separate size mappings per product type.</li>
                    <li>Toggle options: Run Auto Naming first, Copy to Small Size after, Skip Resize, Sort output into subfolders.</li>
                    <li>Enter lineup data in the 10-row form (player name, number, and sizes per product).</li>
                    <li>Click <strong>Run</strong> — all three PSDs process sequentially in one go.</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Configuration */}
            <section id="config">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center"><Ruler className="w-5 h-5 text-primary" /></div>
                <h2 className="text-3xl md:text-4xl font-bold">Configuration</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {featureCard("Size Mappings", "Create and manage size dimension tables used by all lineup automation. Define width and height per size for Adult (XS-10XL) and Kids (2-12) with a full grid editor. Search, save, and switch mappings on the fly.", Ruler)}
                {featureCard("Settings", "Manage your license (activate/deactivate via Keygen), configure the Photoshop executable path with auto-detect, initialize the Sublify Bridge connection, create manual snapshots of your config, and access developer options.", Settings2)}
              </div>
              <div className="glass-panel rounded-xl p-6 md:p-8">
                <h3 className="font-semibold text-lg mb-2">Size Mapping Editor</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Adult tab: XS through 10XL with editable width/height per size</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Kids tab: sizes 2 through 12</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Add/delete rows, paste CSV data, clear all</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Saved mappings are immediately available in all lineup pages</li>
                </ul>
              </div>
            </section>

            {/* General */}
            <section id="general">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center"><SunMoon className="w-5 h-5 text-primary" /></div>
                <h2 className="text-3xl md:text-4xl font-bold">General Features</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {featureCard("Run History", "Persistent log of all past script runs stored in the app. Shows status, timestamps, output paths (click to open in Explorer), and preview images. Export logs as CSV or view script output with color-coded WARN/ERROR entries.", History)}
                {featureCard("Progress Modal", "Full-screen overlay during task execution showing live terminal output, progress bar, and generated preview thumbnails on success. Includes an enlarged image viewer with zoom and keyboard navigation.", Layers)}
                {featureCard("Notifications", "System notifications after task completion. An in-app notification dropdown in the titlebar shows the 5 most recent runs with unread indicators.", ShieldCheck)}
                {featureCard("Dark / Light Theme", "Toggle between dark and light mode from the sidebar. The entire UI adapts with themed colors, borders, and surfaces.", SunMoon)}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center"><HelpCircle className="w-5 h-5 text-primary" /></div>
                <h2 className="text-3xl md:text-4xl font-bold">FAQ</h2>
              </div>
              <div className="space-y-4">
                {[
                  { q: "What file formats does Sublify support for roster import?", a: "CSV files. You can paste CSV data directly into the editable grid or import from a .csv file. The grid also supports drag-and-drop column reordering and inline editing." },
                  { q: "Does Sublify work on macOS?", a: "Currently, Sublify is available for Windows only. A macOS version is under development." },
                  { q: "How does Sublify connect to Photoshop?", a: "Sublify installs a Bridge Runner (ExtendScript) into Photoshop's scripts folder. When you run a task, Sublify launches Photoshop scripts via this bridge and reads the output in real time." },
                  { q: "Do I need coding skills to use Sublify?", a: "No. Sublify has a visual interface with dropdowns, toggles, and an editable spreadsheet grid — no JavaScript or ExtendScript knowledge required." },
                  { q: "How many designs can I process at once?", a: "No hard limit. Performance depends on your hardware and document complexity. The progress modal shows live output so you can monitor progress." },
                  { q: "Can I edit output files after generation?", a: "Yes. If you generate PSD files, each is a fully editable Photoshop document with the original layer structure preserved." },
                  { q: "How does licensing work?", a: "Licenses are managed via Keygen with online activation. The app supports offline validation via a signed license file. You can deactivate a license from Settings to transfer it to another machine." },
                ].map(({ q, a }) => (
                  <details key={q} className="glass-panel rounded-xl group">
                    <summary className="p-5 cursor-pointer list-none flex items-center justify-between gap-4">
                      <span className="font-medium">{q}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-5 pb-5 pt-0 text-muted-foreground border-t border-border pt-4">
                      {a}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-primary" /></div>
                <h2 className="text-3xl md:text-4xl font-bold">Troubleshooting</h2>
              </div>
              <div className="space-y-4">
                {[
                  { problem: "Sublify cannot connect to Photoshop", solutions: [
                    "Ensure Photoshop is installed and has been launched at least once.",
                    "In Sublify Settings, check the Photoshop executable path and click Auto-Detect if it's empty.",
                    "Click <strong>Initialize Photoshop Connection</strong> in Settings to install the Bridge Runner.",
                    "Restart both Sublify and Photoshop, then try again.",
                  ]},
                  { problem: "Import fails or shows incorrect data", solutions: [
                    "Ensure your CSV file is not open in another program.",
                    "Check that column headers match what the feature expects (e.g., Player, Number, Size).",
                    "Remove any special characters in numeric fields (e.g., #10 should be 10).",
                    "Try pasting your data directly into the spreadsheet grid instead of file import.",
                  ]},
                  { problem: "Generated files look misaligned or distorted", solutions: [
                    "Verify your PSD has the correct layer names: NAME, NUMBER, SIZE, etc.",
                    "Ensure the size mapping selected matches the actual dimensions of your PSD sizes.",
                    "Check that text layers don't have max-width constraints that clip longer names.",
                    "Try running with <strong>Strict Layer Checking</strong> enabled to catch mismatches early.",
                  ]},
                  { problem: "Activation key is not working", solutions: [
                    "Copy and paste the key directly from your purchase email (format: XXXX-XXXX-XXXX-XXXX).",
                    "Ensure you have an active internet connection for online validation.",
                    "If you've exceeded the machine limit, deactivate the license on your old machine first.",
                    "Contact support with your purchase email and order ID for manual assistance.",
                  ]},
                  { problem: "Script runs but no files are generated", solutions: [
                    "Check the Run History for the error message — it will show what went wrong.",
                    "Make sure the output folder is writable and has enough disk space.",
                    "Verify the PSD is open and active in Photoshop before running.",
                    "Check the progress modal logs for specific layer errors (e.g., MISSING_LAYERS).",
                  ]},
                ].map(({ problem, solutions }) => (
                  <div key={problem} className="glass-panel rounded-xl p-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      {problem}
                    </h3>
                    <ul className="space-y-2">
                      {solutions.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary font-bold shrink-0">{i + 1}.</span>
                          <span dangerouslySetInnerHTML={{ __html: s }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 glass-panel rounded-xl p-6 text-center">
                <p className="text-muted-foreground mb-4">Still having issues?</p>
                <a href="https://facebook.com/djbenzzmc" target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg inline-flex">
                  Contact Support
                </a>
              </div>
            </section>

          </motion.div>
        </main>
      </div>

      <footer className="w-full bg-surface border-t border-border px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sublify. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={onBack} className="hover:text-foreground transition-colors">Back to Home</button>
            <a href="https://facebook.com/djbenzzmc" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
