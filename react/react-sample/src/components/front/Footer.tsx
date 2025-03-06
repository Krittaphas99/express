const Footer: React.FC = () => {
  const footerLinks = {
    company: ['Home', 'Our process', 'Our works', 'Testimonials'],
    social: ['Twitter', 'Facebook', 'Instagram']
  }

  return (
    <footer className="bg-sky-700 text-black">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src="images/test.jpg" alt="BKK Agency" className="h-8 mb-4" />
            <p className="text-white">
              Creative and Professional Digital Agency
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-white">
          <p>© 2024 BKKAgency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 