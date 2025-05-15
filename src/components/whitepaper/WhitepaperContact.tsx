
const WhitepaperContact = () => {
  const contacts = [
    { label: "Website", value: "https://bitaecosystem.org" },
    { label: "Email", value: "support@bitaecosystem.org" },
    { label: "Alternative Email", value: "bitaecosystem@gmail.com" },
    { label: "Facebook", value: "https://www.facebook.com/bitaecosystemofficial" },
    { label: "Twitter", value: "https://x.com/bitaecosystem" },
    { label: "YouTube", value: "https://www.youtube.com/@bitaecosystemofficial" },
    { label: "Telegram", value: "https://t.me/bitaecosystemofficial" },
    { label: "GitHub", value: "https://www.github.com/bitaecosystemofficial" },
  ];

  return (
    <div className="bg-bitaccess-black-light rounded-xl p-6 border border-bitaccess-gold/20 mt-10">
      <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
      <p className="text-gray-300 mb-4">Connect with Us at BIT ACCESS ECOSYSTEM</p>
      <h3 className="text-xl font-semibold text-white mb-3">Official Social Media Accounts</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {contacts.map((contact, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-bitaccess-gold text-sm">{contact.label}:</span>
            <a 
              href={contact.label.toLowerCase().includes('email') ? `mailto:${contact.value}` : contact.value} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-bitaccess-gold transition-colors break-all"
            >
              {contact.value}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhitepaperContact;
