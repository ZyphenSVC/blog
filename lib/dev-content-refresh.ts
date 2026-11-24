/** Runs before React hydration, including when the HMR connection is blocked. */
export function devContentRefreshScript(initialVersion: string | null): string {
  const version = JSON.stringify(initialVersion).replace(/</g, "\\u003c");
  return `(() => {
    if (window.__blogContentRefresh) return;
    window.__blogContentRefresh = true;
    let baseline = ${version};
    let reloading = false;
    async function check() {
      try {
        const response = await fetch('/api/dev/content-version', { cache: 'no-store' });
        if (!response.ok) return;
        const { version } = await response.json();
        if (typeof version !== 'string') return;
        if (baseline === null) baseline = version;
        else if (version !== baseline) {
          reloading = true;
          window.location.reload();
        }
      } catch {
        // Retry after a server restart or a temporary read/network failure.
      } finally {
        if (!reloading) setTimeout(check, 1000);
      }
    }
    void check();
  })();`;
}
