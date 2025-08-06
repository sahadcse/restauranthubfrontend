import { Metadata } from "next";
import Header from "../../components/layout/public/Header";
import Footer from "../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Return Policy | Restaurant Hub",
  description:
    "Return Policy for Restaurant Hub - Learn about our refund and return policies for food orders.",
};

export default function ReturnPolicyPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Return Policy", href: "/return-policy" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={breadcrumbItems} className="container mx-auto max-w-7xl" />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Return & Refund Policy
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Return Policy Overview
                </h2>
                <p className="text-gray-700 mb-4">
                  At Restaurant Hub, we strive to ensure every meal meets your expectations. 
                  Due to the nature of food products, we have specific policies regarding 
                  returns and refunds to ensure food safety and quality.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mb-4">
                  <p className="text-teal-700 font-medium">
                    Important: Food items cannot be physically returned due to health and safety regulations.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Eligible Refund Scenarios
                </h2>
                <p className="text-gray-700 mb-4">
                  We offer refunds or credits in the following situations:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Order was delivered significantly late (more than 60 minutes past estimated time)</li>
                  <li>Wrong items were delivered</li>
                  <li>Food quality issues (cold, stale, or improperly prepared)</li>
                  <li>Missing items from your order</li>
                  <li>Order was cancelled by the restaurant after payment</li>
                  <li>Delivery address issues caused by our system</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Refund Process
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Contact Us</h3>
                    <p className="text-gray-700">
                      Report issues within 2 hours of delivery through our app, website, 
                      or customer service hotline.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Investigation</h3>
                    <p className="text-gray-700">
                      Our team will review your complaint and may contact the restaurant 
                      for verification.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: Resolution</h3>
                    <p className="text-gray-700">
                      Based on our investigation, we&apos;ll provide a refund, credit, 
                      or replacement order as appropriate.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Refund Methods & Timeline
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Credit Card Refunds</h3>
                      <p className="text-gray-700 text-sm">5-7 business days to appear on your statement</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Digital Wallet</h3>
                      <p className="text-gray-700 text-sm">1-3 business days for processing</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Store Credit</h3>
                      <p className="text-gray-700 text-sm">Instant credit to your account</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Cash on Delivery</h3>
                      <p className="text-gray-700 text-sm">Store credit or bank transfer within 3-5 days</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Non-Refundable Situations
                </h2>
                <p className="text-gray-700 mb-4">
                  We cannot provide refunds in the following cases:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Change of mind after successful delivery</li>
                  <li>Incorrect delivery address provided by customer</li>
                  <li>Customer unavailable for delivery</li>
                  <li>Complaints reported more than 24 hours after delivery</li>
                  <li>Customization preferences not followed (if not clearly specified)</li>
                  <li>Allergic reactions (customers are responsible for checking ingredients)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Order Cancellation Policy
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Before Restaurant Confirmation</h3>
                      <p className="text-gray-700 text-sm">Full refund within 5 minutes of order placement</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">After Restaurant Confirmation</h3>
                      <p className="text-gray-700 text-sm">Cancellation fee may apply (up to 50% of order value)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">✗</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">During Preparation</h3>
                      <p className="text-gray-700 text-sm">Limited to partial refund or store credit</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Quality Guarantee
                </h2>
                <p className="text-gray-700 mb-4">
                  We partner with restaurants that maintain high food safety and quality standards. 
                  If you&apos;re not satisfied with your order quality, we&apos;ll work with you to make it right.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Our Promise:</h3>
                  <p className="text-blue-700 text-sm">
                    Every order should arrive fresh, accurate, and on time. If it doesn&apos;t meet these standards, 
                    we&apos;ll provide a satisfactory resolution.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. How to Contact Us
                </h2>
                <p className="text-gray-700 mb-4">
                  For returns, refunds, or any order-related issues, please contact us through:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Customer Support</h3>
                    <p className="text-gray-700 text-sm mb-1">📧 support@restauranthub.com</p>
                    <p className="text-gray-700 text-sm mb-1">📞 (555) 123-4567</p>
                    <p className="text-gray-700 text-sm">🕒 24/7 Available</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">In-App Support</h3>
                    <p className="text-gray-700 text-sm mb-1">💬 Live Chat Feature</p>
                    <p className="text-gray-700 text-sm mb-1">📱 Order History &gt; Report Issue</p>
                    <p className="text-gray-700 text-sm">⚡ Fastest Response Time</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Policy Updates
                </h2>
                <p className="text-gray-700">
                  We may update this return policy from time to time. Any changes will be 
                  posted on this page with an updated revision date. Continued use of our 
                  service after changes constitutes acceptance of the new policy.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="bg-teal-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-teal-800 mb-2">
                  Questions about our Return Policy?
                </h3>
                <p className="text-teal-700 mb-4">
                  Our customer service team is here to help you with any concerns about 
                  returns, refunds, or order issues.
                </p>
                <button className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
