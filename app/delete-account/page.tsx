import type { Metadata } from 'next';
import LightNav from '@/components/LightNav';
import LightFooter from '@/components/LightFooter';

export const metadata: Metadata = {
  title: 'Delete Your Account',
  description: 'How to delete your FaithSpark account and all associated data.',
  alternates: { canonical: 'https://faithspark.app/delete-account' },
};

export default function DeleteAccountPage() {
  return (
    <div className="legal-wrap">
      <LightNav />
      <div className="lp-container-sm">
        <div className="page-label">Account Management</div>
        <h1>Delete Your Account</h1>
        <div className="lp-intro">
          You have the right to delete your FaithSpark account and all associated data at any time. This page explains how to request account deletion and what happens to your data when you do.
        </div>
        <h2>How to Delete Your Account</h2>
        <p>You can delete your account directly from within the FaithSpark app:</p>
        <ol>
          <li>Open the <strong>FaithSpark app</strong> on your device</li>
          <li>Tap your <strong>profile photo</strong> in the top right corner</li>
          <li>Scroll to the bottom of your Profile screen</li>
          <li>Tap <strong>&ldquo;Delete Account&rdquo;</strong></li>
          <li>Confirm your decision when prompted</li>
          <li>Your account and data will be permanently deleted</li>
        </ol>
        <h2>Request Deletion by Email</h2>
        <p>If you are unable to access the app or prefer to request deletion by email, contact us at:</p>
        <a
          href="mailto:support@faithspark.app?subject=Account%20Deletion%20Request"
          className="email-btn"
        >
          📧 Email support@faithspark.app
        </a>
        <p style={{ marginTop: '16px' }}>Please include the email address associated with your FaithSpark account. We will process your deletion request within 30 days.</p>
        <h2>What Data Is Deleted</h2>
        <p>When you delete your account the following data is permanently removed:</p>
        <div className="data-box">
          {[
            { label: 'Account credentials (email and password)', status: 'deleted', text: '✓ Deleted immediately' },
            { label: 'Profile information (name, preferences, life details)', status: 'deleted', text: '✓ Deleted immediately' },
            { label: 'Faith journal entries', status: 'deleted', text: '✓ Deleted immediately' },
            { label: 'Saved devotionals', status: 'deleted', text: '✓ Deleted immediately' },
            { label: 'Prayer board posts and comments', status: 'deleted', text: '✓ Deleted within 30 days' },
            { label: 'Prayer group memberships', status: 'deleted', text: '✓ Deleted immediately' },
            { label: 'Progress and trophy data', status: 'deleted', text: '✓ Deleted immediately' },
            { label: 'Subscription information', status: 'retained', text: 'Retained per Apple/Google billing requirements' },
          ].map((row) => (
            <div className="data-row" key={row.label}>
              <span className="data-label">{row.label}</span>
              <span className={row.status === 'deleted' ? 'data-deleted' : 'data-retained'}>{row.text}</span>
            </div>
          ))}
        </div>
        <div className="lp-note">
          <strong>Note:</strong> Subscription and billing records may be retained by Apple or Google according to their respective platform policies. FaithSpark does not retain payment information directly.
        </div>
        <h2>Contact Us</h2>
        <p>If you have questions about account deletion or your data rights, contact us at <strong>support@faithspark.app</strong>.</p>
        <p>Developer: Mind Garden Press</p>
      </div>
      <LightFooter />
    </div>
  );
}
