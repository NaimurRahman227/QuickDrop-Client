import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {

  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="btn btn-outline btn-primary"
      >
        ← Back to Home
      </button>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-gray-500">
          Last Updated: {new Date().getFullYear()}
        </p>
      </div>

      <p className="text-gray-600">
        At <strong>QuickDrop</strong>, we value your privacy and are committed to protecting
        your personal information. This Privacy Policy explains how we collect,
        use, and safeguard your information when you use our parcel delivery
        services, website, and applications.
      </p>

      {/* INFORMATION WE COLLECT */}

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>

        <p className="text-gray-600">
          When you use QuickDrop services, we may collect the following types of information:
        </p>

        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>Name, email address, and contact information</li>
          <li>Sender and receiver parcel delivery details</li>
          <li>Pickup and delivery addresses</li>
          <li>Parcel information such as weight and type</li>
          <li>Account login information</li>
        </ul>
      </div>

      {/* HOW WE USE */}

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>

        <p className="text-gray-600">
          We use the information we collect to provide, improve, and secure our services.
          This includes:
        </p>

        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>Processing parcel delivery requests</li>
          <li>Tracking and updating delivery status</li>
          <li>Improving logistics and service efficiency</li>
          <li>Communicating with customers about orders</li>
          <li>Ensuring account security</li>
        </ul>
      </div>

      {/* DATA SECURITY */}

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Data Security</h2>

        <p className="text-gray-600">
          QuickDrop takes appropriate security measures to protect your personal
          data from unauthorized access, disclosure, or misuse. We use secure
          technologies and internal safeguards to ensure your information remains safe.
        </p>
      </div>

      {/* DATA SHARING */}

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Information Sharing</h2>

        <p className="text-gray-600">
          We do not sell or rent your personal information to third parties.
          Information may only be shared with trusted service providers and
          delivery partners strictly for the purpose of completing parcel deliveries.
        </p>
      </div>

      {/* USER RIGHTS */}

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">5. Your Rights</h2>

        <p className="text-gray-600">
          Users have the right to access, update, or request deletion of their
          personal information. If you have concerns regarding your data,
          please contact our support team.
        </p>
      </div>

      {/* POLICY CHANGES */}

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">6. Changes to This Policy</h2>

        <p className="text-gray-600">
          QuickDrop may update this Privacy Policy periodically to reflect
          service improvements or regulatory requirements. Updates will be
          posted on this page.
        </p>
      </div>

      {/* CONTACT */}

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Contact Us</h2>

        <p className="text-gray-600">
          If you have any questions regarding this Privacy Policy, please contact
          QuickDrop support.
        </p>

        <p className="text-gray-600">
          Email: support@quickdrop.com
        </p>
      </div>

    </div>
  );
};

export default PrivacyPolicy;