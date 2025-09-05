import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Title from '@/components/Title';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactPage = () => {
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await fetch('https://formspree.io/f/saulpatinojr@hotmail.com', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        toast({
          title: "🚀 Transmission Received!",
          description: "Thank you for reaching out. I'll get back to you as soon as possible."
        });
        e.target.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Error!",
        description: "There was a problem sending your message. Please try again later or email me directly."
      });
    }
  };

  return <>
      <Helmet>
        <title>Contact - Hybrid Cloud Insights</title>
        <meta name="description" content="Get in touch for collaborations, speaking engagements, or cloud architecture consulting." />
      </Helmet>
      <main className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Title title="Open Comms" subtitle="> Have a question, a project proposal, or just want to talk cloud? I'd love to hear from you." />
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="retro-card p-8">
              <h3 className="text-2xl font-display text-electric-teal mb-6">Secure Transmission Form</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="font-mono text-text-med">CALLSIGN</Label>
                  <Input id="name" name="name" type="text" required className="mt-2 bg-bg-dark border-cyber-purple text-white rounded-none font-mono" />
                </div>
                <div>
                  <Label htmlFor="email" className="font-mono text-text-med">RETURN ADDRESS (EMAIL)</Label>
                  <Input id="email" name="email" type="email" required className="mt-2 bg-bg-dark border-cyber-purple text-white rounded-none font-mono" />
                </div>
                <div>
                  <Label htmlFor="subject" className="font-mono text-text-med">SUBJECT</Label>
                  <Input id="subject" name="subject" type="text" required className="mt-2 bg-bg-dark border-cyber-purple text-white rounded-none font-mono" />
                </div>
                <div>
                  <Label htmlFor="message" className="font-mono text-text-med">MESSAGE</Label>
                  <Textarea id="message" name="message" required className="mt-2 min-h-[120px] bg-bg-dark border-cyber-purple text-white rounded-none font-mono" />
                </div>
                <Button type="submit" className="w-full font-mono text-lg bg-neon-pink text-bg-dark hover:bg-electric-teal rounded-none">
                  [Transmit] <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h3 className="text-2xl font-display text-electric-teal mb-6">Alternate Channels</h3>
              <div className="space-y-6">
                <p className="text-text-med font-mono">&gt; For general inquiries, you can also reach me directly via email or connect with me on social media.</p>
                <div className="space-y-4">
                  <a href="mailto:saulpatinojr@hotmail.com" className="flex items-center space-x-4 p-4 retro-card cursor-pointer">
                    <img src="https://horizons-cdn.hostinger.com/24f0c0cb-5154-4515-a61d-c58b5e4b263e/3d801736c46adfb1a5704088e0f81918.png" alt="Email icon" className="w-8 h-8" />
                    <div>
                      <p className="font-display text-white">Email</p>
                      <p className="text-text-med font-mono">saulpatinojr@hotmail.com</p>
                    </div>
                  </a>
                   <a href="https://www.linkedin.com/in/saulpatino/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 retro-card cursor-pointer">
                    <img src="https://horizons-cdn.hostinger.com/24f0c0cb-5154-4515-a61d-c58b5e4b263e/85938de37c36239650f75beb49ee8707.png" alt="LinkedIn icon" className="w-8 h-8" />
                    <div>
                      <p className="font-display text-white">LinkedIn</p>
                      <p className="text-text-med font-mono">linkedin.com/in/saulpatino</p>
                    </div>
                  </a>
                  <a href="https://popl.co/saulpatino" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 retro-card cursor-pointer">
                    <img src="https://horizons-cdn.hostinger.com/24f0c0cb-5154-4515-a61d-c58b5e4b263e/32122f4dff3bf6a8ab3b71a7a2791a0c.png" alt="Popl icon" className="w-8 h-8" />
                    <div>
                      <p className="font-display text-white">Popl</p>
                      <p className="text-text-med font-mono">popl.co/saulpatino</p>
                    </div>
                  </a>
                  <a href="https://sessionize.com/saul-patino" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 retro-card cursor-pointer">
                    <img src="https://horizons-cdn.hostinger.com/24f0c0cb-5154-4515-a61d-c58b5e4b263e/bc6b12e55bdc5d59f94e859b0c1fbc05.png" alt="Sessionize logo" className="w-8 h-8" />
                    <div>
                      <p className="font-display text-white">Sessionize</p>
                      <p className="text-text-med font-mono">sessionize.com/saul-patino</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>;
};
export default ContactPage;