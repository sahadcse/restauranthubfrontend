"use client";

import React, { useState } from "react";
// import { Metadata } from "next";
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
  FiUpload,
  FiCheck,
  FiClock,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

export default function VendorSignupPage() {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
    // Restaurant Information
    restaurantName: "",
    cuisine: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Business Information
    businessLicense: "",
    taxId: "",
    yearsInBusiness: "",
    currentLocations: "",
    
    // Documents
    businessLicenseFile: null as File | null,
    foodLicenseFile: null as File | null,
    insuranceFile: null as File | null,
    menuFile: null as File | null,
    
    // Agreement
    agreeToTerms: false,
    agreeToCommission: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(1);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Become a Vendor", href: "/vendor-signup" },
  ];

  const benefits = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Reach More Customers",
      description: "Access thousands of hungry customers in your area",
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Grow Your Business",
      description: "Increase revenue with online orders and delivery",
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Easy Management",
      description: "Simple dashboard to manage orders and menu",
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Competitive Commission",
      description: "Low commission rates to maximize your profits",
    },
  ];

  const requirements = [
    "Valid business license",
    "Food handler's permit",
    "General liability insurance",
    "Established restaurant location",
    "Minimum 1 year in business",
    "Quality food standards compliance",
  ];

  const cuisineOptions = [
    "American", "Italian", "Chinese", "Mexican", "Indian", "Japanese",
    "Thai", "Mediterranean", "French", "Korean", "Vietnamese", "Greek",
    "Spanish", "Lebanese", "Turkish", "Other"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        restaurantName: "",
        cuisine: "",
        description: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        businessLicense: "",
        taxId: "",
        yearsInBusiness: "",
        currentLocations: "",
        businessLicenseFile: null,
        foodLicenseFile: null,
        insuranceFile: null,
        menuFile: null,
        agreeToTerms: false,
        agreeToCommission: false,
      });
      setCurrentStep(1);
    } catch (error) {
        console.error("Error submitting form:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={breadcrumbItems} className="container mx-auto max-w-7xl" />
      
      <div className="py-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-6">
                  Partner with Restaurant Hub
                </h1>
                <p className="text-xl mb-8">
                  Join thousands of restaurants already growing their business with us. 
                  Reach more customers and increase your revenue today.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold">15K+</span>
                    <p className="text-sm">Monthly Orders</p>
                  </div>
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold">850+</span>
                    <p className="text-sm">Partner Restaurants</p>
                  </div>
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold">98%</span>
                    <p className="text-sm">Satisfaction Rate</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=60"
                  alt="Restaurant kitchen"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column - Benefits & Requirements */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Benefits */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Partner with Us?
                </h2>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="text-teal-600 flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Requirements
                </h3>
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <FiCheck className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Commission Info */}
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-teal-800 mb-2">
                  Commission Structure
                </h3>
                <p className="text-teal-700 text-sm mb-4">
                  We charge a competitive commission on each order to cover platform 
                  maintenance, payment processing, and customer support.
                </p>
                <div className="text-2xl font-bold text-teal-600">
                  15% Commission
                </div>
                <p className="text-xs text-teal-600 mt-1">
                  Lowest in the industry
                </p>
              </div>
            </div>

            {/* Right Column - Application Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Restaurant Partnership Application
                  </h2>
                  
                  {/* Progress Steps */}
                  <div className="flex items-center space-x-4 mb-6">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step <= currentStep 
                            ? 'bg-teal-600 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {step}
                        </div>
                        {step < 3 && (
                          <div className={`w-12 h-1 ml-2 ${
                            step < currentStep ? 'bg-teal-600' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Step {currentStep} of 3: {
                      currentStep === 1 ? 'Personal Information' :
                      currentStep === 2 ? 'Restaurant Details' : 'Documents & Agreement'
                    }
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
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
                    </div>
                  )}

                  {/* Step 2: Restaurant Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <Input
                        type="text"
                        name="restaurantName"
                        placeholder="Restaurant Name"
                        value={formData.restaurantName}
                        onChange={handleInputChange}
                        required
                        variant="outline"
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <select
                          name="cuisine"
                          value={formData.cuisine}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        >
                          <option value="">Select Cuisine Type</option>
                          {cuisineOptions.map((cuisine) => (
                            <option key={cuisine} value={cuisine}>
                              {cuisine}
                            </option>
                          ))}
                        </select>
                        
                        <Input
                          type="number"
                          name="yearsInBusiness"
                          placeholder="Years in Business"
                          value={formData.yearsInBusiness}
                          onChange={handleInputChange}
                          required
                          variant="outline"
                        />
                      </div>
                      
                      <textarea
                        name="description"
                        placeholder="Restaurant Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                      
                      <Input
                        type="text"
                        name="address"
                        placeholder="Restaurant Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        leftIcon={<FiMapPin className="h-4 w-4" />}
                        required
                        variant="outline"
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          variant="outline"
                        />
                        <Input
                          type="text"
                          name="state"
                          placeholder="State"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          variant="outline"
                        />
                        <Input
                          type="text"
                          name="zipCode"
                          placeholder="ZIP Code"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          variant="outline"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          type="text"
                          name="businessLicense"
                          placeholder="Business License Number"
                          value={formData.businessLicense}
                          onChange={handleInputChange}
                          required
                          variant="outline"
                        />
                        <Input
                          type="text"
                          name="taxId"
                          placeholder="Tax ID Number"
                          value={formData.taxId}
                          onChange={handleInputChange}
                          required
                          variant="outline"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Documents & Agreement */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business License *
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                            <FiUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileChange(e, 'businessLicenseFile')}
                              className="hidden"
                              id="businessLicense"
                              required
                            />
                            <label htmlFor="businessLicense" className="cursor-pointer">
                              <span className="text-sm text-gray-600">
                                {formData.businessLicenseFile ? formData.businessLicenseFile.name : 'Click to upload'}
                              </span>
                            </label>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Food License *
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                            <FiUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileChange(e, 'foodLicenseFile')}
                              className="hidden"
                              id="foodLicense"
                              required
                            />
                            <label htmlFor="foodLicense" className="cursor-pointer">
                              <span className="text-sm text-gray-600">
                                {formData.foodLicenseFile ? formData.foodLicenseFile.name : 'Click to upload'}
                              </span>
                            </label>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Insurance Certificate *
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                            <FiUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileChange(e, 'insuranceFile')}
                              className="hidden"
                              id="insurance"
                              required
                            />
                            <label htmlFor="insurance" className="cursor-pointer">
                              <span className="text-sm text-gray-600">
                                {formData.insuranceFile ? formData.insuranceFile.name : 'Click to upload'}
                              </span>
                            </label>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Menu (Optional)
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                            <FiUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileChange(e, 'menuFile')}
                              className="hidden"
                              id="menu"
                            />
                            <label htmlFor="menu" className="cursor-pointer">
                              <span className="text-sm text-gray-600">
                                {formData.menuFile ? formData.menuFile.name : 'Click to upload'}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleInputChange}
                            required
                            className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                          />
                          <span className="text-sm text-gray-700">
                            I agree to the{' '}
                            <Link href="/terms" className="text-teal-600 hover:text-teal-700 underline">
                              Terms & Conditions
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy-policy" className="text-teal-600 hover:text-teal-700 underline">
                              Privacy Policy
                            </Link>
                          </span>
                        </label>
                        
                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            name="agreeToCommission"
                            checked={formData.agreeToCommission}
                            onChange={handleInputChange}
                            required
                            className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                          />
                          <span className="text-sm text-gray-700">
                            I agree to the 15% commission structure on each order
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-600 text-sm">
                        Application submitted successfully! We&apos;ll review your application and contact you within 3-5 business days.
                      </p>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">
                        Failed to submit application. Please try again.
                      </p>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.agreeToTerms || !formData.agreeToCommission}
                        className="px-8 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
