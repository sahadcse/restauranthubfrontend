"use client";
// import { Metadata } from "next";
import Header from "../../components/layout/public/Header";
import Footer from "../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../components/ui/Breadcrumb";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// export const metadata: Metadata = {
//   title: "About Us | Restaurant Hub",
//   description:
//     "Learn about Restaurant Hub - Your premier destination for the finest culinary experiences and food delivery services.",
// };

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    restaurants: 0,
    orders: 0,
    dishes: 0,
    satisfaction: 0,
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentTeamSlide, setCurrentTeamSlide] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
  ];

  const services = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Free delivery on all orders over $25",
    },
    {
      icon: "📞",
      title: "24/7 Support",
      description: "Contact us 24 hours a day, 7 days a week",
    },
    {
      icon: "↩️",
      title: "30 Days Return",
      description: "Simply return it within 30 days for an exchange",
    },
    {
      icon: "🔒",
      title: "Payment Secure",
      description: "Contact us 24 hours a day, 7 days a week",
    },
  ];

  const stats = useMemo(
    () => [
      {
        number: 850,
        display: "850+",
        label: "Restaurants",
        description: "Partner restaurants across the city",
        key: "restaurants",
      },
      {
        number: 15000,
        display: "15K+",
        label: "Orders",
        description: "Successfully delivered orders",
        key: "orders",
      },
      {
        number: 500,
        display: "500+",
        label: "Dishes",
        description: "Variety of cuisines and dishes",
        key: "dishes",
      },
      {
        number: 98,
        display: "98%",
        label: "Satisfaction",
        description: "Happy customers rating",
        key: "satisfaction",
      },
    ],
    []
  );

  const team = useMemo(
    () => [
      {
        name: "Sarah Johnson",
        role: "Head Chef",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
        social: {
          twitter: "https://twitter.com/sarahjohnson",
          linkedin: "https://linkedin.com/in/sarahjohnson",
          facebook: "https://facebook.com/sarahjohnson",
        },
      },
      {
        name: "Michael Chen",
        role: "Operations Manager",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
        social: {
          twitter: "https://twitter.com/michaelchen",
          linkedin: "https://linkedin.com/in/michaelchen",
          facebook: "https://facebook.com/michaelchen",
        },
      },
      {
        name: "Emma Rodriguez",
        role: "Customer Success",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
        social: {
          twitter: "https://twitter.com/emmarodriguez",
          linkedin: "https://linkedin.com/in/emmarodriguez",
          facebook: "https://facebook.com/emmarodriguez",
        },
      },
      {
        name: "David Wilson",
        role: "Delivery Manager",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
        social: {
          twitter: "https://twitter.com/davidwilson",
          linkedin: "https://linkedin.com/in/davidwilson",
          facebook: "https://facebook.com/davidwilson",
        },
      },
      {
        name: "Lisa Thompson",
        role: "Marketing Director",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
        social: {
          twitter: "https://twitter.com/lisathompson",
          linkedin: "https://linkedin.com/in/lisathompson",
          facebook: "https://facebook.com/lisathompson",
        },
      },
      {
        name: "James Park",
        role: "Quality Assurance",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
        social: {
          twitter: "https://twitter.com/jamespark",
          linkedin: "https://linkedin.com/in/jamespark",
          facebook: "https://facebook.com/jamespark",
        },
      },
      {
        name: "Maria Garcia",
        role: "Sous Chef",
        image:
          "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=300&h=300&fit=crop&crop=face",
        social: {
          twitter: "https://twitter.com/mariagarcia",
          linkedin: "https://linkedin.com/in/mariagarcia",
          facebook: "https://facebook.com/mariagarcia",
        },
      },
      {
        name: "Alex Kim",
        role: "Technology Lead",
        image:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face",
        social: {
          twitter: "https://twitter.com/alexkim",
          linkedin: "https://linkedin.com/in/alexkim",
          facebook: "https://facebook.com/alexkim",
        },
      },
    ],
    []
  );

  const testimonials = [
    {
      id: 1,
      text: "Restaurant Hub has completely transformed our dining experience. The quality of food and speed of delivery is unmatched. Every meal feels like a special occasion!",
      name: "Nancy Rodriguez",
      position: "Food Enthusiast",
      company: "Local Foodie",
      image:
        "https://images.unsplash.com/photo-1612767809893-d50e8f2bdf62?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      id: 2,
      text: "As a business owner, I appreciate the reliability and professionalism of Restaurant Hub. Their delivery service has helped us reach more customers and grow our business significantly.",
      name: "Marcus Johnson",
      position: "Restaurant Owner",
      company: "Golden Spoon Bistro",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      id: 3,
      text: "The variety of cuisines available through Restaurant Hub is incredible. From authentic Italian to spicy Indian, they have something for every craving. Highly recommended!",
      name: "Sarah Chen",
      position: "Marketing Director",
      company: "Tech Innovations Inc.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      id: 4,
      text: "Outstanding customer service and exceptional food quality. Restaurant Hub has become our go-to platform for both personal orders and corporate catering events.",
      name: "David Thompson",
      position: "Operations Manager",
      company: "Corporate Solutions Ltd.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
  ];

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(testimonialTimer);
  }, [testimonials.length]);

  useEffect(() => {
    const teamTimer = setInterval(() => {
      setCurrentTeamSlide((prev) => (prev + 1) % Math.ceil(team.length / 4));
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(teamTimer);
  }, [team.length]);

  const animateCounters = useCallback(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;

    stats.forEach((stat) => {
      let currentValue = 0;
      const increment = stat.number / steps;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= stat.number) {
          currentValue = stat.number;
          clearInterval(timer);
        }

        setCounters((prev) => ({
          ...prev,
          [stat.key]: Math.floor(currentValue),
        }));
      }, stepDuration);
    });
  }, [stats]);

  useEffect(() => {
    const currentStatsRef = statsRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (currentStatsRef) {
      observer.observe(currentStatsRef);
    }

    return () => {
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef);
      }
    };
  }, [isVisible, animateCounters]);

  const formatDisplayValue = (key: string, value: number) => {
    switch (key) {
      case "orders":
        return value >= 15000 ? "15K+" : `${Math.floor(value / 1000)}K+`;
      case "restaurants":
        return `${value}+`;
      case "dishes":
        return `${value}+`;
      case "satisfaction":
        return `${value}%`;
      default:
        return value.toString();
    }
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb
        items={breadcrumbItems}
        className="container mx-auto max-w-7xl"
      />

      <div className="py-16">
        {/* Who We Are Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Who We <span className="text-green-600">Are?</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  WE&apos;RE HERE TO SERVE ONLY THE BEST CULINARY EXPERIENCES
                  FOR YOU, ENRICHING YOUR MEALS WITH THE BEST FLAVORS.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Restaurant Hub has been the culinary industry leader since the
                  1990s, when an unknown chef took a galley of recipes and
                  scrambled it to make a recipe specimen book. It has survived
                  not only five centuries, but also the leap into electronic
                  ordering, remaining essentially unchanged.
                </p>

                <p className="text-gray-600">
                  Restaurant Hub has survived not only five centuries, but also
                  the leap into electronic ordering, remaining essentially
                  unchanged.
                </p>

                <p className="text-gray-600">
                  We take pride in serving only the finest ingredients, sourced
                  locally when possible, and prepared by our expert team of
                  chefs who are passionate about creating memorable dining
                  experiences.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4 flex flex-col justify-between">
                <Image
                  src="https://images.unsplash.com/photo-1526069631228-723c945bea6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fHww"
                  alt="Restaurant interior"
                  width={300}
                  height={400}
                  className="rounded-lg object-cover w-full h-48"
                />
                <Image
                  src="https://images.unsplash.com/photo-1660652378777-cdac67447816?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZXNoJTIwaW5ncmVkaWVudHN8ZW58MHx8MHx8fDA%3D"
                  alt="Fresh ingredients"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-full h-48"
                />
              </div>
              <div className="">
                <Image
                  src="https://images.unsplash.com/photo-1577219492769-b63a779fac28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoZWYlMjBjb29raW5nfGVufDB8fDB8fHww"
                  alt="Chef preparing food"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Our Services Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our <span className="text-green-600">Services</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Customer service should not be a department, it should be the
                entire company.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="text-center p-6 border rounded-lg shadow-sm border-gray-200"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="py-20 bg-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 relative">
              {/* Large Quote Icon */}
              <div className="text-8xl text-gray-300 font-serif absolute top-4 left-8">
                &quot;
              </div>

              {/* Testimonial Text */}
              <div className="pt-12">
                <p className="text-gray-600 text-lg leading-relaxed mb-8 px-4">
                  {testimonials[currentTestimonial].text}
                </p>

                {/* Customer Avatar */}
                <div className="flex justify-center mb-4">
                  <Image
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                </div>

                {/* Customer Name and Title */}
                <h4 className="text-xl font-semibold text-teal-600 mb-1">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-gray-500 text-sm mb-4">
                  {testimonials[currentTestimonial].position}
                </p>

                {/* Rating Stars */}
                <div className="flex justify-center">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
              </div>

              {/* Large Quote Icon Bottom Right */}
              <div className="text-8xl text-gray-300 font-serif absolute bottom-4 right-8 rotate-180">
                &quot;
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial
                      ? "bg-teal-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div
          ref={statsRef}
          className={`bg-green-600 py-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-white transform transition-all duration-1000 delay-${
                    index * 200
                  } ${
                    isVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-10 scale-95"
                  }`}
                >
                  <div className="text-4xl font-bold mb-2 transition-all duration-500">
                    {isVisible
                      ? formatDisplayValue(
                          stat.key,
                          counters[stat.key as keyof typeof counters]
                        )
                      : "0"}
                  </div>
                  <div className="text-xl font-semibold mb-1">{stat.label}</div>
                  <div className="text-green-100 text-sm">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our <span className="text-green-600">Team</span>
              </h2>
              <p className="text-gray-600">Meet our expert team members</p>
            </div>

            {/* Team Slider Container */}
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentTeamSlide * 100}%)`,
                  }}
                >
                  {/* Create slides with 4 members each */}
                  {Array.from(
                    { length: Math.ceil(team.length / 4) },
                    (_, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
                          {team
                            .slice(slideIndex * 4, (slideIndex + 1) * 4)
                            .map((member, index) => (
                              <div
                                key={`${slideIndex}-${index}`}
                                className="text-center group"
                              >
                                <div className="relative overflow-hidden rounded-lg mb-4 mx-auto w-48 h-48">
                                  <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={192}
                                    height={192}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                  {/* Social Media Icons */}
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex space-x-3">
                                      {/* Twitter */}
                                      <a
                                        href={member.social.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors duration-200"
                                        aria-label={`${member.name} Twitter`}
                                      >
                                        <svg
                                          className="w-5 h-5 text-white"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                      </a>

                                      {/* LinkedIn */}
                                      <a
                                        href={member.social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors duration-200"
                                        aria-label={`${member.name} LinkedIn`}
                                      >
                                        <svg
                                          className="w-5 h-5 text-white"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                      </a>

                                      {/* Facebook */}
                                      <a
                                        href={member.social.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors duration-200"
                                        aria-label={`${member.name} Facebook`}
                                      >
                                        <svg
                                          className="w-5 h-5 text-white"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                  {member.name}
                                </h3>
                                <p className="text-green-600 text-sm font-medium">
                                  {member.role}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from(
                  { length: Math.ceil(team.length / 4) },
                  (_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTeamSlide
                          ? "bg-green-600 scale-125"
                          : "bg-gray-300"
                      }`}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
