export const metadata = {
  title: 'Privacy Policy',
};

export default function Privacy() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <div className="max-w-2xl mx-auto px-6 py-14">
        
<a          href="/"
          className="text-xs underline mb-6 inline-block"
          style={{ color: 'var(--ink)', opacity: 0.6 }}
        >
          ← Back
        </a>
        <h1
          className="font-display text-3xl mb-8"
          style={{ color: 'var(--ink)' }}
        >
          Privacy Policy
        </h1>

        <div
          className="space-y-6 text-sm leading-relaxed"
          style={{ color: 'var(--ink)' }}
        >
          <p>Last updated: July 31, 2026</p>

          <section>
            <h2 className="font-semibold mb-2">1. What we collect</h2>
            <p>
              When you upload a denial letter or EOB, the file is sent to
              our AI provider (Anthropic) solely to extract relevant details
              and generate a draft appeal letter. We do not require an
              account, and we do not collect your name, email, or other
              personal information to use this tool.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">2. How long we keep your data</h2>
            <p>
              Uploaded files are processed in memory to generate your
              results and are not stored on our servers after your session
              ends. We do not retain copies of your denial letters, EOBs, or
              generated appeal letters once you close or refresh the page.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">3. Third-party processing</h2>
            <p>
              Uploaded documents are sent to Anthropic's API to generate
              results. Anthropic's own data handling practices apply to
              this processing; we encourage you to review Anthropic's
              privacy policy for details on how they handle API data.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">4. What we don't do</h2>
            <p>
              We do not sell, rent, or share your uploaded documents or
              generated letters with advertisers or other third parties for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">5. Sensitive information</h2>
            <p>
              Denial letters and EOBs often contain health-related
              information. We recommend reviewing any generated letter
              carefully before sending it to an insurer, and avoiding
              uploading documents containing information beyond what's
              necessary for your appeal.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">6. Changes to this policy</h2>
            <p>
              This policy may be updated from time to time. Continued use of
              the tool after changes are posted constitutes acceptance of
              the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">7. Contact</h2>
            <p>
              Questions about this policy can be directed to the contact
              information provided wherever this tool is hosted or shared.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}