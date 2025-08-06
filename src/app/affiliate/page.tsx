"use client";

import React, { useState } from "react";
import Header from "../../components/layout/public/Header";
import Footer from "../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../components/ui/Breadcrumb";
import Input from "../../components/ui/Input";
import Image from "next/image";
import Link from "next/link";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiDollarSign,
  FiUsers,
//   FiTrendingUp,
  FiGift,
  FiShare2,
  FiTarget,
  FiAward,
  FiBarChart,
  FiCreditCard,
} from "react-icons/fi";

export default function AffiliatePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
    socialMedia: "",
    experience: "",
    audience: "",
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Affiliate Program", href: "/affiliate" },
  ];

  const benefits = [
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "High Commissions",
      description: "Earn up to 8% commission on every successful referral",
      highlight: "Up to 8%",
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Growing Network",
      description: "Join 2,000+ active affiliates earning monthly",
      highlight: "2,000+ Partners",
    },
    {
      icon: <FiGift className="w-8 h-8" />,
      title: "Bonus Rewards",
      description: "Extra bonuses for top performers and milestones",
      highlight: "Bonus Tiers",
    },
    {
      icon: <FiBarChart className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Track your performance with detailed dashboards",
      highlight: "Live Tracking",
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Sign Up",
      description: "Complete our simple application form and get approved",
      icon: <FiUser className="w-6 h-6" />,
    },
    {
      step: 2,
      title: "Get Your Links",
      description: "Receive unique referral codes and marketing materials",
      icon: <FiShare2 className="w-6 h-6" />,
    },
    {
      step: 3,
      title: "Promote",
      description: "Share with your audience through any channel you prefer",
      icon: <FiTarget className="w-6 h-6" />,
    },
    {
      step: 4,
      title: "Earn Commission",
      description: "Get paid monthly for every successful order",
      icon: <FiCreditCard className="w-6 h-6" />,
    },
  ];

  const commissionTiers = [
    {
      tier: "Bronze",
      orders: "1-50",
      commission: "3%",
      bonus: "Welcome Bonus",
      color: "bg-amber-100 border-amber-300 text-amber-800",
    },
    {
      tier: "Silver",
      orders: "51-150",
      commission: "5%",
      bonus: "$100 Monthly Bonus",
      color: "bg-gray-100 border-gray-300 text-gray-800",
    },
    {
      tier: "Gold",
      orders: "151-300",
      commission: "6.5%",
      bonus: "$250 Monthly Bonus",
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    },
    {
      tier: "Platinum",
      orders: "300+",
      commission: "8%",
      bonus: "$500 Monthly Bonus",
      color: "bg-purple-100 border-purple-300 text-purple-800",
    },
  ];

  const faqs = [
    {
      question: "How much can I earn as an affiliate?",
      answer:
        "Earnings vary based on your promotion efforts and tier level. Top affiliates earn $2,000-$5,000+ monthly through commissions and bonuses.",
    },
    {
      question: "When do I get paid?",
      answer:
        "Commissions are paid monthly on the 15th for the previous month's qualifying orders. Minimum payout is $50.",
    },
    {
      question: "What marketing materials do you provide?",
      answer:
        "We provide banners, social media graphics, email templates, product catalogs, and promotional codes for your audience.",
    },
    {
      question: "Is there a cost to join?",
      answer:
        "No, joining our affiliate program is completely free. We want to help you succeed without any upfront investment.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        website: "",
        socialMedia: "",
        experience: "",
        audience: "",
        agreeToTerms: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb
        items={breadcrumbItems}
        className="container mx-auto max-w-7xl"
      />

      <div className="py-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-6">
                  Join Our Affiliate Program
                </h1>
                <p className="text-xl mb-8">
                  Earn money by promoting Restaurant Hub to your audience. Get
                  rewarded for every customer you refer to our platform.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold">8%</span>
                    <p className="text-sm">Max Commission</p>
                  </div>
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold">$50</span>
                    <p className="text-sm">Min Payout</p>
                  </div>
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold">30</span>
                    <p className="text-sm">Cookie Days</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60"
                  alt="Affiliate marketing"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Benefits Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our{" "}
                <span className="text-purple-600">Affiliate Program?</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer one of the most rewarding affiliate programs in the
                food delivery industry
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 text-center"
                >
                  <div className="text-purple-600 flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {benefit.description}
                  </p>
                  <div className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full inline-block">
                    {benefit.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-20 bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How It <span className="text-purple-600">Works</span>
              </h2>
              <p className="text-gray-600">
                Getting started is simple and straightforward
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-purple-600">{step.icon}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full">
                      <div className="border-t-2 border-dashed border-purple-300 w-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Commission Tiers */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Commission <span className="text-purple-600">Tiers</span>
              </h2>
              <p className="text-gray-600">
                Higher performance means higher rewards
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {commissionTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-6 text-center ${tier.color}`}
                >
                  <div className="flex items-center justify-center mb-4">
                    <FiAward className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tier.tier}</h3>
                  <div className="text-2xl font-bold mb-2">
                    {tier.commission}
                  </div>
                  <p className="text-sm mb-3">{tier.orders} orders/month</p>
                  <div className="bg-white/50 rounded-md px-3 py-1 text-xs font-medium">
                    {tier.bonus}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Application Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Join Our Program
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    leftIcon={<FiUser className="h-4 w-4" />}
                    required
                    variant="outline"
                  />
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    variant="outline"
                  />
                </div>

                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  leftIcon={<FiMail className="h-4 w-4" />}
                  required
                  variant="outline"
                />

                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  leftIcon={<FiPhone className="h-4 w-4" />}
                  required
                  variant="outline"
                />

                <Input
                  type="url"
                  name="website"
                  placeholder="Website URL (Optional)"
                  value={formData.website}
                  onChange={handleInputChange}
                  leftIcon={<FiMapPin className="h-4 w-4" />}
                  variant="outline"
                />

                <Input
                  type="text"
                  name="socialMedia"
                  placeholder="Social Media Handle"
                  value={formData.socialMedia}
                  onChange={handleInputChange}
                  leftIcon={<FiShare2 className="h-4 w-4" />}
                  variant="outline"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marketing Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select Experience Level</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">
                      Intermediate (1-3 years)
                    </option>
                    <option value="advanced">Advanced (3-5 years)</option>
                    <option value="expert">Expert (5+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                  </label>
                  <textarea
                    name="audience"
                    placeholder="Describe your audience (e.g., food lovers, busy professionals, families...)"
                    value={formData.audience}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-purple-600 hover:text-purple-700 underline"
                    >
                      Affiliate Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-purple-600 hover:text-purple-700 underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-600 text-sm">
                      Application submitted successfully! We&apos;ll review and
                      contact you within 48 hours.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">
                      Failed to submit application. Please try again.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.agreeToTerms}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Apply Now"}
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              {/* Contact for More Info */}
              <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">
                  Have More Questions?
                </h3>
                <p className="text-purple-700 text-sm mb-4">
                  Our affiliate team is here to help you succeed. Contact us for
                  personalized support.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 text-sm">
                  <span className="text-purple-600">
                    📧 affiliates@restauranthub.com
                  </span>
                  <span className="text-purple-600">
                    📞 (555) 123-AFFILIATE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
