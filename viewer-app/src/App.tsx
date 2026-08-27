import site from "./site.json";

const { theme } = site;

export default function App() {
  return (
    <div style={{ background: theme.bg, color: theme.ink }}>
    </div>
  );
}