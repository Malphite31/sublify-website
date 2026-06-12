import { motion } from "framer-motion";
import { ArrowLeft, Book, Download, MonitorSmartphone, Package, Settings2, Layers, Maximize2, Grid3X3, HelpCircle, AlertTriangle, FileText, Wrench, CheckCircle2, ChevronRight } from 'lucide-react';

interface DocsProps {
  onBack: () => void;
}

const sections = [
  { id: "getting-started", label: "Getting Started", icon: Book },
  { id: "installation", label: "Installation", icon: Download },
  { id: "system-requirements", label: "System Requirements", icon: MonitorSmartphone },
  { id: "batch-processing", label: "Batch Processing", icon: Layers },
  { id: "smart-resizing", label: "Smart Resizing", icon: Maximize2 },
  { id: "lineup-formatter", label: "Lineup Formatter", icon: Grid3X3 },
  { id: "templates", label: "Templates", icon: FileText },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "troubleshooting", label: "Troubleshooting", icon: AlertTriangle },
];

export default function Docs({ onBack }: DocsProps) {
  return (
    <div className="w-full min-h-screen bg-background text-foreground selection:bg-accent/50 dark overflow-x-hidden font-sans">
      {/* Top Nav */}
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
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0 border-r border-border h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto">
          <nav className="p-6 space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-all"
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Mobile Section Selector */}
        <div className="lg:hidden w-full overflow-x-auto border-b border-border bg-surface/50">
          <div className="flex gap-1 p-3 min-w-max">
            {sections.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface whitespace-nowrap transition-all border border-border/50"
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-20"
          >
            {/* Getting Started */}
            <section id="getting-started">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Getting Started</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Sublify is a Photoshop automation toolkit built for sublimation print shops. It eliminates the tedious manual work of laying out names, numbers, and artwork across multiple sizes.
              </p>
              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  { step: "1", title: "Install", desc: "Download and install the plugin on Windows." },
                  { step: "2", title: "Set Up", desc: "Choose your template and import your roster." },
                  { step: "3", title: "Generate", desc: "Batch process hundreds of designs in seconds." },
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
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                  <Download className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Installation</h2>
              </div>
              <div className="glass-panel rounded-xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Step 1: Download the Plugin</h3>
                  <p className="text-muted-foreground">Click the <strong>Download for Windows</strong> button on the Sublify homepage. The installer file will be downloaded to your computer.</p>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">Step 2: Run the Installer</h3>
                  <p className="text-muted-foreground">Locate the downloaded file and double-click to run. Follow the on-screen instructions. The installer will automatically place Sublify in the correct Photoshop plugins folder.</p>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">Step 3: Launch Photoshop</h3>
                  <p className="text-muted-foreground">Open Adobe Photoshop. You will find Sublify under <code className="bg-surface px-2 py-0.5 rounded text-sm">Plugins &gt; Sublify</code> in the top menu bar. The Sublify panel will appear on the right side of your workspace.</p>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">Step 4: Activate Your License</h3>
                  <p className="text-muted-foreground">When you first open Sublify, you will be prompted to enter your activation key. Use the key sent to you after purchase. Once activated, you are ready to start automating.</p>
                </div>
              </div>
            </section>

            {/* System Requirements */}
            <section id="system-requirements">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                  <MonitorSmartphone className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">System Requirements</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { title: "Operating System", items: ["Windows 10 (64-bit)", "Windows 11 (64-bit)"] },
                  { title: "Adobe Photoshop", items: ["Photoshop CC 2021 or later"] },
                  { title: "Hardware", items: ["Intel or AMD processor", "8 GB RAM (16 GB recommended)", "500 MB free disk space"] },
                  { title: "Additional", items: ["Internet connection (for activation)", "Adobe Photoshop license"] },
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

            {/* Batch Processing */}
            <section id="batch-processing">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Batch Processing</h2>
              </div>
              <p className="text-muted-foreground mb-6">Batch processing is Sublify's core feature. It allows you to generate personalized jerseys, shorts, and sleeves from a single roster — automatically handling every size variation.</p>
              
              <div className="glass-panel rounded-xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Importing a Roster</h3>
                  <p className="text-muted-foreground mb-4">Prepare a CSV or Excel file with columns for:</p>
                  <div className="bg-surface rounded-lg overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-medium">Name</th>
                          <th className="text-left p-3 font-medium">Number</th>
                          <th className="text-left p-3 font-medium">Size</th>
                          <th className="text-left p-3 font-medium">Team</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="p-3 text-muted-foreground">Juan Dela Cruz</td>
                          <td className="p-3 text-muted-foreground">10</td>
                          <td className="p-3 text-muted-foreground">M</td>
                          <td className="p-3 text-muted-foreground">Dragons</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-muted-foreground">Maria Santos</td>
                          <td className="p-3 text-muted-foreground">7</td>
                          <td className="p-3 text-muted-foreground">L</td>
                          <td className="p-3 text-muted-foreground">Dragons</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">Running a Batch</h3>
                  <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                    <li>Open Sublify from the Plugins menu in Photoshop.</li>
                    <li>Select your template from the dropdown.</li>
                    <li>Click <strong>Import Roster</strong> and select your CSV/Excel file.</li>
                    <li>Map each column to the correct field (Name, Number, Size, Team).</li>
                    <li>Choose your output settings (file format, resolution, naming).</li>
                    <li>Click <strong>Generate All</strong> and let Sublify do the work.</li>
                  </ol>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">Output</h3>
                  <p className="text-muted-foreground">Sublify creates individual PSD or PNG files for each roster entry, organized by team or size in neatly labeled folders. All files are immediately ready for print.</p>
                </div>
              </div>
            </section>

            {/* Smart Resizing */}
            <section id="smart-resizing">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Smart Resizing</h2>
              </div>
              <p className="text-muted-foreground mb-6">Smart Resizing intelligently scales your artwork and text elements to fit every size variant — from Youth XS to Adult 5XL — maintaining proportions and positioning.</p>
              <div className="glass-panel rounded-xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">How It Works</h3>
                  <p className="text-muted-foreground">When you define a template, you set base dimensions for a reference size (e.g., Adult L). Sublify then uses those proportions to automatically scale every element — including names, numbers, logos, and sponsor placements — across all sizes.</p>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">Size Presets</h3>
                  <p className="text-muted-foreground mb-4">Sublify includes built-in size charts for:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Youth XS", "Youth S", "Youth M", "Youth L", "Adult S", "Adult M", "Adult L", "Adult XL", "Adult 2XL", "Adult 3XL", "Adult 4XL", "Adult 5XL"].map(s => (
                      <span key={s} className="bg-surface px-3 py-1.5 rounded-lg text-sm text-muted-foreground border border-border">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">Custom Scaling Rules</h3>
                  <p className="text-muted-foreground">You can override scaling behavior per element. For example, you can fix a logo at a constant size while letting the name and number scale with the garment. This gives you fine-grained control over the final output.</p>
                </div>
              </div>
            </section>

            {/* Lineup Formatter */}
            <section id="lineup-formatter">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                  <Grid3X3 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Lineup Formatter</h2>
              </div>
              <p className="text-muted-foreground mb-6">The Lineup Formatter automatically arranges your print layout on the artboard for maximum fabric yield, minimizing your material waste.</p>
              <div className="glass-panel rounded-xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Key Features</h3>
                  <ul className="space-y-3">
                    {[
                      "Automatically nests front and back designs on the artboard.",
                      "Supports multi-garment layout (jerseys + shorts + sleeves on one sheet).",
                      "Configurable margins, gutters, and rotation for optimal material usage.",
                      "Preview mode to review the layout before exporting.",
                    ].map(f => (
                      <li key={f} className="flex items-start gap-3 text-muted-foreground">
                        <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Templates */}
            <section id="templates">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Templates</h2>
              </div>
              <p className="text-muted-foreground mb-6">Templates define the blueprint for your designs — which layers to use, where text goes, what fonts to apply, and how elements should scale.</p>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {[
                  { title: "Built-in Templates", desc: "Sublify ships with ready-to-use templates for common jersey, shorts, and sleeve formats.", icon: Package },
                  { title: "Custom Templates", desc: "Design your own template from any PSD file. Sublify reads your layer structure and lets you map dynamic content.", icon: Settings2 },
                  { title: "Template Library", desc: "Save and organize your templates for reuse across different projects and clients.", icon: FileText },
                  { title: "Sharing", desc: "Export your templates to share with team members or import templates created by others.", icon: Wrench },
                ].map(({ title, desc, icon: Icon }) => (
                  <div key={title} className="glass-panel rounded-xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {[
                  { q: "What file formats does Sublify support for import?", a: "Sublify supports CSV and Excel (.xlsx) files for roster imports. Make sure your file has clear column headers." },
                  { q: "Can I use Sublify on macOS?", a: "Currently, Sublify is available for Windows only. A macOS version is under development." },
                  { q: "Do I need coding or scripting knowledge?", a: "Not at all. Sublify has a visual interface — no JavaScript or ExtendScript knowledge required." },
                  { q: "How many designs can I generate at once?", a: "There is no hard limit. Sublify can process rosters of any size. The speed depends on your computer's hardware and the complexity of your template." },
                  { q: "Can I edit the output files after generation?", a: "Yes. If you generate PSD files, each file is a fully editable Photoshop document with preserved layer structure." },
                  { q: "What happens when my license expires?", a: "You will retain access to the last version installed during your active period. To continue receiving updates, you will need to renew." },
                  { q: "Can I get a refund?", a: "Refunds are handled on a case-by-case basis. Please contact support within 7 days of purchase." },
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
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Troubleshooting</h2>
              </div>
              <div className="space-y-4">
                {[
                  { problem: "Sublify does not appear in Photoshop's Plugins menu", solutions: [
                    "Restart Adobe Photoshop completely.",
                    "Re-run the Sublify installer to ensure the plugin was placed in the correct folder.",
                    "Check that your Photoshop version is CC 2021 or later.",
                    "Go to <code className='bg-surface px-1.5 py-0.5 rounded text-xs'>Photoshop &gt; Plugins</code> in Preferences to verify plugin loading is enabled.",
                  ]},
                  { problem: "Import fails or shows incorrect data", solutions: [
                    "Ensure your CSV/Excel file is not open in another program.",
                    "Check that column headers match exactly (case-sensitive).",
                    "Verify there are no merged cells in your Excel file.",
                    "Remove any special characters in numeric fields (e.g., #10 should be 10).",
                  ]},
                  { problem: "Generated files look misaligned or distorted", solutions: [
                    "Double-check your template layer names match what Sublify expects.",
                    "Verify that the reference size in Smart Resizing matches your template base dimensions.",
                    "Try re-creating your template from a clean PSD file.",
                  ]},
                  { problem: "Activation key is not working", solutions: [
                    "Copy and paste the key directly from your purchase email to avoid typos.",
                    "Ensure you have an active internet connection for validation.",
                    "Contact support if the issue persists — include your purchase email and order ID.",
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
                <a
                  href="https://facebook.com/djbenzzmc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-lg inline-flex"
                >
                  Contact Support
                </a>
              </div>
            </section>
          </motion.div>
        </main>
      </div>

      {/* Footer */}
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
