export default function Footer() {
  return (
    <footer className="text-ink/45 fixed bottom-4 left-4 z-40 font-mono text-xs">
      <p>&copy; {new Date().getFullYear()} Thomas Stirling</p>
    </footer>
  );
}
