import { Metadata } from "next";
import Header from "../../components/layout/public/Header";
import Footer from "../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy | Restaurant Hub",
  description:
    "Privacy Policy for Restaurant Hub - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={breadcrumbItems} className="container mx-auto max-w-7xl" />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Privacy Policy
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-gray-700 mb-4">
                  We collect information you provide directly to us, such as
                  when you create an account, place an order, or contact us for
                  support.
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Personal information (name, email, phone number)</li>
                  <li>Delivery address and payment information</li>
                  <li>Order history and preferences</li>
                  <li>Communication records</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-gray-700 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders</li>
                  <li>Improve our services and user experience</li>
                  <li>Send promotional offers (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Information Sharing
                </h2>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information only in the
                  following circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>With restaurant partners to fulfill your orders</li>
                  <li>With delivery services for order fulfillment</li>
                  <li>With payment processors for transaction processing</li>
                  <li>When required by law or to protect our rights</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Data Security
                </h2>
                <p className="text-gray-700">
                  We implement appropriate security measures to protect your
                  personal information against unauthorized access, alteration,
                  disclosure, or destruction. However, no method of transmission
                  over the internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Your Rights
                </h2>
                <p className="text-gray-700 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Cookies
                </h2>
                <p className="text-gray-700">
                  We use cookies and similar technologies to enhance your
                  experience, analyze usage patterns, and deliver personalized
                  content. You can control cookie settings through your browser
                  preferences.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Contact Us
                </h2>
                <p className="text-gray-700">
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-700">
                    Email: privacy@restauranthub.com
                    <br />
                    Phone: (555) 123-4567
                    <br />
                    Address: 123 Food Street, Cuisine City, FC 12345
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
