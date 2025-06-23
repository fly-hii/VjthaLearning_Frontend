
import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    // Simulate subscription
    setTimeout(() => {
      setIsSubscribed(true);
      setEmail('');
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-2 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-300" />
          <h2 className="text-3xl font-bold mb-4">Thank You for Subscribing!</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            You'll receive our latest insights and updates directly in your inbox.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-2">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-8 h-8 mx-auto mb-2 text-blue-200" />
          <h2 className="text-4xl font-bold mb-2">Stay Updated with Vjtha Media</h2>
          <p className="text-xl text-blue-100 mb-2 max-w-xl mx-auto">
            Get the latest insights on technology, innovation, and digital transformation 
            delivered straight to your inbox. Join thousands of professionals who trust our content.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/20 focus:border-white"
              />
              <Button 
                type="submit"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8"
              >
                Subscribe
              </Button>
            </div>
          </form>
          
          <p className="text-sm text-blue-200 mt-4">
            No spam, unsubscribe at any time. Read our{' '}
            <a href="/privacy" className="underline hover:text-white">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
