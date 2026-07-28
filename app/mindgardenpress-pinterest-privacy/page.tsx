import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mind Garden Press — Content Auto-Poster Pinterest Privacy Policy',
  robots: { index: false, follow: false, nocache: true },
};

export default function MindGardenPressPinterestPrivacyPage() {
  return (
    <main className="prose mx-auto max-w-2xl px-6 py-16">
      <h1>Privacy Policy — Content Auto-Poster (Pinterest integration)</h1>
      <p>Last updated: 2026-07-28</p>

      <p>
        Content Auto-Poster is a personal, single-user desktop application built and
        operated by Joey Etheridge, owner of Mind Garden Press, for posting original
        devotional image content to a single Pinterest account that the developer
        owns and controls. It is not a public product, is not distributed to other
        users, and does not collect or process data belonging to anyone other than
        the developer.
      </p>
      <p>
        <em>
          This policy is hosted at faithspark.app because FaithSpark is another
          product developed and operated by the same company, Mind Garden Press —
          the developer of Content Auto-Poster, the application this Pinterest
          integration belongs to.
        </em>
      </p>

      <h2>What Pinterest data the app accesses</h2>
      <p>Using Pinterest&apos;s API, the app accesses only the developer&apos;s own account:</p>
      <ul>
        <li>
          Board information (<code>boards:read</code>, <code>boards:write</code> scopes)
          — used to find or automatically create the single board the app posts to.
        </li>
        <li>
          Pin creation (<code>pins:read</code>, <code>pins:write</code> scopes) — used
          to publish image pins the developer generated to that board.
        </li>
      </ul>

      <h2>How this data is stored and used</h2>
      <p>
        Access and refresh tokens are stored locally, only on the developer&apos;s own
        computer, and are never transmitted to or stored on any third-party server.
        No Pinterest data is sold, shared, rented, or used for advertising or
        analytics. No data belonging to any other Pinterest user is ever accessed.
      </p>

      <h2>Data retention and revocation</h2>
      <p>
        Tokens remain stored locally until the developer disconnects the account from
        within the app or revokes access directly from Pinterest&apos;s account
        settings, at which point the local tokens are deleted and no further API
        calls are made.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to{' '}
        <a href="mailto:mindgardenpress1@gmail.com">mindgardenpress1@gmail.com</a>.
      </p>
    </main>
  );
}
