import React from "react";
import Header from "../../components/layout/public/Header";
import Footer from "../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../components/ui/Breadcrumb";

export default function TermsPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb
        items={breadcrumbItems}
        className="container mx-auto max-w-7xl"
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Terms of Service
            </h1>

            <div className="prose prose-gray max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using this restaurant ordering platform, you
                  accept and agree to be bound by the terms and provision of
                  this agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  2. Use License
                </h2>
                <p className="text-gray-600 mb-4">
                  Permission is granted to temporarily download one copy of the
                  materials on our platform for personal, non-commercial
                  transitory viewing only.
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>
                    This is the grant of a license, not a transfer of title
                  </li>
                  <li>
                    Under this license you may not modify or copy the materials
                  </li>
                  <li>
                    Use the materials for any commercial purpose or for any
                    public display
                  </li>
                  <li>
                    Attempt to reverse engineer any software contained on the
                    platform
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  3. Orders and Payment
                </h2>
                <p className="text-gray-600 mb-4">
                  All orders are subject to availability and confirmation of the
                  order price. We reserve the right to refuse any order placed
                  through the platform.
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Payment must be made at the time of ordering</li>
                  <li>
                    We accept major credit cards and digital payment methods
                  </li>
                  <li>All prices are subject to change without notice</li>
                  <li>Delivery fees may apply based on location</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  4. Cancellation and Refund Policy
                </h2>
                <p className="text-gray-600 mb-4">
                  Orders may be cancelled within 5 minutes of placement. Refunds
                  will be processed according to our refund policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  5. Privacy Policy
                </h2>
                <p className="text-gray-600 mb-4">
                  Your privacy is important to us. Please review our Privacy
                  Policy, which also governs your use of the platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  6. Limitation of Liability
                </h2>
                <p className="text-gray-600 mb-4">
                  In no event shall our company or its suppliers be liable for
                  any damages arising out of the use or inability to use the
                  platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  7. Contact Information
                </h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms of Service, please
                  contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-600">
                    Email: support@restauranthub.com
                  </p>
                  <p className="text-gray-600">Phone: (555) 123-4567</p>
                </div>
              </section>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
