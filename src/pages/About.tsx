
import { Link } from 'react-router-dom';
import { Users, Target, Lightbulb, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AIPopup } from '../pages/AIPopup'; // Assuming you have an AI popup component
const About = () => {
  const teamMembers = [
    {
      name: 'Sahen Chen',
      role: 'Chief Technology Officer & AI Specialist',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
      bio: 'Leading AI researcher with 10+ years in machine learning and web development. Sarah drives our technical vision and content strategy.',
      expertise: ['Artificial Intelligence', 'Machine Learning', 'Technical Leadership']
    },
    {
      name: 'Michael Rodriguez',
      role: 'Senior Full-Stack Developer & Content Creator',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      bio: 'Full-stack expert specializing in React, Node.js, and cloud architecture. Michael creates our most technical tutorials and guides.',
      expertise: ['React', 'Node.js', 'Cloud Architecture']
    },
    {
      name: 'Emma Thompson',
      role: 'Head of Content & Company Culture',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      bio: 'Content strategist and culture advocate with expertise in remote work dynamics and digital transformation.',
      expertise: ['Content Strategy', 'Remote Work', 'Digital Transformation']
    },
    {
      name: 'David Kim',
      role: 'Cybersecurity Expert & Tech Analyst',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'Cybersecurity specialist with deep knowledge of threat analysis, privacy protection, and enterprise security solutions.',
      expertise: ['Cybersecurity', 'Privacy', 'Enterprise Security']
    }
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8 text-blue-600" />,
      title: 'Innovation First',
      description: 'We stay at the forefront of technology trends, constantly exploring new ideas and solutions to share with our community.'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'Community Driven',
      description: 'Our content is shaped by the needs and feedback of our readers, fostering a collaborative learning environment.'
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: 'Quality Focus',
      description: 'Every article undergoes rigorous review to ensure accuracy, depth, and practical value for our audience.'
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: 'Excellence Standard',
      description: 'We maintain high standards in both our content creation and the IT solutions we provide to clients.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Monthly Readers' },
    { number: '200+', label: 'Published Articles' },
    { number: '15+', label: 'Industry Categories' },
    { number: '5+', label: 'Years of Excellence' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <AIPopup /> {/* AI Assistant Popup */}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About Vjtha Learning</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              We're a team of passionate technology experts, writers, and innovators dedicated to 
              sharing insights that drive digital transformation and business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                To bridge the gap between complex technology concepts and practical business applications, 
                making cutting-edge knowledge accessible to everyone.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why We Started Vjtha Learning</h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    In 2019, we recognized a significant gap in the tech content landscape. While there was 
                    plenty of surface-level content and highly technical documentation, there was little 
                    that bridged the two - content that was both accessible and deeply insightful.
                  </p>
                  <p>
                    As IT professionals and consultants, we wanted to create a platform where business 
                    leaders, developers, and tech enthusiasts could find practical, actionable insights 
                    that they could immediately apply to their work.
                  </p>
                  <p>
                    Today, Vjtha Learning has grown into a trusted resource for thousands of professionals 
                    worldwide, helping them navigate the ever-evolving technology landscape.
                  </p>
                </div>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do, from content creation to client relationships.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our diverse team of experts brings together decades of experience in technology, 
              content creation, and business strategy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="space-y-1">
                    {member.expertise.map((skill, skillIndex) => (
                      <div key={skillIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you need IT consulting, custom development, or want to collaborate on content, 
            we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Get In Touch <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
