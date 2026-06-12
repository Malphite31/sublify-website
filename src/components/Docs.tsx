import { useState } from "react";
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

const sectionsEN = [
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

const sectionsTL = [
  { id: "getting-started", label: "Pagsisimula", icon: Book },
  { id: "installation", label: "Pag-install", icon: Download },
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
  const [lang, setLang] = useState<'en' | 'tl'>('en');
  const sections = lang === 'en' ? sectionsEN : sectionsTL;

  return (
    <div className="w-full min-h-screen bg-background text-foreground selection:bg-accent/50 dark overflow-x-hidden font-sans">
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between relative">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium z-10 shrink-0">
            <ArrowLeft className="w-5 h-5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{lang === 'en' ? 'Back to Home' : 'Bumalik sa Home'}</span>
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3 absolute left-1/2 -translate-x-1/2">
            <img src="/sublify_logo.png" alt="Sublify Logo" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
            <span className="font-black text-lg sm:text-xl leading-none italic tracking-tight hidden sm:block" style={{ fontFamily: "'Monument Extended Black Italic', sans-serif" }}>SUBLIFY</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground ml-1 hidden md:inline">Docs</span>
          </div>

          <div className="flex gap-1 sm:gap-2 z-10 shrink-0">
            <button onClick={() => setLang('en')} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${lang === 'en' ? 'bg-primary text-primary-foreground' : 'bg-surface text-muted-foreground hover:bg-surface/80'}`}>EN</button>
            <button onClick={() => setLang('tl')} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${lang === 'tl' ? 'bg-primary text-primary-foreground' : 'bg-surface text-muted-foreground hover:bg-surface/80'}`}>TL</button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row pt-16 sm:pt-20">
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

        <div className="lg:hidden w-full overflow-x-auto border-b border-border bg-surface/50 sticky top-16 sm:top-20 z-40">
          <div className="flex gap-1 p-3 min-w-max">
            {sections.map(({ id, label, icon: Icon }) => (
              <a key={id} href={`#${id}`} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface whitespace-nowrap transition-all border border-border/50">
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <main className="flex-1 min-w-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-12 sm:space-y-20">

            {/* Getting Started */}
            <section id="getting-started">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{lang === 'en' ? 'Getting Started' : 'Pagsisimula'}</h1>
              <p className="text-lg text-muted-foreground mb-8">
                {lang === 'en' ? 
                  'Sublify is a Windows desktop application that connects directly to Adobe Photoshop to automate sublimation print workflows. It takes your roster data, fills it into your open PSD, and outputs the finished files — all without manual layout work.' : 
                  'Ang Sublify ay isang Windows desktop application na direktang kumokonekta sa Adobe Photoshop para i-automate ang sublimation print workflows. Kinukuha nito ang iyong listahan ng mga pangalan (roster data), inilalagay ito sa bukas mong PSD, at ginagawa ang mga tapos na files — nang walang manu-manong paggawa ng layout.'}
              </p>
              <div className="grid gap-4 md:grid-cols-3 mb-8">
                {[
                  { step: "1", title: lang === 'en' ? "Install" : "Mag-install", desc: lang === 'en' ? "Download and run the Sublify installer on Windows." : "I-download at patakbuhin ang Sublify installer sa Windows." },
                  { step: "2", title: lang === 'en' ? "Connect" : "Kumonekta", desc: lang === 'en' ? "Launch Photoshop, open Sublify, and connect via the built-in bridge." : "Buksan ang Photoshop at Sublify, at kumonekta gamit ang built-in bridge." },
                  { step: "3", title: lang === 'en' ? "Automate" : "I-automate", desc: lang === 'en' ? "Import a roster CSV and batch generate your designs in seconds." : "I-import ang roster CSV at sabay-sabay na i-generate ang iyong designs nang ilang segundo." },
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
                <h2 className="text-3xl md:text-4xl font-bold">{lang === 'en' ? 'Installation' : 'Pag-install'}</h2>
              </div>
              <div className="glass-panel rounded-xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{lang === 'en' ? 'Step 1: Download' : 'Hakbang 1: I-download'}</h3>
                  <p className="text-muted-foreground">
                    {lang === 'en' ? 
                      <>Click <strong>Download for Windows</strong> on the Sublify homepage. The installer (.exe) will be downloaded to your computer.</> : 
                      <>I-click ang <strong>Download for Windows</strong> sa Sublify homepage. Mada-download ang installer (.exe) sa iyong computer.</>}
                  </p>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">{lang === 'en' ? 'Step 2: Install' : 'Hakbang 2: I-install'}</h3>
                  <p className="text-muted-foreground">
                    {lang === 'en' ? 
                      'Double-click the installer and follow the on-screen prompts. Sublify installs as a standalone application on your system.' : 
                      'I-double click ang installer at sundin ang mga prompts sa screen. Mai-install ang Sublify bilang isang standalone application sa iyong system.'}
                  </p>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">{lang === 'en' ? 'Step 3: Launch & Connect' : 'Hakbang 3: Buksan at Kumonekta'}</h3>
                  <p className="text-muted-foreground">
                    {lang === 'en' ? 
                      <>Open Sublify from your Start Menu or desktop shortcut. The app will detect your Photoshop installation. Click <strong>Initialize Photoshop Connection</strong> in Settings to install the Sublify Bridge Runner — this allows Sublify to send commands to Photoshop.</> : 
                      <>Buksan ang Sublify mula sa iyong Start Menu o desktop shortcut. Ide-detect ng app ang iyong Photoshop. I-click ang <strong>Initialize Photoshop Connection</strong> sa Settings para ma-install ang Sublify Bridge Runner — ito ang magbibigay-daan sa Sublify na mag-send ng commands sa Photoshop.</>}
                  </p>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">{lang === 'en' ? 'Step 4: Activate License' : 'Hakbang 4: I-activate ang License'}</h3>
                  <p className="text-muted-foreground">
                    {lang === 'en' ? 
                      'Enter your product key (format: XXXX-XXXX-XXXX-XXXX) in the Settings page. Online activation verifies your license via Keygen. Once activated, all features are unlocked.' : 
                      'Ilagay ang iyong product key (format: XXXX-XXXX-XXXX-XXXX) sa Settings page. Ang online activation ay nagbe-verify ng iyong license gamit ang Keygen. Kapag na-activate na, maaari nang gamitin ang lahat ng features.'}
                  </p>
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
                  { title: lang === 'en' ? "Operating System" : "Operating System", items: ["Windows 10 (64-bit)", "Windows 11 (64-bit)"] },
                  { title: "Adobe Photoshop", items: ["Photoshop CC 2021 " + (lang === 'en' ? "or later" : "pataas")] },
                  { title: "Hardware", items: [lang === 'en' ? "Intel or AMD processor" : "Intel o AMD processor", "8 GB RAM (16 GB recommended)", lang === 'en' ? "500 MB free disk space" : "500 MB na libreng disk space"] },
                  { title: lang === 'en' ? "Additional" : "Karagdagan", items: [lang === 'en' ? "Internet connection (for activation)" : "Internet connection (para ma-activate)", lang === 'en' ? "Active Adobe Photoshop license" : "Aktibong Adobe Photoshop license"] },
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
              <p className="text-muted-foreground mb-6">
                {lang === 'en' ? 
                  "The Scripts group contains Sublify's core automation features — these are the workhorses that batch-process your open Photoshop documents." : 
                  "Ang Scripts group ay naglalaman ng mga pangunahing automation features ng Sublify — ito ang mga nagpoproseso nang sabay-sabay sa mga nakabukas mong Photoshop documents."}
              </p>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {featureCard("Jersey Lineup", lang === 'en' ? "Batch-generate personalized jerseys from a CSV roster. Supports single or dual numbers, size mapping, JPG/PSD output, and advanced layer controls." : "Sabay-sabay na paggawa ng personalized jerseys mula sa CSV roster. Sumusuporta ito sa single o dual numbers, size mapping, JPG/PSD output, at advanced layer controls.", Shirt)}
                {featureCard("Sleeves Lineup", lang === 'en' ? "Automate sleeve production with per-player name, number, size, and position data. Same output and sizing options as Jersey Lineup." : "I-automate ang paggawa ng sleeves gamit ang pangalan, numero, size, at position data ng bawat player. Parehas ng output at sizing options sa Jersey Lineup.", Spline)}
                {featureCard("Shorts Lineup", lang === 'en' ? "Batch shorts with pocket layer preservation. Features crop-to-two-parts mode, pocket action support, and skip-resize toggle." : "Sabay-sabay na paggawa ng shorts na pinapanatili ang pocket layer. May feature na crop-to-two-parts, pocket action support, at skip-resize toggle.", Tags)}
                {featureCard("Auto Resize", lang === 'en' ? "Scale the active Photoshop document into multiple standardized garment sizes simultaneously. Toggle individual sizes, choose export format (JPG/PSD/Both), and customize naming." : "I-resize ang kasalukuyang Photoshop document sa maraming iba't ibang sizes nang sabay-sabay. Maaaring piliin ang export format (JPG/PSD/Pareho), at i-customize ang pagpapangalan.", Maximize2)}
              </div>

              <div className="glass-panel rounded-xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{lang === 'en' ? 'How Lineup Automation Works' : 'Paano Gumagana ang Lineup Automation'}</h3>
                  <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                    {lang === 'en' ? 
                      <>
                        <li>Prepare a CSV with columns like Player, Number, Size (and optionally Pocket, Position, etc.).</li>
                        <li>Open your PSD in Photoshop with properly named layers (NAME, NUMBER, SIZE, FRONT, BACK).</li>
                        <li>In Sublify, paste or import the CSV into the editable spreadsheet grid.</li>
                        <li>Select a size mapping and configure output settings (JPG quality, PSD save, naming template).</li>
                        <li>Click <strong>Run</strong> — Sublify sends each row to Photoshop, fills in the layers, and saves the output.</li>
                      </> : 
                      <>
                        <li>Ihanda ang isang CSV na may columns tulad ng Player, Number, Size.</li>
                        <li>Buksan ang iyong PSD sa Photoshop na may tamang pangalan ng layers (NAME, NUMBER, SIZE, FRONT, BACK).</li>
                        <li>Sa Sublify, i-paste o i-import ang CSV sa editable na spreadsheet grid.</li>
                        <li>Pumili ng size mapping at i-configure ang output settings (JPG quality, PSD save, naming template).</li>
                        <li>I-click ang <strong>Run</strong> — ipapadala ng Sublify ang bawat row sa Photoshop, pupunan ang mga layers, at ise-save ang output.</li>
                      </>
                    }
                  </ol>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-2">{lang === 'en' ? 'Output Options' : 'Mga Output Options'}</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {lang === 'en' ? 
                      <>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> JPG quality slider (8-High, 10-Maximum, 12-Ultimate)</li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Save as JPG, PSD, or both</li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Custom file naming: <code className="bg-surface px-1.5 py-0.5 rounded text-xs">{`{player}_{num}_{size}`}</code>, <code className="bg-surface px-1.5 py-0.5 rounded text-xs">{`{num}_{player}_{size}`}</code>, and more</li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Subfolder sorting for organized output</li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Max player name width/height limits, layer size lock, strict layer checking</li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Optional note text layer added to each document</li>
                      </> : 
                      <>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> JPG quality slider (8-High, 10-Maximum, 12-Ultimate)</li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Pwedeng i-save bilang JPG, PSD, o pareho</li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Custom file naming: <code className="bg-surface px-1.5 py-0.5 rounded text-xs">{`{player}_{num}_{size}`}</code> at iba pa</li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Pagsasaayos ng files sa mga subfolder</li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Max player name width/height limits, layer size lock, at strict layer checking</li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Optional na note text layer para sa bawat document</li>
                      </>
                    }
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
              <p className="text-muted-foreground mb-6">
                {lang === 'en' ? 
                  "Utility tools that help prepare, clean up, and enhance your Photoshop files for automation." : 
                  "Mga utility tools na tumutulong na ihanda, linisin, at pagandahin ang iyong Photoshop files para sa automation."}
              </p>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {featureCard("Auto Naming", lang === 'en' ? "Scans text layers in the active PSD and renames them by content — detects names, numbers, and sizes automatically. Can merge unrecognized layers into a single flat layer." : "Ini-scan ang mga text layers sa PSD at awtomatikong pinapangalanan ang mga ito base sa content (pangalan, numero, size). Maaaring pagsamahin ang mga hindi nakilalang layers bilang isang flat layer.", TextCursorInput)}
                {featureCard("Smooth Text", lang === 'en' ? "Two tools in one: forces all text layers to Smooth Anti-Aliasing for crisp sublimation output, and injects a size label layer with configurable text, font, color, and position." : "Ginagawang Smooth Anti-Aliasing ang lahat ng text layers para mas malinaw ang print, at nagdadagdag din ng size label layer kung saan pwedeng i-configure ang font at kulay.", EqualApproximately)}
                {featureCard("Copy to Small", lang === 'en' ? "Migrates layers from a large PSD to a small-size PSD with automatic proportional downscaling. Uses the bundled Small_Size.psd or a custom PSD." : "Inililipat ang mga layers mula sa malaking PSD papunta sa maliit na PSD (para sa bata) na may awtomatikong pag-adjust ng sukat.", Copy)}
                {featureCard("Team Banner", lang === 'en' ? "Combines all visible layers from the active PSD into a target banner PSD for team display graphics. Supports custom output naming and subfolder sorting." : "Pinagsasama-sama ang lahat ng nakikitang layers mula sa PSD para gumawa ng team banner. Sumusuporta ito sa custom output naming.", Image)}
              </div>
            </section>

            {/* Tools */}
            <section id="tools">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center"><Grid3X3 className="w-5 h-5 text-primary" /></div>
                <h2 className="text-3xl md:text-4xl font-bold">Tools</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                {lang === 'en' ? 
                  "Advanced tools for multi-document batch runs, data preparation, and PSD generation." : 
                  "Advanced tools para sa pagpapatakbo ng maraming documents, paghahanda ng data, at pag-generate ng PSD."}
              </p>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {featureCard("Set Autolineup", lang === 'en' ? "Process up to 3 PSDs (Jersey, Shorts, Sleeves) in a single batch run with global settings. Each product type can have its own size mapping." : "Iproseso ang hanggang 3 PSDs (Jersey, Shorts, Sleeves) sa iisang batch run gamit ang global settings.", ListTree)}
                {featureCard("Lineup Formatter", lang === 'en' ? "Converts messy raw text (from emails or messages) into clean CSV data. Parses garment type, size, number, and name automatically." : "Kino-convert ang magulong raw text mula sa chat o email para maging malinis na CSV data.", Grid3X3)}
                {featureCard("Assorted PSDs", lang === 'en' ? "Generates blank PSD files for all sizes at once. Select target sizes and generate Jersey or Shorts sets in one click." : "Sabay-sabay na gumagawa ng mga blankong PSD files para sa lahat ng sizes sa isang click lamang.", FileText)}
                {featureCard("Layer Scanner", lang === 'en' ? "Scans the active Photoshop document and displays a table with layer names, counts, and dimensions in inches for inspection." : "Ini-scan ang kasalukuyang Photoshop document at nagpapakita ng table na may impormasyon tungkol sa layer names at dimensions nito.", Spline)}
              </div>

              <div className="glass-panel rounded-xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Set Autolineup — {lang === 'en' ? 'Multi-Document Batch' : 'Sabay-sabay na Pagproseso'}</h3>
                  <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                    {lang === 'en' ? 
                      <>
                        <li>Open your Jersey PSD (required), Shorts PSD (optional), and Sleeves PSD (optional) in Photoshop.</li>
                        <li>Choose separate size mappings per product type.</li>
                        <li>Toggle options: Run Auto Naming first, Copy to Small Size after, Skip Resize, Sort output into subfolders.</li>
                        <li>Enter lineup data in the 10-row form (player name, number, and sizes per product).</li>
                        <li>Click <strong>Run</strong> — all three PSDs process sequentially in one go.</li>
                      </> : 
                      <>
                        <li>Buksan ang iyong Jersey PSD (required), Shorts PSD (optional), at Sleeves PSD (optional) sa Photoshop.</li>
                        <li>Pumili ng magkahiwalay na size mappings kada produkto.</li>
                        <li>Piliin ang mga options tulad ng Run Auto Naming o Skip Resize.</li>
                        <li>Ilagay ang mga detalye sa form (player name, number, at sizes).</li>
                        <li>I-click ang <strong>Run</strong> — lahat ng mga PSD ay sunod-sunod na poprosesuhing sabay-sabay.</li>
                      </>
                    }
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
                {featureCard("Size Mappings", lang === 'en' ? "Create and manage size dimension tables used by all lineup automation. Define width and height per size for Adult (XS-10XL) and Kids (2-12) with a full grid editor. Search, save, and switch mappings on the fly." : "Gumawa at mag-manage ng size dimension tables na ginagamit sa lahat ng automation. Pwedeng i-set ang width at height para sa Adult (XS-10XL) at Kids (2-12).", Ruler)}
                {featureCard("Settings", lang === 'en' ? "Manage your license (activate/deactivate via Keygen), configure the Photoshop executable path with auto-detect, initialize the Sublify Bridge connection, create manual snapshots of your config, and access developer options." : "I-manage ang iyong license, i-configure ang Photoshop path, at gamitin ang iba pang settings para sa Sublify Bridge at backups.", Settings2)}
              </div>
            </section>

            {/* General */}
            <section id="general">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center"><SunMoon className="w-5 h-5 text-primary" /></div>
                <h2 className="text-3xl md:text-4xl font-bold">General Features</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {featureCard("Run History", lang === 'en' ? "Persistent log of all past script runs stored in the app. Shows status, timestamps, output paths (click to open in Explorer), and preview images. Export logs as CSV or view script output with color-coded WARN/ERROR entries." : "Naka-save na record ng lahat ng nakaraang script runs sa app. Nagpapakita ng status, oras, output paths, at mga preview images.", History)}
                {featureCard("Progress Modal", lang === 'en' ? "Full-screen overlay during task execution showing live terminal output, progress bar, and generated preview thumbnails on success. Includes an enlarged image viewer with zoom and keyboard navigation." : "Lumalabas sa screen habang nagpoproseso ang app na nagpapakita ng live terminal output, progress bar, at mga preview thumbnails kapag tapos na.", Layers)}
                {featureCard("Notifications", lang === 'en' ? "System notifications after task completion. An in-app notification dropdown in the titlebar shows the 5 most recent runs with unread indicators." : "Mga system notifications pagkatapos ng bawat task. Ang dropdown sa itaas ay nagpapakita ng huling limang (5) naging proseso.", ShieldCheck)}
                {featureCard("Dark / Light Theme", lang === 'en' ? "Toggle between dark and light mode from the sidebar. The entire UI adapts with themed colors, borders, and surfaces." : "Pwedeng pumili sa pagitan ng Dark at Light mode. Magbabago ang kulay ng buong app base sa napiling theme.", SunMoon)}
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
                  { 
                    q: lang === 'en' ? "What file formats does Sublify support for roster import?" : "Anong mga file formats ang pwedeng i-import sa Sublify?", 
                    a: lang === 'en' ? "CSV files. You can paste CSV data directly into the editable grid or import from a .csv file. The grid also supports drag-and-drop column reordering and inline editing." : "CSV files. Pwedeng i-paste nang direkta ang data sa grid o i-import gamit ang .csv file." 
                  },
                  { 
                    q: lang === 'en' ? "Does Sublify work on macOS?" : "Gumagana ba ang Sublify sa macOS (Macbook)?", 
                    a: lang === 'en' ? "Currently, Sublify is available for Windows only. A macOS version is under development." : "Sa ngayon, pang Windows pa lamang ang Sublify. Ang macOS version ay kasalukuyan pang dine-develop." 
                  },
                  { 
                    q: lang === 'en' ? "How does Sublify connect to Photoshop?" : "Paano kumokonekta ang Sublify sa Photoshop?", 
                    a: lang === 'en' ? "Sublify installs a Bridge Runner (ExtendScript) into Photoshop's scripts folder. When you run a task, Sublify launches Photoshop scripts via this bridge and reads the output in real time." : "Ang Sublify ay nag-i-install ng Bridge Runner papunta sa Photoshop. Kapag nag-run ka ng task, pinapagana ng Sublify ang scripts gamit ang tulay na ito." 
                  },
                  { 
                    q: lang === 'en' ? "Do I need coding skills to use Sublify?" : "Kailangan ba marunong mag-code para magamit ang Sublify?", 
                    a: lang === 'en' ? "No. Sublify has a visual interface with dropdowns, toggles, and an editable spreadsheet grid — no JavaScript or ExtendScript knowledge required." : "Hindi. Ang Sublify ay madaling gamitin dahil may sarili itong interface, dropdowns, at grid — hindi mo kailangan ng kaalaman sa coding." 
                  },
                  { 
                    q: lang === 'en' ? "How many designs can I process at once?" : "Ilang designs ang pwede kong iproseso nang sabay-sabay?", 
                    a: lang === 'en' ? "No hard limit. Performance depends on your hardware and document complexity. The progress modal shows live output so you can monitor progress." : "Walang limitasyon. Pero nakadepende ang bilis nito sa lakas ng computer mo at sa bigat ng PSD file." 
                  },
                  { 
                    q: lang === 'en' ? "Can I edit output files after generation?" : "Pwede ko bang i-edit ang files pagkatapos ma-generate?", 
                    a: lang === 'en' ? "Yes. If you generate PSD files, each is a fully editable Photoshop document with the original layer structure preserved." : "Oo. Kung ginawa mo itong PSD, bawat file ay pwedeng i-edit sa Photoshop at andoon pa rin ang orihinal na layers." 
                  },
                  { 
                    q: lang === 'en' ? "How does licensing work?" : "Paano gumagana ang lisensya?", 
                    a: lang === 'en' ? "Licenses are managed via Keygen with online activation. The app supports offline validation via a signed license file. You can deactivate a license from Settings to transfer it to another machine." : "Minamanage ang license gamit ang Keygen at kailangan i-activate ito nang online. Pwede mo itong i-deactivate sa Settings para malipat sa ibang computer." 
                  },
                ].map(({ q, a }) => (
                  <details key={q} className="glass-panel rounded-xl group">
                    <summary className="p-4 sm:p-5 cursor-pointer list-none flex items-start justify-between gap-4">
                      <span className="font-medium text-sm sm:text-base leading-snug pt-0.5">{q}</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-muted-foreground text-sm sm:text-base border-t border-border pt-4">
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
                  { problem: lang === 'en' ? "Sublify cannot connect to Photoshop" : "Hindi makakonekta ang Sublify sa Photoshop", solutions: [
                    lang === 'en' ? "Ensure Photoshop is installed and has been launched at least once." : "Siguraduhin na naka-install ang Photoshop at nabuksan na kahit isang beses.",
                    lang === 'en' ? "In Sublify Settings, check the Photoshop executable path and click Auto-Detect if it's empty." : "Sa Settings, i-check ang Photoshop executable path at i-click ang Auto-Detect kung walang nakalagay.",
                    lang === 'en' ? "Click <strong>Initialize Photoshop Connection</strong> in Settings to install the Bridge Runner." : "I-click ang <strong>Initialize Photoshop Connection</strong> sa Settings para ma-install ang Bridge Runner.",
                    lang === 'en' ? "Restart both Sublify and Photoshop, then try again." : "I-restart ang Sublify at ang Photoshop, pagkatapos ay subukan ulit.",
                  ]},
                  { problem: lang === 'en' ? "Import fails or shows incorrect data" : "Pumalya ang import o nagpapakita ng maling data", solutions: [
                    lang === 'en' ? "Ensure your CSV file is not open in another program." : "Siguraduhin na hindi bukas ang iyong CSV file sa ibang program tulad ng Excel.",
                    lang === 'en' ? "Check that column headers match what the feature expects (e.g., Player, Number, Size)." : "I-check kung tama ang column headers sa CSV mo (hal. Player, Number, Size).",
                    lang === 'en' ? "Remove any special characters in numeric fields (e.g., #10 should be 10)." : "Burahin ang anumang special characters sa mga number (hal. ang #10 ay dapat 10 lamang).",
                    lang === 'en' ? "Try pasting your data directly into the spreadsheet grid instead of file import." : "Subukang i-paste nang direkta ang data sa grid kaysa mag-import ng file.",
                  ]},
                  { problem: lang === 'en' ? "Generated files look misaligned or distorted" : "Mali o pangit ang pagkaka-align ng mga lumabas na files", solutions: [
                    lang === 'en' ? "Verify your PSD has the correct layer names: NAME, NUMBER, SIZE, etc." : "I-verify na tama ang pangalan ng mga layers sa PSD mo: NAME, NUMBER, SIZE, atbp.",
                    lang === 'en' ? "Ensure the size mapping selected matches the actual dimensions of your PSD sizes." : "Siguraduhin na ang napiling size mapping ay tugma sa totoong dimensions ng PSD mo.",
                    lang === 'en' ? "Check that text layers don't have max-width constraints that clip longer names." : "I-check na ang mga text layers ay walang max-width constraints na nagpuputol sa mahahabang pangalan.",
                    lang === 'en' ? "Try running with <strong>Strict Layer Checking</strong> enabled to catch mismatches early." : "Subukang paganahin ang <strong>Strict Layer Checking</strong> para agad makita ang anumang maling pangalan ng layer.",
                  ]},
                  { problem: lang === 'en' ? "Activation key is not working" : "Hindi gumagana ang Activation key", solutions: [
                    lang === 'en' ? "Copy and paste the key directly from your purchase email (format: XXXX-XXXX-XXXX-XXXX)." : "I-copy at i-paste ang key nang direkta mula sa inyong email (format: XXXX-XXXX-XXXX-XXXX).",
                    lang === 'en' ? "Ensure you have an active internet connection for online validation." : "Siguraduhing mayroon kayong internet connection para sa online validation.",
                    lang === 'en' ? "If you've exceeded the machine limit, deactivate the license on your old machine first." : "Kung sobra na sa machine limit, i-deactivate muna ang lisensya sa lumang computer.",
                    lang === 'en' ? "Contact support with your purchase email and order ID for manual assistance." : "Tumawag sa support kasama ang inyong purchase email at order ID para matulungan.",
                  ]},
                  { problem: lang === 'en' ? "Script runs but no files are generated" : "Tumatakbo ang script pero walang lumalabas na files", solutions: [
                    lang === 'en' ? "Check the Run History for the error message — it will show what went wrong." : "I-check ang Run History para makita kung anong error ang lumabas.",
                    lang === 'en' ? "Make sure the output folder is writable and has enough disk space." : "Siguraduhin na may espasyo pa ang iyong hard drive at pwede itong sulatan ng app.",
                    lang === 'en' ? "Verify the PSD is open and active in Photoshop before running." : "I-verify kung bukas at naka-active ang PSD sa Photoshop bago mag-run.",
                    lang === 'en' ? "Check the progress modal logs for specific layer errors (e.g., MISSING_LAYERS)." : "I-check ang logs sa progress modal kung may makikitang errors tulad ng MISSING_LAYERS.",
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
                <p className="text-muted-foreground mb-4">{lang === 'en' ? 'Still having issues?' : 'May problema pa rin?'}</p>
                <a href="https://facebook.com/djbenzzmc" target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg inline-flex">
                  {lang === 'en' ? 'Contact Support' : 'Kausapin ang Support'}
                </a>
              </div>
            </section>

          </motion.div>
        </main>
      </div>

      <footer className="w-full bg-surface border-t border-border px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} Sublify. {lang === 'en' ? 'All rights reserved.' : 'Lahat ng karapatan ay nakareserba.'}</p>
          <div className="flex gap-4 sm:gap-6">
            <button onClick={onBack} className="hover:text-foreground transition-colors">{lang === 'en' ? 'Back to Home' : 'Bumalik sa Home'}</button>
            <a href="https://facebook.com/djbenzzmc" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
