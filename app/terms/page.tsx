import type { Metadata } from 'next';
import LightNav from '@/components/LightNav';
import LightFooter from '@/components/LightFooter';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'FaithSpark terms of service — the rules and guidelines for using the app.',
  alternates: { canonical: 'https://faithspark.app/terms' },
};

export default function TermsPage() {
  return (
    <div className="legal-wrap">
      <LightNav />
      <div className="lp-container">
        <div className="page-label">Legal</div>
        <h1>Terms of Service</h1>
        <p className="updated">Last updated: April 1, 2026</p>
        <div className="lp-intro">
          Please read these Terms of Service carefully before using FaithSpark. By downloading, installing, or using the app you agree to be bound by these terms.
        </div>
        <h2>1. Acceptance of Terms</h2>
        <p>These Terms of Service govern your use of the FaithSpark mobile application operated by Mind Garden Press. By creating an account or using the App you agree to these Terms.</p>
        <h2>2. Description of Service</h2>
        <p>FaithSpark is a faith-based mobile application that provides:</p>
        <ul>
          <li>AI-generated personalized daily devotionals</li>
          <li>A community prayer board for sharing and responding to prayer requests</li>
          <li>A full Bible reader with read-aloud functionality</li>
          <li>Bible-based games and activities</li>
          <li>A personal faith journal with AI prayer generation</li>
          <li>A 52-week family Bible study program</li>
          <li>Bible Q&amp;A powered by AI</li>
          <li>Guided prayer sessions, sleep stories, Scripture Art, and more</li>
        </ul>
        <h2>3. User Accounts</h2>
        <p>To access certain features you must create an account. You are responsible for:</p>
        <ul>
          <li>Providing accurate and complete information when creating your account</li>
          <li>Maintaining the security of your password</li>
          <li>All activity that occurs under your account</li>
          <li>Notifying us immediately of any unauthorized use of your account</li>
        </ul>
        <p>You must be at least 13 years old to create an account.</p>
        <h2>4. Subscriptions and Payments</h2>
        <p>FaithSpark offers both free and premium subscription tiers:</p>
        <ul>
          <li><strong>Free tier</strong> — access to the vast majority of features at no cost, including Bible reader, prayer board, devotionals, guided prayer, Scripture Art, sleep stories, and more</li>
          <li><strong>Premium subscription</strong> — unlocks unlimited AI devotionals and unlimited Spark conversations</li>
        </ul>
        <p>All subscriptions include a 7-day free trial for new users. Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period. Refunds are subject to Apple&apos;s refund policy.</p>
        <div className="lp-highlight">
          <p>💡 You can cancel your subscription at any time through your App Store account settings.</p>
        </div>
        <h2>5. Community Standards and Acceptable Use</h2>
        <p>When using the prayer board, groups, or any community features you agree to:</p>
        <ul>
          <li>Post content that is respectful, encouraging, and appropriate for a faith community</li>
          <li>Not post content that is hateful, discriminatory, threatening, or harassing</li>
          <li>Not post sexually explicit, violent, or illegal content</li>
          <li>Not impersonate other users or misrepresent your identity</li>
          <li>Not use the app to spam, advertise commercial products, or solicit money</li>
          <li>Respect the privacy and dignity of other community members</li>
        </ul>
        <h2>6. AI-Generated Content</h2>
        <p>FaithSpark uses artificial intelligence to generate devotionals, prayers, and Bible guidance. You acknowledge that:</p>
        <ul>
          <li>AI-generated content is for inspirational and devotional purposes only</li>
          <li>AI-generated content does not constitute professional religious, psychological, medical, or legal advice</li>
          <li>The accuracy and completeness of AI-generated content cannot be guaranteed</li>
          <li>AI content should complement, not replace, your personal Bible study and relationship with God</li>
        </ul>
        <h2>7. Intellectual Property</h2>
        <p>The FaithSpark app, including its design, features, and content created by us, is owned by Mind Garden Press and protected by copyright and intellectual property laws.</p>
        <p>Content you create within the app (journal entries, prayer requests) remains yours. Bible texts are from the King James Version (KJV) which is in the public domain.</p>
        <h2>8. Privacy</h2>
        <p>Your use of FaithSpark is governed by our <a href="/privacy" style={{ color: '#C8762A' }}>Privacy Policy</a>.</p>
        <h2>9. Disclaimer of Warranties</h2>
        <p>FaithSpark is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. We do not warrant that the app will be uninterrupted or error-free.</p>
        <h2>10. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law Mind Garden Press shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of FaithSpark.</p>
        <h2>11. Termination</h2>
        <p>We may suspend or terminate your account at any time for violation of these Terms. You may delete your account at any time through the app settings.</p>
        <h2>12. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms at any time. Your continued use of FaithSpark after changes take effect constitutes your acceptance of the updated Terms.</p>
        <h2>13. Governing Law</h2>
        <p>These Terms are governed by the laws of the State of Texas, United States.</p>
        <h2>14. Contact Us</h2>
        <ul>
          <li><strong>Email:</strong> faithsparkhome@gmail.com</li>
          <li><strong>Developer:</strong> Mind Garden Press</li>
        </ul>
      </div>
      <LightFooter />
    </div>
  );
}
