import type { Metadata } from 'next';
import LightNav from '@/components/LightNav';
import LightFooter from '@/components/LightFooter';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'FaithSpark privacy policy — how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://faithspark.app/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="legal-wrap">
      <LightNav />
      <div className="lp-container">
        <div className="page-label">Legal</div>
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: April 1, 2026</p>
        <div className="lp-intro">
          Your privacy matters deeply to us. FaithSpark is a faith-based app built on trust — and we take the responsibility of handling your personal information seriously. This policy explains what we collect, why we collect it, and how we protect it.
        </div>
        <h2>1. Who We Are</h2>
        <p>FaithSpark is developed and operated by Mind Garden Press. If you have any questions about this Privacy Policy, you can contact us at <strong>faithsparkhome@gmail.com</strong>.</p>
        <h2>2. Information We Collect</h2>
        <p>We collect information you provide directly to us when you use FaithSpark:</p>
        <ul>
          <li><strong>Account information</strong> — email address and password when you create an account</li>
          <li><strong>Profile information</strong> — name, gender, age range, life season, faith tradition, language preference, struggles, prayer focus, and any personal notes you choose to share</li>
          <li><strong>Content you create</strong> — journal entries, prayer requests, group posts, and comments you submit within the app</li>
          <li><strong>Usage data</strong> — reading progress, streak data, trophy milestones, and app preferences</li>
          <li><strong>Device information</strong> — device type, operating system, and app version for troubleshooting purposes</li>
        </ul>
        <h2>3. How We Use Your Information</h2>
        <p>We use your information solely to provide and improve FaithSpark:</p>
        <ul>
          <li>To personalize your devotionals, prayers, and Bible guidance using AI</li>
          <li>To display your content on the community prayer board (with your permission)</li>
          <li>To track your reading progress and award trophies</li>
          <li>To send you weekly check-in messages based on your journal and prayer activity</li>
          <li>To send push notifications for prayer board activity and daily reminders</li>
          <li>To provide customer support</li>
          <li>To improve the app based on usage patterns</li>
        </ul>
        <div className="lp-highlight">
          <p>🔒 We never sell your personal information to third parties. Ever. Your faith journey is private and we intend to keep it that way.</p>
        </div>
        <h2>4. AI and Third-Party Services</h2>
        <p>FaithSpark uses the following AI services to power certain features:</p>
        <ul>
          <li><strong>Anthropic (Claude)</strong> — used to generate personalized daily devotionals and journal prayers. Your profile context and journal content is sent to Anthropic&apos;s API to generate responses.</li>
          <li><strong>Google (Gemini)</strong> — used to power the Ask FaithSpark Bible Q&amp;A feature. Your questions are sent to Google&apos;s Gemini API.</li>
        </ul>
        <p>We recommend reviewing the privacy policies of these third-party services. We send only the minimum information necessary to generate your personalized content.</p>
        <h2>5. Data Storage and Security</h2>
        <p>Your account data, prayer requests, and community content is stored securely in Google Firebase (Firestore). Your personal profile data and journal entries are stored locally on your device using AsyncStorage and are not shared with other users unless you explicitly choose to post them publicly.</p>
        <p>We implement industry-standard security measures including encrypted connections (HTTPS) for all data transmission. However, no method of electronic storage is 100% secure and we cannot guarantee absolute security.</p>
        <h2>6. Community Content</h2>
        <p>When you post a prayer request to the Community Prayer Board it becomes visible to other FaithSpark users. You may choose to post anonymously. You can delete your own posts at any time.</p>
        <p>Prayer group content is only visible to members of that specific group who have the invite code.</p>
        <h2>7. Children&apos;s Privacy</h2>
        <p>FaithSpark is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13 please contact us immediately at faithsparkhome@gmail.com.</p>
        <h2>8. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Correct inaccurate information in your profile</li>
          <li>Delete your account and all associated data</li>
          <li>Export your journal entries and personal data</li>
          <li>Opt out of push notifications at any time through your device settings</li>
        </ul>
        <p>To exercise any of these rights please contact us at faithsparkhome@gmail.com.</p>
        <h2>9. Data Retention</h2>
        <p>We retain your account information for as long as your account is active. If you delete your account we will delete your personal data within 30 days.</p>
        <h2>10. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by sending a push notification through the app or by email.</p>
        <h2>11. Contact Us</h2>
        <p>If you have questions or concerns about this Privacy Policy please contact us:</p>
        <ul>
          <li><strong>Email:</strong> faithsparkhome@gmail.com</li>
          <li><strong>Developer:</strong> Mind Garden Press</li>
        </ul>
      </div>
      <LightFooter />
    </div>
  );
}
