
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AirdropFAQ = () => {
  const faqItems = [
    {
      question: "What is the BIT Airdrop?",
      answer: "The BIT Airdrop is a token distribution event where users can claim free BIT tokens by completing simple social media tasks and engaging with our community."
    },
    {
      question: "How do I participate in the airdrop?",
      answer: "To participate, connect your wallet, complete the required social media tasks (Twitter, Telegram, Facebook, YouTube), verify each task with the unique code, and claim your rewards once all tasks are complete."
    },
    {
      question: "How many BIT tokens can I earn?",
      answer: "Each task offers 25 BIT tokens, for a total of 100 BIT tokens when all tasks are completed. The exact amount may vary based on the task's specific reward."
    },
    {
      question: "When does the airdrop end?",
      answer: "The airdrop has a specific end date shown by the countdown timer. Make sure to complete all tasks and claim your rewards before the deadline."
    },
    {
      question: "Can I participate with multiple wallets?",
      answer: "No, the airdrop is limited to one wallet per person. Multiple submissions from the same person will be disqualified."
    },
    {
      question: "How do I verify task completion?",
      answer: "After completing each social media task, you'll find a unique verification code in our pinned posts on that platform. Enter this code in the task verification modal to prove completion."
    },
    {
      question: "When will I receive my tokens?",
      answer: "Tokens are distributed immediately after you successfully claim your reward. They will appear in your connected wallet."
    },
    {
      question: "What blockchain is BIT token on?",
      answer: "BIT tokens are based on the Binance Smart Chain (BSC), so make sure your wallet is configured to use this network."
    }
  ];

  return (
    <div className="bg-bitaccess-black-light py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border-b border-gray-800"
            >
              <AccordionTrigger className="text-white hover:text-bitaccess-gold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default AirdropFAQ;
