import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Loader2, CheckCircle, Save } from "lucide-react";
import { DashboardInput, DashboardSelect, DashboardTextarea } from "./DashboardUI";
import { PhoneMockup } from "./PhoneMockup";
import { type Portfolio, type Project } from "./types";

interface EditPanelProps {
  portfolio: Portfolio;
  onUpdate: (p: Portfolio) => void;
  onDelete: (id: string) => void;
}

export function EditPanel({ portfolio, onUpdate, onDelete }: EditPanelProps) {
  const [name, setName] = useState(portfolio.name);
  const [headline, setHeadline] = useState(portfolio.headline || "");
  const [bio, setBio] = useState(portfolio.bio || "");
  const [showProjects, setShowProjects] = useState(portfolio.showProjects || false);
  const [showContact, setShowContact] = useState(portfolio.showContact || false);
  const [status, setStatus] = useState(portfolio.status);
  const [projects, setProjects] = useState<Project[]>(portfolio.projects || []);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddProject = () => {
    setProjects((prev) => [
      ...prev,
      { id: `proj-${Date.now()}`, name: "Project Title", desc: "Brief explanation of impact." }
    ]);
  };

  const handleRemoveProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleProjectChange = (id: string, field: "name" | "desc", value: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    setTimeout(() => {
      onUpdate({
        ...portfolio,
        name,
        headline,
        bio,
        showProjects,
        showContact,
        status,
        projects
      });
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 850);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
    >
      {/* Inputs Form */}
      <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
        {/* Core details */}
        <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft space-y-4">
          <h3 className="text-lg font-bold font-display mb-2">General Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DashboardInput
              label="Portfolio Name"
              required
              value={name}
              onChange={setName}
            />
            <DashboardSelect
              label="Publishing Status"
              value={status}
              onChange={(val) => setStatus(val as any)}
              options={[
                { value: "Published", label: "Published (Live link active)" },
                { value: "Draft", label: "Draft (Offline)" }
              ]}
            />
          </div>

          <DashboardInput
            label="Headline / Role"
            value={headline}
            onChange={setHeadline}
            placeholder="e.g. Lead Designer at Netflix"
          />

          <DashboardTextarea
            label="Bio Summary"
            rows={3}
            value={bio}
            onChange={setBio}
            placeholder="Write a brief overview of who you are..."
          />
        </div>

        {/* Layout Sections */}
        <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft space-y-4">
          <h3 className="text-lg font-bold font-display mb-1">Layout Sections</h3>
          <p className="text-xs text-ink-soft mb-4">Toggle visible sections on your public page.</p>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-surface/50 hover:bg-secondary/45 transition-all cursor-pointer">
              <div>
                <div className="text-xs font-bold">Enable Projects Section</div>
                <div className="text-[10px] text-ink-soft">Display a collection of your work case-studies</div>
              </div>
              <input
                type="checkbox"
                checked={showProjects}
                onChange={(e) => setShowProjects(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-surface/50 hover:bg-secondary/45 transition-all cursor-pointer">
              <div>
                <div className="text-xs font-bold">Enable Contact Form</div>
                <div className="text-[10px] text-ink-soft">Allows recruiters to email you directly</div>
              </div>
              <input
                type="checkbox"
                checked={showContact}
                onChange={(e) => setShowContact(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Projects List */}
        {showProjects && (
          <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold font-display">Projects & Work</h3>
                <p className="text-xs text-ink-soft">Add high-impact case studies or side projects</p>
              </div>
              <button
                type="button"
                onClick={handleAddProject}
                className="inline-flex items-center gap-1.5 rounded-full border border-border hover:bg-secondary px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Case Study
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-border rounded-2xl text-ink-soft/80 text-xs">
                No projects added yet. Click "Add Case Study" to begin.
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((proj, idx) => (
                  <div key={proj.id} className="relative p-4 rounded-xl border border-border bg-surface/40 space-y-3">
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(proj.id)}
                      className="absolute top-4 right-4 p-1.5 text-ink-soft hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="text-[10px] font-bold text-ink-soft uppercase tracking-wider">Project #{idx + 1}</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <label className="text-[10px] font-bold text-ink-soft">Name</label>
                        <input
                          type="text"
                          required
                          value={proj.name}
                          onChange={(e) => handleProjectChange(proj.id, "name", e.target.value)}
                          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[10px] font-bold text-ink-soft">Description</label>
                        <input
                          type="text"
                          required
                          value={proj.desc}
                          onChange={(e) => handleProjectChange(proj.id, "desc", e.target.value)}
                          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
          <button
            type="button"
            onClick={() => onDelete(portfolio.id)}
            className="rounded-full border border-red-200 text-red-600 hover:bg-red-50/50 px-5 py-3 text-xs font-bold transition-colors cursor-pointer"
          >
            Delete portfolio
          </button>
          
          <div className="flex items-center gap-3">
            {success && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-green-600 font-bold flex items-center gap-1"
              >
                <CheckCircle className="h-4 w-4 text-green-600" />
                All changes saved!
              </motion.span>
            )}
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-foreground text-background px-6 py-3.5 text-xs font-bold hover:shadow-soft transition-all cursor-pointer flex items-center gap-1.5"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Real-time Interactive Live Mobile/Phone Preview */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center sticky top-24 hidden lg:block">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft mb-3">Live Mobile Mockup</span>
        <PhoneMockup
          portfolio={portfolio}
          name={name}
          headline={headline}
          bio={bio}
          showProjects={showProjects}
          projects={projects}
          showContact={showContact}
        />
      </div>
    </motion.div>
  );
}
