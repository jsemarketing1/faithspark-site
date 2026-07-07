import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Your Account',
  description: 'How to delete your FaithSpark account and all associated data.',
  alternates: { canonical: 'https://faithspark.app/delete-account/' },
};

export default function DeleteAccountPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f8f5f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .da-page { min-height: 100vh; background: #f8f5f0; padding: 40px 20px; }
        .da-card {
          background: white;
          border-radius: 16px;
          max-width: 600px;
          margin: 0 auto;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        .da-header { text-align: center; margin-bottom: 36px; }
        .da-flame { font-size: 48px; margin-bottom: 16px; }
        .da-title { font-size: 28px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
        .da-subtitle { color: #666; font-size: 15px; line-height: 1.5; }
        .da-section-title { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-bottom: 20px; }
        .da-steps { display: flex; flex-direction: column; gap: 16px; margin-bottom: 36px; }
        .da-step { display: flex; gap: 16px; align-items: flex-start; }
        .da-step-num {
          background: #7A1E3A;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }
        .da-step-content { flex: 1; }
        .da-step-content strong { display: block; color: #1a1a1a; margin-bottom: 4px; font-size: 15px; }
        .da-step-content p { color: #666; font-size: 14px; line-height: 1.5; }
        .da-warning {
          background: #fff8e1;
          border: 1px solid #f59e0b;
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 36px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .da-warning-icon { font-size: 20px; flex-shrink: 0; }
        .da-warning p { color: #92400e; font-size: 14px; line-height: 1.5; }
        .da-contact {
          text-align: center;
          padding: 24px;
          background: #f8f5f0;
          border-radius: 12px;
          margin-bottom: 32px;
        }
        .da-contact p { color: #666; font-size: 14px; margin-bottom: 12px; }
        .da-contact a {
          display: inline-block;
          background: #7A1E3A;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
        }
        .da-contact a:hover { background: #6a1a32; }
        .da-footer { text-align: center; padding-top: 24px; border-top: 1px solid #eee; }
        .da-footer a { color: #7A1E3A; text-decoration: none; font-size: 13px; margin: 0 12px; }
        .da-footer a:hover { text-decoration: underline; }
        @media (max-width: 480px) {
          .da-card { padding: 28px 20px; }
          .da-title { font-size: 22px; }
        }
      `}</style>

      <div className="da-page">
        <div className="da-card">
          <div className="da-header">
            <div className="da-flame">🔥</div>
            <h1 className="da-title">Delete Your FaithSpark Account</h1>
            <p className="da-subtitle">
              We&apos;re sorry to see you go. Follow the steps below to permanently delete your account and all associated data.
            </p>
          </div>

          <h2 className="da-section-title">How to Delete Your Account</h2>
          <div className="da-steps">
            <div className="da-step">
              <div className="da-step-num">1</div>
              <div className="da-step-content">
                <strong>Open the FaithSpark App</strong>
                <p>Launch the FaithSpark app on your iOS device.</p>
              </div>
            </div>
            <div className="da-step">
              <div className="da-step-num">2</div>
              <div className="da-step-content">
                <strong>Go to Your Profile</strong>
                <p>Tap your profile photo in the top right corner of the home screen.</p>
              </div>
            </div>
            <div className="da-step">
              <div className="da-step-num">3</div>
              <div className="da-step-content">
                <strong>Scroll to the Bottom</strong>
                <p>Scroll all the way down on your Profile screen to find account options.</p>
              </div>
            </div>
            <div className="da-step">
              <div className="da-step-num">4</div>
              <div className="da-step-content">
                <strong>Tap &ldquo;Delete Account&rdquo;</strong>
                <p>Tap the Delete Account button and confirm your decision when prompted. Your account and all data will be permanently deleted.</p>
              </div>
            </div>
          </div>

          <div className="da-warning">
            <span className="da-warning-icon">⚠️</span>
            <p>
              <strong>This action is permanent and cannot be undone.</strong> All your data including your profile, journal entries, saved devotionals, prayer history, and progress will be permanently deleted and cannot be recovered.
            </p>
          </div>

          <div className="da-contact">
            <p>Can&apos;t access the app? Contact us and we&apos;ll delete your account manually within 30 days.</p>
            <a href="mailto:mindgardenpress1@gmail.com?subject=Account%20Deletion%20Request">
              📧 Contact Support
            </a>
          </div>

          <div className="da-footer">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </>
  );
}
