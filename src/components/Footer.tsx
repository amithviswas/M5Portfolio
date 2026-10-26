export default function Footer() {
  return (
    <footer className="bg-paper pb-8 pt-16 md:pt-24">
      <div className="wrap">
        <svg viewBox="0 0 1000 90" className="block w-full select-none" aria-hidden="true" focusable="false">
          <text
            x="0"
            y="70"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fill="currentColor"
            className="display"
            style={{ fontSize: 87, fontVariationSettings: "'wdth' 112" }}
          >
            Amith Viswas Reddy
          </text>
        </svg>
        <div className="mt-8 flex flex-col gap-3 border-t-4 border-ink pt-5 text-[15px] text-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Amith Viswas Reddy. Designed and built by Amith Viswas Reddy.</p>
          <a href="#home" className="link font-semibold text-ink">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
