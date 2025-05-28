// const Footer = () => (
//   <footer className="bg-gray-800 text-white p-4 text-center">
//     <p>&copy; 2025 Job Portal</p>
//   </footer>
// );

// export default Footer;
const Footer = () => {
  return (
    <footer className="bg-[#18181B] text-white py-10 px-6 md:px-20">
      <div className="flex flex-col md:flex-row md:justify-between gap-12 mb-10">
        
        {/* Left: Logo + Contact */}
        <div className="max-w-sm">
          <img src="/images/logo.png" alt="VTA Logo" className="mb-4 w-20" />
          <p className="mb-2 font-semibold">Call us</p>
          <p>1 (314) 732 0300<br />+91 96000 85988</p>
          <p className="mt-4">
            Akshaya HQ, Rajiv Gandhi Salai, Kazhipattur,<br />
            Tamil Nadu, Chennai - 603103, India.<br />
            1401, 21st ST STE 6310,<br />
            Sacramento, CA 95811, USA
          </p>
          <p className="mt-2">support@infoziant.com</p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <p className="font-semibold mb-3">For Candidates</p>
            <ul className="space-y-2">
              <li>Browse Jobs</li>
              <li>Upload Resume</li>
              <li>Find Companies</li>
              <li>Job Alerts</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3">For Employers</p>
            <ul className="space-y-2">
              <li>Employer Login</li>
              <li>Job Posting</li>
              <li>Discover Talent</li>
              <li>Packages</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3">About Us</p>
            <ul className="space-y-2">
              <li>About</li>
              <li>Contact</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3">Upskills</p>
            <ul className="space-y-2">
              <li>All Courses</li>
              <li>My Courses</li>
              <li>Completed Courses</li>
              <li>Skill Assessment</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© 2024 VTA. All Rights Reserved.</p>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 text-white text-lg">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
         
      </div>
    </footer>
  );
};

export default Footer;
